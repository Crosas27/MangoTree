import { createEl } from './utils.js';

function renderRangeValue(value, unit = '') {
  return `${value}${unit}`;
}

function buildControl(field, value, onChange) {
  if (field.type === 'checkbox') {
    const wrapper = createEl('label', { className: 'checkbox-row' });
    const input = createEl('input', { attrs: { type: 'checkbox', name: field.name } });
    input.checked = Boolean(value);
    input.addEventListener('change', () => onChange(field, input.checked));
    wrapper.append(input, createEl('span', { text: field.label }));
    return wrapper;
  }

  const wrapper = createEl('div', { className: 'field' });
  wrapper.append(createEl('label', { attrs: { for: field.name }, text: field.label }));

  let input;
  if (field.type === 'select') {
    input = createEl('select', { attrs: { id: field.name, name: field.name } });
    field.options.forEach((optionValue) => {
      const option = createEl('option', { attrs: { value: optionValue }, text: optionValue });
      if (optionValue === value) option.selected = true;
      input.append(option);
    });
  } else if (field.type === 'textarea') {
    input = createEl('textarea', { attrs: { id: field.name, name: field.name } });
    input.value = value ?? '';
  } else {
    input = createEl('input', {
      attrs: {
        id: field.name,
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

  const eventName = field.type === 'range' ? 'input' : 'input';
  input.addEventListener(eventName, () => {
    let nextValue = input.value;
    if (field.type === 'range' || field.type === 'number') nextValue = Number(nextValue);
    onChange(field, nextValue);
    if (field.type === 'range' && metaValue) {
      metaValue.textContent = renderRangeValue(nextValue, field.unit ?? '');
    }
  });

  wrapper.append(input);

  let metaValue = null;
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
