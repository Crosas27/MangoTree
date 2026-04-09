import { createEl } from './utils.js';

export function renderSinglePreview(root, html) {
  root.innerHTML = '';
  const shell = createEl('div', { className: 'preview-sandbox', attrs: { 'data-preview-state': 'default' } });
  shell.innerHTML = html;
  root.append(shell);
}
