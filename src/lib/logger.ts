const DEBUG = import.meta.env.DEV;

const prefix = "[mood-tracker]";

const _log = console.log;
function log() {
  if (!DEBUG) return;

  const args = Array.from(arguments);
  args.unshift(prefix + ": ");
  _log.apply(console, args);
}
console.log = log;

const _warn = console.warn;
function warn() {
  if (!DEBUG) return;
  const args = Array.from(arguments);
  args.unshift(prefix + ": ");
  _warn.apply(console, args);
}
console.warn = warn;
