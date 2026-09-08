// Emits a patch; never writes source files directly.
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
const files=fs.readdirSync('app',{recursive:true}).filter(p=>p.endsWith('page.tsx'));
let patch='*** Begin Patch\n';
for(const file of files){
  const target=path.join('app',file);
  let old=fs.readFileSync(target,'utf8').replaceAll('\r','');
  if(old.includes('pageMetadata')) continue; // Already migrated; keep reruns harmless.
  let next=old;
  if(file.includes('[slug]')){
    next=next.replaceAll('params: { slug: string }','params: Promise<{ slug: string }>');
    next=next.replace(/export function generateMetadata/g,'export async function generateMetadata');
    next=next.replace(/export default function (\w+)\(/g,'export default async function $1(');
    next=next.replace(/(export (?:default )?async function (?:generateMetadata|\w+Page)\([^\n]+\{\n)/g,'$1  const {slug} = await params;\n');
    next=next.replaceAll('params.slug','slug');
  }
  const source=ts.createSourceFile(target,next,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
  const changes=[];
  const route='/'+file.replaceAll('\\','/').replace(/page.tsx$/,'');
  const expression=file.includes('[slug]')?'`'+route.replace('[slug]','${slug}')+'`':JSON.stringify(route);
  function walk(node,inMetadata=false){
    if(ts.isVariableDeclaration(node)&&node.name.getText(source)==='metadata'&&node.initializer&&ts.isObjectLiteralExpression(node.initializer)) changes.push({start:node.initializer.getStart(source),end:node.initializer.end});
    const inside=inMetadata||(ts.isFunctionDeclaration(node)&&node.name?.getText(source)==='generateMetadata');
    if(inside&&ts.isReturnStatement(node)&&node.expression&&ts.isObjectLiteralExpression(node.expression))changes.push({start:node.expression.getStart(source),end:node.expression.end});
    ts.forEachChild(node,n=>walk(n,inside));
  }
  walk(source);
  for(const c of changes.sort((a,b)=>b.start-a.start)) next=next.slice(0,c.start)+'pageMetadata('+expression+', '+next.slice(c.start,c.end)+')'+next.slice(c.end);
  if(changes.length) next='import {pageMetadata} from "@/lib/metadata";\n'+next;
  if(next!==old){
    // Compact one-hunk diff preserving unchanged common prefix/suffix.
    const a=old.trimEnd().split('\n'),b=next.trimEnd().split('\n');
    let start=0,end=0;
    while(start<Math.min(a.length,b.length)&&a[start]===b[start])start++;
    while(end<Math.min(a.length,b.length)-start&&a[a.length-1-end]===b[b.length-1-end])end++;
    patch+='*** Update File: '+path.resolve(target).replaceAll('\\','/')+'\n@@\n'+a.slice(start,a.length-end).map(l=>'-'+l).join('\n')+'\n'+b.slice(start,b.length-end).map(l=>'+'+l).join('\n')+'\n';
  }
}
console.log(patch+'*** End Patch');
