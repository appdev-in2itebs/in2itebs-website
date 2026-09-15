import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import { youtubeVideos, YOUTUBE_CHANNEL_URL } from "../content/youtube";
import { social } from "../content/site";

// The homepage YouTube ribbon (2026-09-15 17:08) reads a generated catalogue of the channel's latest
// uploads; scripts/fetch-youtube.mjs refreshes it from the public feed and saves the thumbnails.
test("the YouTube catalogue is the channel's feed, newest first, with every thumbnail on disk", () => {
  assert.equal(YOUTUBE_CHANNEL_URL, social.youtube);
  assert.ok(youtubeVideos.length >= 1 && youtubeVideos.length <= 15, `unexpected count ${youtubeVideos.length}`);
  const ids = new Set(youtubeVideos.map((video) => video.id));
  assert.equal(ids.size, youtubeVideos.length, "duplicate video ids");
  for (const [index, video] of youtubeVideos.entries()) {
    assert.match(video.id, /^[\w-]{11}$/, `${video.id} is not a YouTube id`);
    assert.ok(video.title.trim().length > 0, `${video.id} has no title`);
    assert.match(video.published, /^\d{4}-\d{2}-\d{2}$/, `${video.id} has no ISO date`);
    if (index > 0)
      assert.ok(youtubeVideos[index - 1].published >= video.published, `${video.id} is out of newest-first order`);
    assert.ok(
      existsSync(path.join(process.cwd(), "public", "youtube", `${video.id}.jpg`)),
      `thumbnail for ${video.id} is not saved under public/youtube`,
    );
  }
});
