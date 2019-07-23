/**
  * Convert a JSON-like string of breakpoint state generated by JigSass MQ into an object.
  *
  * @param {String} selector - A selector for the element to which the string is attached.
  *
  * @return {Object} - A JSON-like object with data about currently active breakpoints.
  */
export function parseBpsState(selector) {
  const elem = document.querySelector(selector);

  if (elem &&
      window.getComputedStyle &&
      (window.getComputedStyle(elem, '::after').content !== '')
  ) {
    const JsonString = window.getComputedStyle(elem, '::after').content;

    return JSON.parse(removeQuotes(JsonString));
  }

  return undefined;
}


/**
  * Check if a string is a representation of an active breakpoint.
  *
  * @param {String} bp - A string representing a breakpoint in the
  *    format generated by JigSass MQ and extracted from CSS.
  * @param {Object} activeBps - A JSON-like object extracted from CSS,
  *    declaring if a given breakpoint is currently active or inactive.
  *
  * @return {Bollean} - Indicates if the breakpoint is currently active.
  */
export function evaluateBp(bp, activeBps) {
  const fromUntil = bp && bp.indexOf && bp.indexOf('-until') > -1;
  const until = !fromUntil && bp && bp.indexOf && bp.indexOf('until-') === 0;
  const from = !fromUntil && !until;

  // Remove whitespace
  const trimmedBp = bp && bp.trim ? bp.trim() : bp;

  if (from) return (activeBps.from[trimmedBp] && activeBps.from[trimmedBp].active) || false;
  if (fromUntil) {
    return (activeBps['from-until'][trimmedBp] && activeBps['from-until'][trimmedBp].active) ||
      false;
  }
  if (until) {
    const bpName = trimmedBp.slice ? trimmedBp.slice(6) : undefined;
    return (activeBps.until && activeBps.until[bpName] && activeBps.until[bpName].active) ||
      false;
  }
  return false;
}


/**
  * Function by Les James to intelligently remove quotes from strings coming from CSS.
  * from https://css-tricks.com/making-sass-talk-to-javascript-with-json
  *
  * @param {String} string - The string to unquote.
  *
  * @return {String} - The unquoted string.
  */
function removeQuotes(string) {
  if (typeof string === 'string' || string instanceof String) {
    return string.replace(/^['"]+|\s+|\\|(;\s?})+|['"]$/g, '').replace(/'/g,'');
  }

  return string;
}

