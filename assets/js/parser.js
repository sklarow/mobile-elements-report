export function parse(xml) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  const elements = [];

  function getXPath(node) {
    const rid = node.getAttribute('resource-id');
    if (rid) {
      return `//${node.tagName}[@resource-id="${rid}"]`;
    }
    if (node === doc.documentElement) {
      return `/${node.tagName}`;
    }
    const siblings = Array.from(node.parentElement.children).filter(n => n.tagName === node.tagName);
    const index = siblings.indexOf(node) + 1;
    return `${getXPath(node.parentElement)}/${node.tagName}[${index}]`;
  }

  function traverse(node) {
    if (node.nodeType !== 1) return; // element nodes only
    const el = node;
    const id = el.getAttribute('resource-id') || el.getAttribute('name') || '';
    const accId = el.getAttribute('content-desc') || el.getAttribute('label') || el.getAttribute('accessibility-id') || '';
    const text =
      el.getAttribute('text') ||
      el.getAttribute('label') ||
      el.getAttribute('value') ||
      (el.textContent || '').trim();
    let bounds = el.getAttribute('bounds') || '';
    if (!bounds && el.getAttribute('x') !== null) {
      const x = parseFloat(el.getAttribute('x'));
      const y = parseFloat(el.getAttribute('y'));
      const width = parseFloat(el.getAttribute('width'));
      const height = parseFloat(el.getAttribute('height'));
      bounds = `[${x},${y}][${x + width},${y + height}]`;
    }
    const clickable = el.getAttribute('clickable') === 'true' || /Button/i.test(el.tagName);
    const xpath = getXPath(el);
    elements.push({
      type: el.tagName,
      id,
      accId,
      text,
      bounds,
      clickable,
      xpath
    });
    Array.from(el.children).forEach(traverse);
  }

  traverse(doc.documentElement);
  return elements;
}
