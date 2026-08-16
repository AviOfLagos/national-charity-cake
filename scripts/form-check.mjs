import { chromium } from 'playwright'
const b = await chromium.launch()
const p = await (await b.newContext({ viewport: { width: 1280, height: 1000 } })).newPage()
const errs = []
p.on('pageerror', e => errs.push(String(e)))

await p.goto('http://localhost:3000/volunteer', { waitUntil: 'networkidle' })

// 1. Validation path: submit empty.
await p.getByRole('button', { name: /sign me up/i }).click()
await p.waitForTimeout(1500)
console.log('empty-submit visible error:', (await p.locator('[aria-live="polite"]').innerText()).trim().slice(0, 80))

// 2. Timing check: fill and submit immediately after load would be rejected; wait it out.
await p.getByLabel('Your name').fill('Ada Obi')
await p.getByLabel('Email').fill('ada@example.com')
await p.getByLabel('Phone').fill('08012345678')
await p.getByLabel('State').fill('Lagos')
await p.getByLabel('When are you free?').selectOption('weekends')
await p.waitForTimeout(2800)
await p.getByRole('button', { name: /sign me up/i }).click()
await p.waitForTimeout(2500)
const outcome = (await p.locator('[aria-live="polite"], [role="status"]').first().innerText()).trim()
console.log('valid-submit outcome:', outcome.slice(0, 200))
console.log('focused after submit:', await p.evaluate(() => document.activeElement?.getAttribute('aria-live') || document.activeElement?.getAttribute('role') || document.activeElement?.tagName))
console.log('page errors:', errs.length ? errs : 'none')
await b.close()
