

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
  elements.forEach(el => {
    const tr = document.createElement('tr');
    const cells = [
      el.text || '',
      el.id,
      el.accId,
      el.type,
      el.issues ? el.issues.join('; ') : ''
    ];
    cells.forEach((value, idx) => {
      const td = document.createElement('td');
      if (idx === 4 && el.severity) td.className = `issue-${el.severity}`;
      td.textContent = value || '';
      tr.appendChild(td);
    });
    const xpathTd = document.createElement('td');
    xpathTd.textContent = el.xpath || '';
    tr.appendChild(xpathTd);
    tbody.appendChild(tr);
  });
}
