const assert = require('node:assert/strict');
const {chromium} = require('playwright-core');

(async () => {
  const browser = await chromium.launch({headless:true, executablePath:process.env.CHROME_PATH});
  try {
    const page = await browser.newPage({viewport:{width:1440,height:1000},hasTouch:true});
    const errors=[];page.on('pageerror',error=>errors.push(error.message));
    await page.goto('http://localhost:3000/talents/hunter');
    const first=page.locator('[data-talent="calc-hunter-beast-mastery-deadly-aspects"]');
    const node=await first.count()?first:page.locator('.talent-node').first();
    await node.hover();
    const tooltip=page.locator('#talent-tooltip');
    await tooltip.waitFor({state:'visible'});
    assert.match(await tooltip.innerText(),/Lorsqu.*Aspect du faucon/);
    await node.click();
    assert.match(await page.locator('#talent-details').innerText(),/Rang actuel \(1\/5\)/);
    assert.match(await tooltip.innerText(),/Rang suivant/);
    await page.keyboard.press('Escape');
    assert.equal(await tooltip.isVisible(),false);
    await node.blur();await node.focus();
    assert.equal(await tooltip.isVisible(),true);
    await page.locator('.talent-node.locked').last().hover();
    assert.match(await tooltip.innerText(),/requiert/i);
    const box=await tooltip.boundingBox();
    assert.ok(box.x>=0&&box.y>=0&&box.x+box.width<=1440&&box.y+box.height<=1000);
    await page.screenshot({path:'talent-effects-desktop.png'});
    await page.setViewportSize({width:390,height:844});
    await page.goto('http://localhost:3000/talents/hunter');
    await page.locator('.talent-node').first().tap();
    assert.match(await page.locator('#talent-mobile-actions').innerText(),/Aspect du faucon/);
    assert.equal(await page.locator('.talent-node').first().innerText(),'0/5');
    await page.screenshot({path:'talent-effects-mobile.png'});
    assert.deepEqual(errors,[]);
    console.log('Talent effects: hover, ranks, keyboard, locked talents, screen bounds and mobile passed.');
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
