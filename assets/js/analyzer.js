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

  function addIssue(el, list, type, message) {
    const entry = { type, message, element: el };
    list.push(entry);
    el.issues.push(message);
    if (!el.severity || list === issues.bads) {
      el.severity = list === issues.bads ? 'bad' : 'warning';
    }
  }

  elements.forEach(el => {
    el.issues = [];
    el.severity = null;
    if (!el.accId) {
      addIssue(el, issues.warnings, 'missingAccId', 'Missing accessibility id');
    }
    if (el.clickable && !el.id) {
      addIssue(el, issues.warnings, 'missingId', 'Interactive element missing id');
    }
    if (el.id && isGenericId(el.id)) {
      addIssue(el, issues.warnings, 'genericId', `Generic id ${el.id}`);
    }
    if (el.id) {
      if (idMap.has(el.id)) {
        addIssue(el, issues.bads, 'duplicateId', `Duplicate id ${el.id}`);
      } else {
        idMap.set(el.id, true);
      }
    }
    if (el.accId) {
      if (accMap.has(el.accId)) {
        addIssue(el, issues.bads, 'duplicateAccId', `Duplicate accessibility id ${el.accId}`);
      } else {
        accMap.set(el.accId, true);
      }
    }
    if (el.bounds) {
      const { width, height } = parseBounds(el.bounds);
      if (width < 48 || height < 48) {
        addIssue(el, issues.warnings, 'smallTouch', `Small touch target ${width}x${height}`);
      }
    }
  });

  return { summary, issues, elements };
}
