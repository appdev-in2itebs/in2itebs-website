import {test,expect} from '@playwright/test';
for(const theme of ['light','dark']) test(`${theme} semantic colour contrast`,async({page,context})=>{
  await context.addCookies([{name:'in2it-theme',value:theme,domain:'127.0.0.1',path:'/'}]);
  await page.goto('/');
  const pairs=await page.evaluate(()=>{
    const styles=getComputedStyle(document.documentElement);
    const canvas=document.createElement('canvas');canvas.width=1;canvas.height=1;
    const ctx=canvas.getContext('2d')!;
    const luminance=(role:string)=>{
      ctx.fillStyle=`oklch(${styles.getPropertyValue('--color-'+role)})`;ctx.fillRect(0,0,1,1);
      const channels=[...ctx.getImageData(0,0,1,1).data].slice(0,3).map(v=>{const c=v/255;return c<=0.04045?c/12.92:((c+0.055)/1.055)**2.4;});
      return channels[0]*0.2126+channels[1]*0.7152+channels[2]*0.0722;
    };
    const pairs:[string,string,number][]=[];
    for(const bg of ['bg-canvas','bg-surface','bg-subtle']) for(const fg of ['fg-primary','fg-secondary','action','feedback-error','feedback-success']) pairs.push([fg,bg,4.5]);
    pairs.push(['fg-on-brand','bg-brand',4.5],['fg-brand-muted','bg-brand',4.5],['fg-on-action','action',4.5],['fg-on-action','action-hover',4.5],['fg-logo','bg-logo',4.5],['border-strong','bg-surface',3]);
    return pairs.map(([fg,bg,minimum])=>{const a=luminance(fg),b=luminance(bg);return {fg,bg,minimum,ratio:(Math.max(a,b)+0.05)/(Math.min(a,b)+0.05)};});
  });
  for(const pair of pairs) expect(pair.ratio,`${theme}: ${pair.fg} on ${pair.bg}`).toBeGreaterThanOrEqual(pair.minimum);
});
