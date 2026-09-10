import {test,expect} from '@playwright/test';
test('drawer contains keyboard focus and returns it',async({page})=>{
  await page.setViewportSize({width:375,height:812});await page.goto('/contact/');
  await page.getByRole('button',{name:'Open menu',exact:true}).click();
  for(let i=0;i<20;i++) {await page.keyboard.press('Tab');expect(await page.evaluate(()=>Boolean(document.activeElement?.closest('dialog')))).toBeTruthy();}
  await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Open menu',exact:true})).toBeFocused();
});
test('theme persists across reload and duplicate controls',async({page})=>{
  await page.goto('/');await page.getByRole('button',{name:'Switch to dark theme'}).click();
  await page.reload();await expect(page.locator('html')).toHaveClass(/theme-dark/);
  await page.setViewportSize({width:375,height:812});await page.getByRole('button',{name:'Open menu',exact:true}).click();
  await page.getByRole('dialog').getByRole('button',{name:'Switch to light theme'}).click();
  await page.keyboard.press('Escape');await page.setViewportSize({width:1440,height:900});
  await expect(page.getByRole('button',{name:'Switch to dark theme'})).toBeVisible();
});
test('filter changes announce results and reset',async({page})=>{
  await page.goto('/case-studies/');const initial=await page.getByRole('status').textContent();
  await page.getByRole('button',{name:'GROW',exact:true}).click();
  await expect(page.getByRole('button',{name:'GROW',exact:true})).toHaveAttribute('aria-pressed','true');
  await expect(page.getByRole('status')).not.toHaveText(initial!);
  await page.getByRole('button',{name:'Clear filters'}).click();await expect(page.getByRole('status')).toHaveText(initial!);
});
test('offer, result and region are carried into the preview form',async({page})=>{
  await page.goto('/contact/?offer=pathway&assessment=RISE&interest=SAP');
  await expect(page.locator('select[name="offer"]')).toHaveValue('pathway');
  await expect(page.locator('input[name="assessment"]')).toHaveValue('RISE');
  await expect(page.locator('select[name="interest"]')).toHaveValue('SAP');
  await page.locator('select[name="region"]').selectOption('KE');await page.reload();
  await expect(page.locator('select[name="region"]')).toHaveValue('KE');
  await expect(page.getByRole('status')).toContainText('Online enquiries are not enabled');
  await expect(page.getByRole('button',{name:'Send enquiry'})).toBeDisabled();
});
test('comparison remains scrollable at 320px',async({page})=>{
  await page.setViewportSize({width:320,height:800});await page.goto('/sap-enterprise-solutions/rise-vs-grow/');
  const table=page.getByRole('region',{name:/comparison, scroll horizontally/});
  await table.focus();await page.keyboard.press('ArrowRight');
  await expect.poll(()=>table.evaluate(el=>el.scrollLeft)).toBeGreaterThan(0);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
});
test('pause never hides the hero and reduced motion exposes all client marks',async({page})=>{
  await page.goto('/');await page.getByRole('button',{name:'Pause page animation',exact:true}).click();
  await expect(page.getByRole('heading',{level:2}).first()).toHaveCSS('opacity','1');
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(page.locator('.client-ribbon-copy')).toBeHidden();
  await expect(page.locator('.client-ribbon-list')).toHaveCSS('flex-wrap','wrap');
});
test('unconfirmed direct visits never claim lead delivery',async({page})=>{
  await page.goto('/thank-you/');await expect(page.locator('main')).toContainText('There is no recent enquiry confirmation');
});
test('heading scale and client hover treatment are intact',async({page})=>{
  await page.goto('/');
  expect(await page.getByRole('heading',{level:2}).first().evaluate(el=>parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThan(32);
  await page.getByRole('button',{name:'Pause client ribbon',exact:true}).click();
  const logo=page.locator('.client-ribbon-list img').first();await logo.hover();
  await expect(logo).toHaveCSS('filter','grayscale(0) saturate(1)');
});
test('the quick-contact button hides while the footer is in view',async({page})=>{
  await page.goto('/about/');
  const button=page.getByRole('button',{name:'Contact',exact:true});
  await expect(button).toBeVisible();
  await page.locator('footer').scrollIntoViewIfNeeded();
  await expect(button).toBeHidden();
  await page.evaluate(()=>scrollTo(0,0));
  await expect(button).toBeVisible();
});
