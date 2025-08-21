import { parseBounds, isGenericId } from './utils.js';

export function analyze(elements) {
  const summary = {
    total: elements.length,
    withAccessibilityId: elements.filter(e => e.accId).length,
    withId: elements.filter(e => e.id).length
  };

  const issues = { warnings: [], bads: [] };
  const idMap = new Map();
  const accMap = new Map();

  elements.forEach(el => {
    if (!el.accId) {
      issues.warnings.push({ type: 'missingAccId', message: 'Missing accessibility id', element: el });
    }
    if (el.clickable && !el.id) {
      issues.warnings.push({ type: 'missingId', message: 'Interactive element missing id', element: el });
    }
    if (el.id && isGenericId(el.id)) {
      issues.warnings.push({ type: 'genericId', message: `Generic id ${el.id}`, element: el });
    }
    if (el.id) {
      if (idMap.has(el.id)) {
        issues.bads.push({ type: 'duplicateId', message: `Duplicate id ${el.id}`, element: el });
      } else {
        idMap.set(el.id, true);
      }
    }
    if (el.accId) {
      if (accMap.has(el.accId)) {
        issues.bads.push({ type: 'duplicateAccId', message: `Duplicate accessibility id ${el.accId}`, element: el });
      } else {
        accMap.set(el.accId, true);
      }
    }
    if (el.bounds) {
      const { width, height } = parseBounds(el.bounds);
      if (width < 48 || height < 48) {
        issues.warnings.push({ type: 'smallTouch', message: `Small touch target ${width}x${height}`, element: el });
      }
    }
  });

  return { summary, issues, elements };
}
