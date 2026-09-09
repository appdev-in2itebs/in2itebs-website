/** JSON.stringify that cannot terminate the surrounding <script> element. */
export function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
