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
  const header = 'type,id,accessibility_id,text,issues';
  const rows = elements.map(e => {
    const text = (e.text || '').replace(/"/g, '""');
    return `${e.type},${e.id},${e.accId},"${text}",${e.issues || ''}`;
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
