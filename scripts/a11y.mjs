import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'
const axe = readFileSync('./node_modules/axe-core/axe.min.js', 'utf8')
const routes = ['/', '/donate', '/transparency', '/volunteer', '/faq', '/leadership', '/media', '/updates']
const themes = ['light', 'dark']
const browser = await chromium.launch()
let total = 0
for (const theme of themes) {
  const ctx = await browser.newContext({ colorScheme: theme, viewport: { width: 1280, height: 900 } })
  const page = await ctx.newPage()
  for (const route of routes) {
    await page.goto('http://localhost:3000' + route, { waitUntil: 'networkidle' })
    await page.addScriptTag({ content: axe })
    const res = await page.evaluate(async () => await window.axe.run(document, { resultTypes: ['violations'] }))
    for (const v of res.violations) {
      total++
      console.log(`${theme} ${route} [${v.impact}] ${v.id}: ${v.help}`)
      for (const n of v.nodes.slice(0, 2)) console.log('    ' + n.target.join(' '))
    }
  }
  await ctx.close()
}
await browser.close()
console.log(total === 0 ? 'AXE CLEAN — 0 violations across ' + routes.length * themes.length + ' page/theme combinations' : `AXE: ${total} violations`)
