import { chunk } from './utils.js';

export function renderSummary(summary, container) {
  container.innerHTML = `
    <h2>Summary</h2>
    <p>Total elements: ${summary.total}</p>
    <p>With accessibility id: ${summary.withAccessibilityId}</p>
    <p>With id: ${summary.withId}</p>
  `;
}

export function renderIssues(issues, container) {
  const warnItems = issues.warnings.map(i => `<li class="issue-warning">${i.message}</li>`).join('');
  const badItems = issues.bads.map(i => `<li class="issue-bad">${i.message}</li>`).join('');
  container.innerHTML = `
    <h2>Issues</h2>
    <h3>Warnings</h3>
    <ul>${warnItems || '<li>None</li>'}</ul>
    <h3>Bad</h3>
    <ul>${badItems || '<li>None</li>'}</ul>
  `;
}

export function renderTable(elements, tbody) {
  tbody.innerHTML = '';
  chunk(elements, el => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${el.type}</td><td>${el.id}</td><td>${el.accId}</td><td>${el.bounds}</td>`;
    tbody.appendChild(tr);
  });
}
