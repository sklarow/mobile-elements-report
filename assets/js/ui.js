import { parse } from './parser.js';
import { analyze } from './analyzer.js';
import { renderSummary, renderTable } from './renderer.js';
import { exportCsv, exportJson, printReport } from './exports.js';

export function setupUI() {
  const fileInput = document.getElementById('xmlFile');
  const androidBtn = document.getElementById('loadAndroidSample');
  const iosBtn = document.getElementById('loadIosSample');
  const summaryEl = document.getElementById('summary');
  const tableBody = document.querySelector('#locatorTable tbody');

  let lastResult = null;

  async function process(xml) {
    const elements = parse(xml);
    const result = analyze(elements);
    lastResult = result;
    renderSummary(result.summary, summaryEl);
    renderTable(result.elements, tableBody);
  }

  fileInput.addEventListener('change', async e => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    process(text);
  });

  async function loadSample(path) {
    const res = await fetch(path);
    const text = await res.text();
    process(text);
  }

  androidBtn.addEventListener('click', () => loadSample('assets/samples/sample_android.xml'));
  iosBtn.addEventListener('click', () => loadSample('assets/samples/sample_ios.xml'));

  document.getElementById('exportCsv').addEventListener('click', () => {
    if (lastResult) exportCsv(lastResult.elements);
  });
  document.getElementById('exportJson').addEventListener('click', () => {
    if (lastResult) exportJson(lastResult);
  });
  document.getElementById('printReport').addEventListener('click', () => {
    printReport();
  });
}
