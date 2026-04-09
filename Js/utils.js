export function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function slugify(value = '') {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'uiforge';
}

export function clamp(number, min, max) {
  return Math.min(max, Math.max(min, number));
}

export function uniqueId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function toNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function prettifyLabel(value = '') {
  return String(value)
    .replaceAll('-', ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function px(value) {
  return `${Number(value) || 0}px`;
}

export function joinCode(sections) {
  return sections.filter(Boolean).join('\n\n');
}

export function mergeConfig(base, patch) {
  return { ...base, ...patch };
}

export function createEl(tag, options = {}) {
  const node = document.createElement(tag);
  Object.entries(options).forEach(([key, value]) => {
    if (key === 'text') node.textContent = value;
    else if (key === 'html') node.innerHTML = value;
    else if (key === 'className') node.className = value;
    else if (key === 'attrs') {
      Object.entries(value).forEach(([attr, attrValue]) => {
        if (attrValue !== undefined && attrValue !== null) {
          node.setAttribute(attr, attrValue);
        }
      });
    } else {
      node[key] = value;
    }
  });
  return node;
}
