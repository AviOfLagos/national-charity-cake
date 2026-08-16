"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark" | "system";

const LABEL: Record<Theme, string> = { light: "Light", dark: "Dark", system: "System" };
const ORDER: Theme[] = ["system", "light", "dark"];
const EVENT = "themechange";

/**
 * The theme is applied by the inline script in <head> before paint, so the DOM
 * is the source of truth and this control reads from it. Deriving state that way
 * — rather than syncing it into React state from an effect — avoids both the
 * cascading render and the flash of the wrong label on first paint.
 */
function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "light" || attr === "dark" ? attr : "system";
}

/** On the server no choice is knowable, so it renders as "system". */
const getServerSnapshot = (): Theme => "system";

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function cycle() {
    const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length];
    if (next === "system") {
      localStorage.removeItem("theme");
      document.documentElement.removeAttribute("data-theme");
    } else {
      localStorage.setItem("theme", next);
      document.documentElement.setAttribute("data-theme", next);
    }
    window.dispatchEvent(new Event(EVENT));
  }

  return (
    <button
      type="button"
      onClick={cycle}
      className="min-h-11 px-3 py-2 text-sm text-muted transition-colors hover:text-ink"
      aria-label={`Theme: ${LABEL[theme]}. Change theme.`}
    >
      {/* The word costs too much width in a mobile header, so below `sm` it
          becomes a glyph. The accessible name is unchanged either way. */}
      <span className="idx hidden sm:inline">{LABEL[theme]}</span>
      <span className="text-base sm:hidden" aria-hidden="true">
        ◐
      </span>
    </button>
  );
}

/** Runs synchronously in <head>. Inlined deliberately — a deferred script flashes. */
export const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}}catch(e){}})();`;
