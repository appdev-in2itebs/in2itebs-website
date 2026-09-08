import {test,expect} from '@playwright/test';
import {clients} from '../../content/clients';
import {existsSync} from 'node:fs';
import path from 'node:path';

test('every source client has an asset and appears in the homepage ribbon',async({page})=>{
  test.setTimeout(120000);
  expect(clients).toHaveLength(94);
  expect(new Set(clients.map(c=>c.logo)).size).toBe(clients.length);
  expect(clients.some(c=>c.slug==='airports-authority-of-india')).toBeTruthy();
  expect(new Set(clients.map(c=>c.slug)).size).toBe(clients.length);
  for(const client of clients) {
    expect(client.logo,client.name).toBeTruthy();
    expect(existsSync(path.join(process.cwd(),'public',client.logo!)),client.name).toBeTruthy();
  }
  await page.goto('/');
  await expect(page.locator('.client-ribbon-list [role=listitem]')).toHaveCount(clients.length);
  await page.getByRole('button',{name:`View all ${clients.length} client entries`}).click();
  await expect(page.locator('.client-ribbon-copy')).toBeHidden();
  for(const client of clients) {
    const logo=page.locator(`.client-ribbon-list [data-client="${client.slug}"] img`);
    await logo.scrollIntoViewIfNeeded();
    await expect(logo).toHaveAttribute('alt',client.name);
    await expect.poll(()=>logo.evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBeTruthy();
  }
  await page.getByRole('button',{name:'Back to animated ribbon'}).click();
  await expect(page.getByRole('button',{name:'Pause client ribbon',exact:true})).toBeVisible();
});

test('complete client grid fits mobile and preserves colour on hover',async({page})=>{
  await page.setViewportSize({width:375,height:812});
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
  await expect(page.locator('.client-ribbon-list img')).toHaveCount(clients.length);
  const first=await page.locator('.client-ribbon-list [role=listitem]').nth(0).boundingBox();
  const second=await page.locator('.client-ribbon-list [role=listitem]').nth(1).boundingBox();
  expect(first!.y).toBe(second!.y);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
  const logo=page.locator('.client-ribbon-list [data-client="natural-remedies"] img');
  await page.locator('.client-ribbon-list [data-client="natural-remedies"]').scrollIntoViewIfNeeded();
  await expect.poll(()=>logo.evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBeTruthy();
  await logo.hover();await expect(logo).toHaveCSS('filter','grayscale(0) saturate(1)');
  await page.locator('.client-ribbon-list [data-client="sentiss"]').scrollIntoViewIfNeeded();
  await page.screenshot({path:'test-results/client-grid-mobile.png'});
});
