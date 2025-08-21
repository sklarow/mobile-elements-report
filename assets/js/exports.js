function download(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportCsv(elements) {
  const header = 'text,id,accessibility_id,type,issue';
  const rows = elements.map(e => {
    const text = (e.text || '').replace(/"/g, '""');
    const issue = e.issues ? e.issues.join('; ') : '';
    return `"${text}",${e.id},${e.accId},${e.type},"${issue}"`;
  });
  const csv = [header, ...rows].join('\n');
  download('report.csv', csv, 'text/csv');
}

export function exportJson(data) {
  download('report.json', JSON.stringify(data, null, 2), 'application/json');
}

export function printReport() {
  window.print();
}
