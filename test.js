import { parseBpsState, evaluateBp } from 'htz-parse-bps-state';

const testElem = document.getElementById('test');
const testBtn = document.getElementById('test-btn');

function getBpState(bp = 'x-large') {
  const state = parseBpsState('head');

  return evaluateBp(bp, state);
}

function injectResult() {
  testElem.textContent = getBpState() ? 'active' : 'inactive';
}

injectResult();

testBtn.addEventListener('click', injectResult);
