import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for(const width of [320,375,768,1024,1100,1280,1440]) {
  test(`navigation and reflow at ${width}px`,async({page})=>{
    await page.setViewportSize({width,height:900});
    await page.goto('/what-we-do/');
    await expect(page.locator('header').getByRole('link',{name:'Talk to us'})).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    if(width>=1280) {
      await page.getByRole('button',{name:'Open What We Do navigation'}).click();
      const box=await page.locator('#desktop-nav-0').boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(0);expect(box!.x+box!.width).toBeLessThanOrEqual(width);
      await expect(page.locator('#desktop-nav-0').getByRole('link',{name:'Oracle',exact:true})).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.getByRole('button',{name:'Open What We Do navigation'})).toBeFocused();
    } else {
      await page.getByRole('button',{name:'Open menu',exact:true}).click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.getByRole('button',{name:'Open menu',exact:true})).toBeFocused();
      await page.getByRole('button',{name:'Open menu',exact:true}).click();
      await page.setViewportSize({width:1440,height:900});
      await expect(page.getByRole('dialog')).not.toBeVisible();
      await expect.poll(()=>page.evaluate(()=>document.body.style.overflow)).not.toBe('hidden');
    }
  });
}
for(const theme of ['light','dark']) {
  for(const route of ['/','/contact/','/what-we-do/','/partners/','/oracle/','/microsoft/','/sap-enterprise-solutions/rise-vs-grow/']) {
    test(`${theme} accessibility ${route}`,async({page,context})=>{
      await context.addCookies([{name:'in2it-theme',value:theme,domain:'127.0.0.1',path:'/'}]);
      await page.emulateMedia({reducedMotion:'reduce'});
      await page.goto(route); await expect(page.locator('html')).toHaveClass(new RegExp(`theme-${theme}`));
      const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
      expect(results.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))).toEqual([]);
    });
  }
}
test('static content and persisted theme work without JavaScript',async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false});
  await context.addCookies([{name:'in2it-theme',value:'dark',domain:'127.0.0.1',path:'/'}]);
  const page=await context.newPage();await page.goto('http://127.0.0.1:3107/');
  await expect(page.locator('html')).toHaveClass(/theme-dark/);
  await expect(page.getByRole('heading',{level:1})).toBeVisible();
  await expect(page.locator('main')).not.toContainText('being prepared');
  await context.close();
});
