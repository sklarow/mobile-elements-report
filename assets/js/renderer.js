import { chunk } from './utils.js';

export function renderSummary(summary, container) {
  container.innerHTML = `
    <h2>Summary</h2>
    <p>Total elements: ${summary.total}</p>
    <p>With accessibility id: ${summary.withAccessibilityId}</p>
    <p>With id: ${summary.withId}</p>
  `;
}

export function renderTable(elements, tbody) {
  tbody.innerHTML = '';
  chunk(elements, el => {
    const tr = document.createElement('tr');
    const text = el.text || el.type;
    const issueText = el.issues ? el.issues.join('; ') : '';
    const issueClass = el.severity ? `issue-${el.severity}` : '';
    tr.innerHTML = `<td>${text}</td><td>${el.id}</td><td>${el.accId}</td><td class="${issueClass}">${issueText}</td>`;
    tbody.appendChild(tr);
  });
}
