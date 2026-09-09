import {test} from 'node:test';
import assert from 'node:assert/strict';
import {pageMetadata} from '../lib/metadata';

test('page metadata brands the social title and uses trailing-slash image URLs',()=>{
  const m=pageMetadata('/about/',{title:'Who We Are',description:'x'.repeat(80)});
  assert.equal(m.alternates?.canonical,'https://in2itebs.com/about/');
  const og=m.openGraph as {title:string;url:string;images:{url:string}[]};
  assert.equal(og.title,'Who We Are · In2IT EBS');
  assert.equal(og.url,'https://in2itebs.com/about/');
  assert.equal(og.images[0].url,'/opengraph-image/');
  assert.equal((m.twitter as {site:string}).site,'@in2itebs_');
});
test('an absolute title is used verbatim',()=>{
  const m=pageMetadata('/',{title:{absolute:'In2IT EBS — Enterprise transformation under control'},description:'y'.repeat(80)});
  assert.equal((m.openGraph as {title:string}).title,'In2IT EBS — Enterprise transformation under control');
});
import {readFileSync, readdirSync, statSync} from 'node:fs';
import path from 'node:path';
import {caseStudies} from '../content/case-studies';
import {insights} from '../content/insights';

function pages(dir:string):string[]{ return readdirSync(dir).flatMap(entry=>{const full=path.join(dir,entry);return statSync(full).isDirectory()?pages(full):entry==='page.tsx'?[full]:[];}); }
test('static page descriptions stay within 70 to 160 characters',()=>{
  for(const file of pages(path.join(process.cwd(),'app'))){
    const source=readFileSync(file,'utf8');
    const match=source.match(/description:\s*\n?\s*"([^"]+)"/);
    if(!match||file.includes('[slug]')) continue;
    const length=match[1].length;
    const noindex=/robots:\s*\{index: false/.test(source);
    assert.ok(length<=160,`${path.relative(process.cwd(),file)}: description is ${length} characters`);
    if(!noindex) assert.ok(length>=70,`${path.relative(process.cwd(),file)}: description is only ${length} characters`);
  }
});
test('named case studies carry a summary of at most 155 characters',()=>{
  for(const study of caseStudies.filter(s=>s.named)){
    assert.ok(study.summary && study.summary.length>=60 && study.summary.length<=155,`${study.slug}: summary length ${study.summary?.length ?? 0}`);
  }
  for(const article of insights) assert.ok(article.excerpt.length<=160,article.slug);
});
import sitemap from '../app/sitemap';
import {contentUpdated} from '../content/site';
test('every sitemap entry has a valid lastModified and the homepage is included',()=>{
  const entries=sitemap();
  assert.ok(entries.some(e=>e.url==='https://in2itebs.com/'));
  for(const entry of entries){
    assert.ok(entry.lastModified instanceof Date && !Number.isNaN(entry.lastModified.getTime()),entry.url);
    assert.ok(!entry.url.endsWith('/thank-you/'));
  }
  assert.match(contentUpdated,/^\d{4}-\d{2}-\d{2}$/);
});
