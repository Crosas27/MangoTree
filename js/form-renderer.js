import { createEl, deepClone } from './utils.js';

function renderRangeValue(value, unit = '') {
  return `${value}${unit}`;
}

function normalizeCollectionValue(field, value) {
  if (Array.isArray(value) && value.length) return value;
  if (field.minItems) {
    return Array.from({ length: field.minItems }, () => deepClone(field.defaultItem || {}));
  }
  return Array.isArray(value) ? value : [];
}

function buildPrimitiveControl(field, value, onValueChange, options = {}) {
  const inputId = options.inputId || field.name;

  if (field.type === 'checkbox') {
    const wrapper = createEl('label', { className: 'checkbox-row' });
    const input = createEl('input', { attrs: { type: 'checkbox', id: inputId, name: field.name } });
    input.checked = Boolean(value);
    input.addEventListener('change', () => onValueChange(input.checked));
    wrapper.append(input, createEl('span', { text: field.label }));
    return wrapper;
  }

  const wrapper = createEl('div', { className: 'field' });
  wrapper.append(createEl('label', { attrs: { for: inputId }, text: field.label }));

  let input;
  if (field.type === 'select') {
    input = createEl('select', { attrs: { id: inputId, name: field.name } });
    field.options.forEach((optionValue) => {
      const option = createEl('option', { attrs: { value: optionValue }, text: optionValue });
      if (optionValue === value) option.selected = true;
      input.append(option);
    });
  } else if (field.type === 'textarea') {
    input = createEl('textarea', { attrs: { id: inputId, name: field.name } });
    input.value = value ?? '';
  } else {
    input = createEl('input', {
      attrs: {
        id: inputId,
        name: field.name,
        type: field.type
      }
    });
    if (field.min !== undefined) input.min = field.min;
    if (field.max !== undefined) input.max = field.max;
    if (field.step !== undefined) input.step = field.step;
    if (field.type === 'color') input.value = value || '#000000';
    else input.value = value ?? '';
  }

  let metaValue = null;
  input.addEventListener('input', () => {
    let nextValue = input.value;
    if (field.type === 'range' || field.type === 'number') nextValue = Number(nextValue);
    onValueChange(nextValue);
    if (field.type === 'range' && metaValue) {
      metaValue.textContent = renderRangeValue(nextValue, field.unit ?? '');
    }
  });

  wrapper.append(input);

  if (field.type === 'range') {
    const meta = createEl('div', { className: 'range-meta' });
    meta.append(
      createEl('span', { text: field.min !== undefined && field.max !== undefined ? `${field.min} to ${field.max}` : 'range' }),
      (metaValue = createEl('span', { text: renderRangeValue(value, field.unit ?? '') }))
    );
    wrapper.append(meta);
  }

  return wrapper;
}

function buildCollectionControl(field, value, onChange) {
  const items = normalizeCollectionValue(field, value);
  const wrapper = createEl('section', { className: 'collection-field' });
  const head = createEl('div', { className: 'collection-field__head' });
  head.append(
    createEl('div', { className: 'collection-field__title', text: field.label }),
    createEl('div', { className: 'collection-field__meta', text: `${items.length} item${items.length === 1 ? '' : 's'}` })
  );
  wrapper.append(head);

  const list = createEl('div', { className: 'collection-field__list' });

  items.forEach((item, index) => {
    const card = createEl('article', { className: 'collection-card' });
    const cardHead = createEl('div', { className: 'collection-card__head' });
    const title = createEl('h3', {
      className: 'collection-card__title',
      text: `${field.itemLabel || 'Item'} ${index + 1}`
    });
    const removeButton = createEl('button', {
      className: 'button ghost collection-card__remove',
      text: 'Remove',
      attrs: { type: 'button' }
    });
    const cannotRemove = items.length <= (field.minItems || 0);
    removeButton.disabled = cannotRemove;
    removeButton.addEventListener('click', () => {
      if (cannotRemove) return;
      const nextItems = items.filter((_, itemIndex) => itemIndex !== index);
      onChange(field, nextItems);
    });
    cardHead.append(title, removeButton);
    card.append(cardHead);

    const body = createEl('div', { className: 'collection-card__body' });
    field.itemFields.forEach((subField) => {
      const childId = `${field.name}-${index}-${subField.name}`;
      const control = buildPrimitiveControl(
        subField,
        item?.[subField.name],
        (nextValue) => {
          const nextItems = items.map((entry, entryIndex) => {
            if (entryIndex !== index) return entry;
            return { ...entry, [subField.name]: nextValue };
          });
          onChange(field, nextItems);
        },
        { inputId: childId }
      );
      body.append(control);
    });
    card.append(body);
    list.append(card);
  });

  wrapper.append(list);

  const addButton = createEl('button', {
    className: 'button secondary collection-field__add',
    text: field.addLabel || `Add new ${String(field.itemLabel || 'item').toLowerCase()}`,
    attrs: { type: 'button' }
  });
  addButton.addEventListener('click', () => {
    const nextItems = [...items, deepClone(field.defaultItem || {})];
    onChange(field, nextItems);
  });
  wrapper.append(addButton);

  return wrapper;
}

function buildControl(field, value, onChange) {
  if (field.type === 'collection') {
    return buildCollectionControl(field, value, onChange);
  }
  return buildPrimitiveControl(field, value, (nextValue) => onChange(field, nextValue));
}

export function renderForm(container, fields, values, onChange) {
  container.innerHTML = '';
  if (!fields.length) {
    container.append(createEl('div', { className: 'note', text: 'No controls in this group yet.' }));
    return;
  }

  fields.forEach((field) => {
    container.append(buildControl(field, values[field.name], onChange));
  });
}
