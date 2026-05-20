/**
 * Patches React 19's react-server entry point to expose `useEffectEvent`.
 *
 * Root cause: Next.js uses the "react-server" exports condition for RSC bundles,
 * resolving 'react' → react.react-server.js. That file omits useEffectEvent.
 * Sanity 5.26+ imports useEffectEvent from 'react', which webpack can't find
 * in the react-server build → build failure.
 *
 * Fix: rewrite react.react-server.js to explicitly export useEffectEvent
 * so webpack's static CJS-export detection can find it as a named export.
 * The polyfill is a no-op; Sanity only calls it during client-side Studio
 * rendering, not during server-side RSC evaluation.
 */
'use strict'
const fs = require('fs')
const path = require('path')

const entryFile = path.join(__dirname, '../node_modules/react/react.react-server.js')

if (!fs.existsSync(entryFile)) {
  console.log('patch-react: react.react-server.js not found — skipping')
  process.exit(0)
}

const original = fs.readFileSync(entryFile, 'utf8')

if (original.includes('useEffectEvent')) {
  console.log('patch-react: react.react-server.js already has useEffectEvent — nothing to do')
  process.exit(0)
}

// Rewrite the entry file so that:
// 1. The runtime behaviour is unchanged (same conditional require)
// 2. A named `exports.useEffectEvent` assignment is visible at module top-level
//    so webpack's static CJS-export analyser picks it up as a named export.
const patched = `'use strict';
// Polyfill: useEffectEvent is not in the react-server build but is required
// by Sanity 5.26+ (structureTool). This no-op shim lets webpack resolve the
// named import without breaking RSC. Safe: Sanity only invokes it client-side.
exports.useEffectEvent = function useEffectEvent(fn) { return fn; };

// Original runtime entry — overwrites module.exports but the named export
// registered above is preserved by webpack's module analysis pass.
if (process.env.NODE_ENV === 'production') {
  var pkg = require('./cjs/react.react-server.production.js');
} else {
  var pkg = require('./cjs/react.react-server.development.js');
}
Object.assign(exports, pkg);
// Keep the polyfill alive even if pkg has no useEffectEvent.
if (!exports.useEffectEvent) {
  exports.useEffectEvent = function useEffectEvent(fn) { return fn; };
}
`

fs.writeFileSync(entryFile, patched, 'utf8')
console.log('patch-react: ✓ patched react.react-server.js')
