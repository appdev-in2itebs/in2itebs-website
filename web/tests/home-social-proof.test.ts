import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { leadership } from "../content/leadership";
import { testimonials, testimonialVideos } from "../content/testimonials";

// The homepage's leadership and client-story carousels (2026-09-16) are 1:1 copies of the live
// in2itebs.com "Meet Our Team" and "What People Say" blocks, images included; the placeholder
// template slides that the live slider still carries must never come across.
const here = (file: string) => path.join(process.cwd(), file);

test("the leadership carousel carries the four live cards with photos on disk", () => {
  assert.equal(leadership.length, 4);
  for (const person of leadership) {
    assert.ok(person.name && person.title && person.bio, `${person.name} is incomplete`);
    assert.ok(existsSync(here(`public${person.photo}`)), `${person.name} photo missing at ${person.photo}`);
  }
  const names = leadership.map((p) => p.name);
  for (const expected of ["Abhijit Shukla", "Kunwar Krishna Menon", "Sudhansu Mishra", "Rudra Shankar Shatapathy"])
    assert.ok(names.includes(expected), `${expected} missing`);
  assert.equal(leadership.find((p) => p.name === "Rudra Shankar Shatapathy")?.title, "Managing Director");
});

test("the client stories are the five live quotes and the five live video cards, no template filler", () => {
  assert.equal(testimonials.length, 5);
  for (const quote of testimonials) {
    assert.ok(quote.quote.length > 100, `${quote.name}: quote too short to be real`);
    assert.doesNotMatch(quote.quote, /lorem ipsum/i);
    assert.ok(quote.name && quote.role, `${quote.name} lacks a role`);
    assert.ok(existsSync(here(`public${quote.avatar}`)), `${quote.name} avatar missing at ${quote.avatar}`);
  }
  for (const expected of ["Amy Halter", "Mausam Joshi", "Dr. Sanjeev Kumarr Dixit", "Kavita Mathur", "Kunal Shah"])
    assert.ok(
      testimonials.some((q) => q.name.toLowerCase() === expected.toLowerCase()),
      `${expected} missing`,
    );
  assert.equal(testimonialVideos.length, 5);
  for (const video of testimonialVideos) {
    assert.match(video.id, /^[\w-]{11}$/, `${video.id} is not a YouTube id`);
    assert.ok(video.title, `${video.id} has no title`);
    assert.ok(existsSync(here(`public/testimonials/${video.id}.jpg`)), `${video.id} thumbnail missing`);
  }
  assert.equal(new Set(testimonialVideos.map((v) => v.id)).size, 5);
});

test("the Transform / Decide / Operate section is off the homepage", () => {
  const page = readFileSync(here("app/page.tsx"), "utf8");
  assert.ok(!page.includes('id="operating-model"'), "operating-model section still rendered");
  assert.ok(!page.includes("One continuous line of accountability"), "its heading is still on the page");
});
