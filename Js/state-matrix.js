import { createEl, prettifyLabel } from './utils.js';

export function renderStateMatrix(root, schema, buildHtmlForState) {
  root.innerHTML = '';
  const grid = createEl('div', { className: 'state-grid' });

  schema.states.forEach((state) => {
    const card = createEl('article', {
      className: `state-card ${schema.id === 'modal' ? 'state-card--modal' : ''}`,
      attrs: { 'data-preview-state': state.id }
    });
    const head = createEl('div', { className: 'state-card__head' });
    head.append(
      createEl('strong', { text: state.label || prettifyLabel(state.id) }),
      createEl('span', { text: schema.id })
    );
    const canvas = createEl('div', { className: 'state-card__canvas', attrs: { 'data-preview-state': state.id } });
    canvas.innerHTML = buildHtmlForState(state.id);
    card.append(head, canvas);
    grid.append(card);
  });

  root.append(grid);
}
