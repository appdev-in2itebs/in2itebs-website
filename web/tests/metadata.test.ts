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
