import { CONSTRAINTS, DEFAULT_CONSTRAINTS, collectNotes, elementList, getElementSchema, getIntent, getStyleDna, intentList, styleDnaList } from './registry.js';
import { configFromElement, configFromIntent, groupFields } from './schema-engine.js';
import { applyStyleDna } from './style-dna-engine.js';
import { applyConstraints } from './constraint-engine.js';
import { renderForm } from './form-renderer.js';
import { renderSinglePreview } from './preview-engine.js';
import { renderStateMatrix } from './state-matrix.js';
import { generateOutputs } from './code-generator.js';
import { copyText } from './clipboard.js';
import { deletePreset, listPresets, listRecentBuilds, loadAppState, saveAppState, savePreset, saveRecentBuild } from './storage.js';
import { deepClone, prettifyLabel, uniqueId } from './utils.js';

const refs = {
  startMode: document.querySelector('#startMode'),
  elementSelect: document.querySelector('#elementSelect'),
  intentSelect: document.querySelector('#intentSelect'),
  styleDnaSelect: document.querySelector('#styleDnaSelect'),
  constraintsList: document.querySelector('#constraintsList'),
  coreForm: document.querySelector('#coreForm'),
  effectsForm: document.querySelector('#effectsForm'),
  expertForm: document.querySelector('#expertForm'),
  previewRoot: document.querySelector('#previewRoot'),
  previewStyle: document.querySelector('#previewStyle'),
  previewFrame: document.querySelector('#previewFrame'),
  buildSummary: document.querySelector('#buildSummary'),
  warningPanel: document.querySelector('#warningPanel'),
  htmlOutput: document.querySelector('#htmlOutput'),
  cssOutput: document.querySelector('#cssOutput'),
  jsOutput: document.querySelector('#jsOutput'),
  copyCurrentBtn: document.querySelector('#copyCurrentBtn'),
  copyAllBtn: document.querySelector('#copyAllBtn'),
  savePresetBtn: document.querySelector('#savePresetBtn'),
  presetSelect: document.querySelector('#presetSelect'),
  loadPresetBtn: document.querySelector('#loadPresetBtn'),
  deletePresetBtn: document.querySelector('#deletePresetBtn'),
  recentList: document.querySelector('#recentList'),
  notesList: document.querySelector('#notesList'),
  toast: document.querySelector('#toast'),
  installBtn: document.querySelector('#installBtn'),
  elementField: document.querySelector('#elementField'),
  intentField: document.querySelector('#intentField')
};

const state = {
  startMode: 'element',
  activeElement: 'button',
  activeIntent: 'primary-cta',
  activeStyleDna: 'minimal',
  activeConstraints: [...DEFAULT_CONSTRAINTS],
  config: {},
  previewMode: 'single',
  viewport: 'mobile',
  codeTab: 'html',
  touchedFields: new Set(),
  outputs: { html: '', css: '', js: '' }
};

let deferredInstallPrompt = null;

function toast(message) {
  refs.toast.textContent = message;
  refs.toast.hidden = false;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => {
    refs.toast.hidden = true;
  }, 2400);
}

function persist() {
  saveAppState({
    startMode: state.startMode,
    activeElement: state.activeElement,
    activeIntent: state.activeIntent,
    activeStyleDna: state.activeStyleDna,
    activeConstraints: state.activeConstraints,
    config: state.config,
    previewMode: state.previewMode,
    viewport: state.viewport,
    codeTab: state.codeTab
  });
}

function hydrate() {
  const cached = loadAppState();
  if (!cached) {
    state.config = applyStyleDna(configFromElement(state.activeElement), state.activeStyleDna, state.touchedFields, { force: true });
    return;
  }
  Object.assign(state, cached);
  state.activeConstraints = Array.isArray(cached.activeConstraints) ? cached.activeConstraints : [...DEFAULT_CONSTRAINTS];
  state.touchedFields = new Set();
  state.config = cached.config || configFromElement(state.activeElement);
}

function populateSelect(select, items) {
  select.innerHTML = '';
  items.forEach((item) => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = item.label;
    select.append(option);
  });
}

function renderConstraintList() {
  refs.constraintsList.innerHTML = '';
  Object.values(CONSTRAINTS).forEach((constraint) => {
    const row = document.createElement('label');
    row.className = 'checkbox-row';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = state.activeConstraints.includes(constraint.id);
    input.addEventListener('change', () => {
      if (input.checked) {
        state.activeConstraints = [...new Set([...state.activeConstraints, constraint.id])];
      } else {
        state.activeConstraints = state.activeConstraints.filter((item) => item !== constraint.id);
      }
      rerender();
    });
    const copy = document.createElement('div');
    const title = document.createElement('div');
    title.textContent = constraint.label;
    const detail = document.createElement('div');
    detail.className = 'muted';
    detail.textContent = constraint.description;
    copy.append(title, detail);
    row.append(input, copy);
    refs.constraintsList.append(row);
  });
}

function loadElement(elementId, { resetTouched = true } = {}) {
  state.activeElement = elementId;
  state.startMode = 'element';
  state.config = applyStyleDna(configFromElement(elementId), state.activeStyleDna, state.touchedFields, { force: true });
  if (resetTouched) state.touchedFields = new Set();
  refs.elementSelect.value = elementId;
  refs.startMode.value = state.startMode;
  rerender();
}

function loadIntent(intentId, { resetTouched = true } = {}) {
  const { schema, config } = configFromIntent(intentId);
  state.startMode = 'intent';
  state.activeIntent = intentId;
  state.activeElement = schema.id;
  state.config = applyStyleDna(config, state.activeStyleDna, state.touchedFields, { force: true });
  if (resetTouched) state.touchedFields = new Set();
  refs.intentSelect.value = intentId;
  refs.elementSelect.value = schema.id;
  refs.startMode.value = state.startMode;
  rerender();
}

function getEffectiveState() {
  const schema = getElementSchema(state.activeElement);
  let effectiveConfig = applyStyleDna(deepClone(state.config), state.activeStyleDna, state.touchedFields);
  const constrained = applyConstraints(schema.id, effectiveConfig, state.activeConstraints);
  effectiveConfig = constrained.config;
  return {
    schema,
    dna: getStyleDna(state.activeStyleDna),
    config: effectiveConfig,
    warnings: constrained.warnings
  };
}

function renderWarnings(warnings) {
  refs.warningPanel.innerHTML = '';
  refs.warningPanel.hidden = warnings.length === 0;
  warnings.forEach((warning) => {
    const item = document.createElement('div');
    item.className = 'warning-item';
    item.innerHTML = `<strong>${warning.title}</strong><span>${warning.detail}</span>`;
    refs.warningPanel.append(item);
  });
}

function renderNotes(notes) {
  refs.notesList.innerHTML = '';
  notes.forEach((note) => {
    const li = document.createElement('li');
    li.textContent = note;
    refs.notesList.append(li);
  });
}

function renderCodeTabs() {
  document.querySelectorAll('[data-code-tab]').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.codeTab === state.codeTab);
  });
  refs.htmlOutput.classList.toggle('is-active', state.codeTab === 'html');
  refs.cssOutput.classList.toggle('is-active', state.codeTab === 'css');
  refs.jsOutput.classList.toggle('is-active', state.codeTab === 'js');
}



function captureFormFocus() {
  const active = document.activeElement;
  if (!active) return null;
  if (!(refs.coreForm.contains(active) || refs.effectsForm.contains(active) || refs.expertForm.contains(active))) {
    return null;
  }
  return {
    name: active.name,
    tagName: active.tagName,
    type: active.type,
    selectionStart: typeof active.selectionStart === 'number' ? active.selectionStart : null,
    selectionEnd: typeof active.selectionEnd === 'number' ? active.selectionEnd : null
  };
}

function restoreFormFocus(snapshot) {
  if (!snapshot?.name) return;
  const selector = `[name="${CSS.escape(snapshot.name)}"]`;
  const next = refs.coreForm.querySelector(selector)
    || refs.effectsForm.querySelector(selector)
    || refs.expertForm.querySelector(selector);
  if (!next) return;
  if (typeof next.focus === 'function') next.focus({ preventScroll: true });
  if (
    typeof next.setSelectionRange === 'function'
    && snapshot.selectionStart !== null
    && snapshot.selectionEnd !== null
    && (next.tagName === 'TEXTAREA' || next.type === 'text' || next.type === 'search' || next.type === 'url' || next.type === 'tel' || next.type === 'password')
  ) {
    next.setSelectionRange(snapshot.selectionStart, snapshot.selectionEnd);
  }
}

function renderViewportButtons() {
  document.querySelectorAll('[data-viewport]').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.viewport === state.viewport);
  });
  refs.previewFrame.className = `preview-frame preview-frame--${state.viewport}`;
}

function renderPreviewButtons() {
  document.querySelectorAll('[data-preview-mode]').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.previewMode === state.previewMode);
  });
}

function rerenderForms(schema, values) {
  const groups = groupFields(schema);
  const onChange = (field, nextValue) => {
    state.config[field.name] = nextValue;
    state.touchedFields.add(field.name);
    rerender({ skipForms: true });
  };
  renderForm(refs.coreForm, groups.core, values, onChange);
  renderForm(refs.effectsForm, groups.effects, values, onChange);
  renderForm(refs.expertForm, groups.expert, values, onChange);
}

function rerenderPreview(schema, config, outputs) {
  refs.previewStyle.textContent = outputs.css;

  const htmlForState = (previewState) => schema.generateHtml({ ...config, previewState }, getStyleDna(state.activeStyleDna), state.activeConstraints);

  if (state.previewMode === 'matrix') {
    renderStateMatrix(refs.previewRoot, schema, htmlForState);
  } else {
    renderSinglePreview(refs.previewRoot, htmlForState('default'));
  }
}

async function refreshPresetUi() {
  const presets = await listPresets();
  refs.presetSelect.innerHTML = '<option value="">Select a preset</option>';
  presets.forEach((preset) => {
    const option = document.createElement('option');
    option.value = preset.id;
    option.textContent = preset.name;
    refs.presetSelect.append(option);
  });
}

async function refreshRecents() {
  const builds = await listRecentBuilds();
  refs.recentList.innerHTML = '';
  if (!builds.length) {
    const li = document.createElement('li');
    li.textContent = 'No recent builds yet.';
    refs.recentList.append(li);
    return;
  }

  builds.forEach((build) => {
    const li = document.createElement('li');
    li.textContent = `${prettifyLabel(build.elementId)} · ${prettifyLabel(build.styleDna)} · ${new Date(build.updatedAt).toLocaleString()}`;
    refs.recentList.append(li);
  });
}

async function saveCurrentAsRecent() {
  await saveRecentBuild({
    id: uniqueId('recent'),
    elementId: state.activeElement,
    styleDna: state.activeStyleDna,
    config: state.config
  });
  refreshRecents();
}

function syncVisibility() {
  refs.elementField.hidden = state.startMode !== 'element';
  refs.intentField.hidden = state.startMode !== 'intent';
}

function rerender({ preserveFormFocus = false, skipForms = false } = {}) {
  const focusSnapshot = preserveFormFocus ? captureFormFocus() : null;

  syncVisibility();
  renderConstraintList();
  renderViewportButtons();
  renderPreviewButtons();
  renderCodeTabs();

  const { schema, dna, config, warnings } = getEffectiveState();
  refs.buildSummary.textContent = `${schema.label} · ${dna.label}`;
  if (!skipForms) {
    rerenderForms(schema, config);
  }
  if (focusSnapshot) restoreFormFocus(focusSnapshot);

  const outputs = generateOutputs(schema, config, dna, state.activeConstraints);
  state.outputs = outputs;
  refs.htmlOutput.value = outputs.html;
  refs.cssOutput.value = outputs.css;
  refs.jsOutput.value = outputs.js || '// No JavaScript needed for this configuration.';
  renderWarnings(warnings);
  renderNotes(collectNotes(schema, config, state.activeConstraints));
  rerenderPreview(schema, config, outputs);

  state.config = config;
  persist();
  saveCurrentAsRecent();
}

function bindEvents() {
  refs.startMode.addEventListener('change', () => {
    state.startMode = refs.startMode.value;
    if (state.startMode === 'intent') {
      loadIntent(refs.intentSelect.value || state.activeIntent);
    } else {
      loadElement(refs.elementSelect.value || state.activeElement);
    }
  });

  refs.elementSelect.addEventListener('change', () => loadElement(refs.elementSelect.value));
  refs.intentSelect.addEventListener('change', () => loadIntent(refs.intentSelect.value));

  refs.styleDnaSelect.addEventListener('change', () => {
    state.activeStyleDna = refs.styleDnaSelect.value;
    state.config = applyStyleDna(state.config, state.activeStyleDna, state.touchedFields, { force: true });
    rerender();
  });

  document.querySelectorAll('[data-preview-mode]').forEach((button) => {
    button.addEventListener('click', () => {
      state.previewMode = button.dataset.previewMode;
      rerender();
    });
  });

  document.querySelectorAll('[data-viewport]').forEach((button) => {
    button.addEventListener('click', () => {
      state.viewport = button.dataset.viewport;
      rerender();
    });
  });

  document.querySelectorAll('[data-code-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      state.codeTab = button.dataset.codeTab;
      renderCodeTabs();
      persist();
    });
  });

  refs.copyCurrentBtn.addEventListener('click', async () => {
    const value = state.codeTab === 'html'
      ? refs.htmlOutput.value
      : state.codeTab === 'css'
        ? refs.cssOutput.value
        : refs.jsOutput.value;
    await copyText(value);
    toast(`${state.codeTab.toUpperCase()} copied`);
  });

  refs.copyAllBtn.addEventListener('click', async () => {
    const joined = [
      '/* HTML */',
      refs.htmlOutput.value,
      '',
      '/* CSS */',
      refs.cssOutput.value,
      '',
      '/* JS */',
      refs.jsOutput.value
    ].join('\n');
    await copyText(joined);
    toast('HTML, CSS, and JS copied');
  });

  refs.savePresetBtn.addEventListener('click', async () => {
    const name = window.prompt('Preset name');
    if (!name) return;
    await savePreset({
      id: uniqueId('preset'),
      name,
      elementId: state.activeElement,
      styleDna: state.activeStyleDna,
      constraints: state.activeConstraints,
      config: state.config
    });
    await refreshPresetUi();
    toast('Preset saved');
  });

  refs.loadPresetBtn.addEventListener('click', async () => {
    const presetId = refs.presetSelect.value;
    if (!presetId) return;
    const presets = await listPresets();
    const preset = presets.find((item) => item.id === presetId);
    if (!preset) return;
    state.activeElement = preset.elementId;
    state.activeStyleDna = preset.styleDna;
    state.activeConstraints = preset.constraints || [...DEFAULT_CONSTRAINTS];
    state.config = preset.config || configFromElement(preset.elementId);
    refs.elementSelect.value = state.activeElement;
    refs.styleDnaSelect.value = state.activeStyleDna;
    state.startMode = 'element';
    refs.startMode.value = 'element';
    rerender();
    toast('Preset loaded');
  });

  refs.deletePresetBtn.addEventListener('click', async () => {
    const presetId = refs.presetSelect.value;
    if (!presetId) return;
    await deletePreset(presetId);
    refs.presetSelect.value = '';
    await refreshPresetUi();
    toast('Preset deleted');
  });

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    refs.installBtn.hidden = false;
  });

  refs.installBtn.addEventListener('click', async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    refs.installBtn.hidden = true;
  });
}

async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  try {
    await navigator.serviceWorker.register('./sw.js');
  } catch (error) {
    console.error('Service worker registration failed', error);
  }
}

function initSelectors() {
  populateSelect(refs.elementSelect, elementList());
  populateSelect(refs.intentSelect, intentList());
  populateSelect(refs.styleDnaSelect, styleDnaList());

  refs.startMode.value = state.startMode;
  refs.elementSelect.value = state.activeElement;
  refs.intentSelect.value = state.activeIntent;
  refs.styleDnaSelect.value = state.activeStyleDna;
}

async function init() {
  hydrate();
  initSelectors();
  bindEvents();
  await refreshPresetUi();
  await refreshRecents();
  syncVisibility();
  rerender();
  registerServiceWorker();
}

init();
