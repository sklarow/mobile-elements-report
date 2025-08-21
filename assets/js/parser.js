export function parse(xml) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  const elements = [];

  function traverse(node) {
    if (node.nodeType !== 1) return; // element nodes only
    const el = node;
    const id = el.getAttribute('resource-id') || el.getAttribute('name') || '';
    const accId = el.getAttribute('content-desc') || el.getAttribute('label') || el.getAttribute('accessibility-id') || '';
    let bounds = el.getAttribute('bounds') || '';
    if (!bounds && el.getAttribute('x') !== null) {
      const x = parseFloat(el.getAttribute('x'));
      const y = parseFloat(el.getAttribute('y'));
      const width = parseFloat(el.getAttribute('width'));
      const height = parseFloat(el.getAttribute('height'));
      bounds = `[${x},${y}][${x + width},${y + height}]`;
    }
    const clickable = el.getAttribute('clickable') === 'true' || /Button/i.test(el.tagName);
    elements.push({
      type: el.tagName,
      id,
      accId,
      bounds,
      clickable
    });
    Array.from(el.children).forEach(traverse);
  }

  traverse(doc.documentElement);
  return elements;
}
