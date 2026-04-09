import { escapeHtml, px } from './utils.js';

export const DEFAULT_CONSTRAINTS = ['mobile-safe', 'min-tap-target', 'keyboard-accessible'];

export const CONSTRAINTS = {
  'mobile-safe': {
    id: 'mobile-safe',
    label: 'Mobile-safe',
    description: 'Keeps widths and spacing reasonable on narrow viewports.'
  },
  'min-tap-target': {
    id: 'min-tap-target',
    label: 'Minimum tap target',
    description: 'Aims for a 44px-ish minimum target for interactive elements.'
  },
  'keyboard-accessible': {
    id: 'keyboard-accessible',
    label: 'Keyboard accessible',
    description: 'Preserves focus visibility and keyboard behavior.'
  },
  'low-motion': {
    id: 'low-motion',
    label: 'Low-motion friendly',
    description: 'Reduces lifts, transitions, and visual motion.'
  },
  'no-js': {
    id: 'no-js',
    label: 'No JavaScript',
    description: 'Prefers static or CSS-only behavior.'
  },
  'dark-mode': {
    id: 'dark-mode',
    label: 'Dark mode compatible',
    description: 'Adds a dark-mode media block to exported CSS.'
  },
  'lightweight-css': {
    id: 'lightweight-css',
    label: 'Lightweight CSS',
    description: 'Strips heavier effects like gradients, blur, and glow.'
  },
  'no-dependencies': {
    id: 'no-dependencies',
    label: 'No external dependencies',
    description: 'Keeps the output dependency-free.'
  },
  'embed-safe': {
    id: 'embed-safe',
    label: 'Embed-safe',
    description: 'Uses a safe class prefix and avoids broad selectors.'
  },
  'token-ready': {
    id: 'token-ready',
    label: 'Token-ready output',
    description: 'Emphasizes CSS variables in the export.'
  }
};

export const STYLE_DNA = {
  minimal: {
    id: 'minimal',
    label: 'Minimal',
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
    accent: '#2563eb',
    accentSoft: '#dbeafe',
    accentAlt: '#1d4ed8',
    surface: '#ffffff',
    surfaceAlt: '#f8fafc',
    surfaceTint: 'rgba(255,255,255,0.72)',
    text: '#0f172a',
    textSoft: '#475569',
    border: '#cbd5e1',
    borderStrong: '#94a3b8',
    destructive: '#dc2626',
    success: '#16a34a',
    warning: '#ca8a04',
    radius: 14,
    borderWidth: 1,
    shadowDepth: 1,
    glass: false
  },
  enterprise: {
    id: 'enterprise',
    label: 'Enterprise',
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
    accent: '#1d4ed8',
    accentSoft: '#dbeafe',
    accentAlt: '#2563eb',
    surface: '#ffffff',
    surfaceAlt: '#eff6ff',
    surfaceTint: 'rgba(255,255,255,0.8)',
    text: '#0f172a',
    textSoft: '#334155',
    border: '#94a3b8',
    borderStrong: '#64748b',
    destructive: '#dc2626',
    success: '#059669',
    warning: '#d97706',
    radius: 12,
    borderWidth: 1,
    shadowDepth: 2,
    glass: false
  },
  glass: {
    id: 'glass',
    label: 'Glass',
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
    accent: '#7c3aed',
    accentSoft: '#ede9fe',
    accentAlt: '#5b21b6',
    surface: 'rgba(255,255,255,0.22)',
    surfaceAlt: 'rgba(255,255,255,0.34)',
    surfaceTint: 'rgba(255,255,255,0.3)',
    text: '#eff6ff',
    textSoft: '#dbeafe',
    border: 'rgba(255,255,255,0.28)',
    borderStrong: 'rgba(255,255,255,0.42)',
    destructive: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
    radius: 20,
    borderWidth: 1,
    shadowDepth: 3,
    glass: true
  },
  editorial: {
    id: 'editorial',
    label: 'Editorial',
    fontFamily: '"Iowan Old Style", Georgia, serif',
    accent: '#111827',
    accentSoft: '#f3f4f6',
    accentAlt: '#374151',
    surface: '#fcfaf7',
    surfaceAlt: '#f7f2eb',
    surfaceTint: 'rgba(252,250,247,0.76)',
    text: '#171717',
    textSoft: '#57534e',
    border: '#d6d3d1',
    borderStrong: '#a8a29e',
    destructive: '#991b1b',
    success: '#166534',
    warning: '#92400e',
    radius: 6,
    borderWidth: 1,
    shadowDepth: 0,
    glass: false
  },
  brutalist: {
    id: 'brutalist',
    label: 'Brutalist',
    fontFamily: '"Arial Black", Arial, sans-serif',
    accent: '#ff4d00',
    accentSoft: '#ffedd5',
    accentAlt: '#111827',
    surface: '#ffffff',
    surfaceAlt: '#fef2f2',
    surfaceTint: 'rgba(255,255,255,0.9)',
    text: '#09090b',
    textSoft: '#27272a',
    border: '#111827',
    borderStrong: '#111827',
    destructive: '#dc2626',
    success: '#15803d',
    warning: '#ca8a04',
    radius: 2,
    borderWidth: 3,
    shadowDepth: 0,
    glass: false
  },
  'playful-saas': {
    id: 'playful-saas',
    label: 'Playful SaaS',
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
    accent: '#7c3aed',
    accentSoft: '#e9d5ff',
    accentAlt: '#06b6d4',
    surface: '#ffffff',
    surfaceAlt: '#f5f3ff',
    surfaceTint: 'rgba(255,255,255,0.82)',
    text: '#111827',
    textSoft: '#4b5563',
    border: '#ddd6fe',
    borderStrong: '#a78bfa',
    destructive: '#e11d48',
    success: '#22c55e',
    warning: '#f59e0b',
    radius: 18,
    borderWidth: 1,
    shadowDepth: 3,
    glass: false
  },
  'dark-console': {
    id: 'dark-console',
    label: 'Dark Console',
    fontFamily: '"SFMono-Regular", ui-monospace, Menlo, Consolas, monospace',
    accent: '#10b981',
    accentSoft: '#052e2b',
    accentAlt: '#34d399',
    surface: '#071117',
    surfaceAlt: '#0d1720',
    surfaceTint: 'rgba(7,17,23,0.8)',
    text: '#d1fae5',
    textSoft: '#86efac',
    border: '#12352d',
    borderStrong: '#1f5c50',
    destructive: '#fb7185',
    success: '#22c55e',
    warning: '#fbbf24',
    radius: 8,
    borderWidth: 1,
    shadowDepth: 1,
    glass: false
  }
};

export const INTENTS = {
  'primary-cta': {
    id: 'primary-cta',
    label: 'Primary CTA',
    element: 'button',
    config: { variant: 'primary', size: 'lg', text: 'Start now', shadowDepth: 3, glow: true }
  },
  'secondary-action': {
    id: 'secondary-action',
    label: 'Secondary action',
    element: 'button',
    config: { variant: 'secondary', size: 'md', text: 'Learn more', shadowDepth: 1 }
  },
  'destructive-action': {
    id: 'destructive-action',
    label: 'Destructive action',
    element: 'button',
    config: { variant: 'destructive', size: 'md', text: 'Delete item', glow: false }
  },
  'promo-card': {
    id: 'promo-card',
    label: 'Promo card',
    element: 'card',
    config: { title: 'Grow conversions', body: 'Lead with a short value prop and support it with one action.', ctaText: 'Explore', variant: 'elevated', gradient: true, shadowDepth: 3 }
  },
  'info-card': {
    id: 'info-card',
    label: 'Info card',
    element: 'card',
    config: { title: 'System status', body: 'All services are online and healthy.', ctaText: 'View report', variant: 'outline', gradient: false, shadowDepth: 1 }
  },
  'form-input': {
    id: 'form-input',
    label: 'Form input',
    element: 'input',
    config: { label: 'Email', placeholder: 'name@example.com', helper: 'We will never share it.', required: true }
  },
  'status-badge': {
    id: 'status-badge',
    label: 'Status badge',
    element: 'badge',
    config: { text: 'Healthy', tone: 'success', outlined: false, gradient: false }
  },
  'center-modal': {
    id: 'center-modal',
    label: 'Center modal',
    element: 'modal',
    config: { layout: 'center', triggerText: 'Open modal', title: 'Confirm action', body: 'This change will affect the live workspace.', confirmText: 'Confirm', cancelText: 'Cancel' }
  },
  'sheet-modal': {
    id: 'sheet-modal',
    label: 'Sheet modal',
    element: 'modal',
    config: { layout: 'sheet', triggerText: 'Open sheet', title: 'Mobile actions', body: 'Choose one of the quick actions below.', confirmText: 'Continue', cancelText: 'Dismiss' }
  }
};

function buildThemeVars(prefix, dna) {
  return `.${prefix}-theme{
  --ui-font:${dna.fontFamily};
  --ui-accent:${dna.accent};
  --ui-accent-soft:${dna.accentSoft};
  --ui-accent-alt:${dna.accentAlt};
  --ui-surface:${dna.surface};
  --ui-surface-alt:${dna.surfaceAlt};
  --ui-surface-tint:${dna.surfaceTint};
  --ui-text:${dna.text};
  --ui-text-soft:${dna.textSoft};
  --ui-border:${dna.border};
  --ui-border-strong:${dna.borderStrong};
  --ui-danger:${dna.destructive};
  --ui-success:${dna.success};
  --ui-warning:${dna.warning};
}`;
}

function shadowFor(depth) {
  const d = Number(depth) || 0;
  if (d <= 0) return 'none';
  if (d === 1) return '0 6px 18px rgba(15, 23, 42, 0.10)';
  if (d === 2) return '0 12px 28px rgba(15, 23, 42, 0.16)';
  if (d === 3) return '0 18px 44px rgba(15, 23, 42, 0.22)';
  return '0 24px 60px rgba(15, 23, 42, 0.28)';
}

function transitionMs(config) {
  return `${Number(config.transitionSpeed) || 160}ms`;
}

function baseNotes(config, constraints = []) {
  const notes = [
    'Vanilla-first export with separate HTML, CSS, and JS.',
    `Class prefix: ${config.classPrefix || 'uiforge'}.`
  ];
  if (constraints.includes('token-ready')) {
    notes.push('Export is token-friendly and leans on CSS variables.');
  }
  if (constraints.includes('dark-mode')) {
    notes.push('CSS includes a dark-mode media block.');
  }
  if (constraints.includes('no-js')) {
    notes.push('JavaScript output is reduced where possible.');
  }
  return notes;
}

function buttonCss(prefix, config, dna, constraints) {
  const radius = px(config.radius);
  const py = px(config.paddingY);
  const pxv = px(config.paddingX);
  const fontSize = px(config.fontSize);
  const borderWidth = px(config.borderWidth);
  const shadow = shadowFor(config.shadowDepth);
  const hoverTranslate = `${Math.max(0, Number(config.hoverLift) || 0)}px`;
  const activeTranslate = `${Math.max(0, Number(config.pressDepth) || 0)}px`;
  const glassBlock = config.glass ? `
  backdrop-filter: blur(${px(config.blur || 12)});
  -webkit-backdrop-filter: blur(${px(config.blur || 12)});` : '';
  const glowBlock = config.glow ? `
  box-shadow: ${shadow}, 0 0 0 1px rgba(255,255,255,0.1), 0 0 26px color-mix(in srgb, var(--ui-accent) 35%, transparent);` : `
  box-shadow: ${shadow};`;
  const backgroundPrimary = config.gradient
    ? 'linear-gradient(135deg, var(--ui-accent), var(--ui-accent-alt))'
    : 'var(--ui-accent)';
  const backgroundSecondary = config.glass
    ? 'var(--ui-surface-tint)'
    : 'var(--ui-surface)';
  const darkMode = constraints.includes('dark-mode') ? `
@media (prefers-color-scheme: dark){
  .${prefix}-theme{
    --ui-surface:#071117;
    --ui-surface-alt:#0d1720;
    --ui-text:#eff6ff;
    --ui-text-soft:#cbd5e1;
    --ui-border:#22324d;
    --ui-border-strong:#3c5d93;
  }
}` : '';
  return `${buildThemeVars(prefix, dna)}
.${prefix}-button{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:0.65rem;
  width:${config.fullWidth ? '100%' : 'auto'};
  min-height:44px;
  padding:${py} ${pxv};
  border-radius:${radius};
  border:${borderWidth} solid var(--ui-border);
  background:${backgroundPrimary};
  color:#ffffff;
  font-family:var(--ui-font);
  font-size:${fontSize};
  font-weight:700;
  letter-spacing:0.01em;
  cursor:pointer;
  text-decoration:none;
  transition:
    transform ${transitionMs(config)} ease,
    box-shadow ${transitionMs(config)} ease,
    border-color ${transitionMs(config)} ease,
    filter ${transitionMs(config)} ease;
  ${glowBlock}${glassBlock}
}
.${prefix}-button--secondary{
  background:${backgroundSecondary};
  color:var(--ui-text);
}
.${prefix}-button--ghost{
  background:transparent;
  color:var(--ui-text);
}
.${prefix}-button--destructive{
  background:var(--ui-danger);
  border-color:color-mix(in srgb, var(--ui-danger) 78%, black);
}
.${prefix}-button--sm{font-size:${px(Math.max(13, Number(config.fontSize) - 2))};}
.${prefix}-button--md{font-size:${fontSize};}
.${prefix}-button--lg{font-size:${px(Number(config.fontSize) + 1)}; padding:${px(Number(config.paddingY) + 1)} ${px(Number(config.paddingX) + 4)};}
.${prefix}-button:hover,
[data-preview-state="hover"] .${prefix}-button{
  transform:translateY(calc(${hoverTranslate} * -1));
  filter:brightness(1.02);
}
.${prefix}-button:focus-visible,
[data-preview-state="focus"] .${prefix}-button{
  outline:3px solid color-mix(in srgb, var(--ui-accent) 38%, white);
  outline-offset:3px;
}
.${prefix}-button:active,
[data-preview-state="active"] .${prefix}-button{
  transform:translateY(${activeTranslate});
  filter:brightness(0.98);
}
.${prefix}-button:disabled,
[data-preview-state="disabled"] .${prefix}-button{
  opacity:0.56;
  cursor:not-allowed;
  transform:none;
  filter:none;
}
[data-preview-state="loading"] .${prefix}-button::after{
  content:"···";
  letter-spacing:0.2em;
}
${darkMode}`;
}

function buttonHtml(config) {
  const prefix = config.classPrefix;
  const disabled = config.previewState === 'disabled' ? ' disabled' : '';
  const ariaLabel = config.ariaLabel ? ` aria-label="${escapeHtml(config.ariaLabel)}"` : '';
  return `<div class="${prefix}-preview-shell ${prefix}-theme" data-center="true">
  <button class="${prefix}-button ${prefix}-button--${config.variant} ${prefix}-button--${config.size}" type="button"${disabled}${ariaLabel}>${escapeHtml(config.text)}</button>
</div>`;
}

function buttonJs(config, constraints) {
  if (constraints.includes('no-js')) return '';
  return '';
}

function cardCss(prefix, config, dna, constraints) {
  const borderWidth = px(config.borderWidth);
  const bg = config.gradient ? 'linear-gradient(145deg, color-mix(in srgb, var(--ui-accent-soft) 52%, var(--ui-surface)), var(--ui-surface))' : 'var(--ui-surface)';
  const darkMode = constraints.includes('dark-mode') ? `
@media (prefers-color-scheme: dark){
  .${prefix}-theme{
    --ui-surface:#0b1323;
    --ui-surface-alt:#10192d;
    --ui-text:#eff6ff;
    --ui-text-soft:#cbd5e1;
    --ui-border:#253753;
  }
}` : '';
  return `${buildThemeVars(prefix, dna)}
.${prefix}-card{
  width:min(100%, ${px(config.width)});
  display:grid;
  gap:0.95rem;
  padding:${px(config.padding)};
  border-radius:${px(config.radius)};
  border:${borderWidth} solid var(--ui-border);
  background:${config.glass ? 'var(--ui-surface-tint)' : bg};
  color:var(--ui-text);
  box-shadow:${shadowFor(config.shadowDepth)};
  transition:
    transform ${transitionMs(config)} ease,
    box-shadow ${transitionMs(config)} ease,
    border-color ${transitionMs(config)} ease;
  ${config.glass ? `backdrop-filter: blur(${px(config.blur || 12)}); -webkit-backdrop-filter: blur(${px(config.blur || 12)});` : ''}
}
.${prefix}-card__eyebrow{
  color:var(--ui-text-soft);
  font-size:0.8rem;
  text-transform:uppercase;
  letter-spacing:0.12em;
}
.${prefix}-card__title{
  margin:0;
  font:700 ${px(config.titleSize)} / 1.15 var(--ui-font);
}
.${prefix}-card__body{
  margin:0;
  color:var(--ui-text-soft);
  font-size:${px(config.bodySize)};
  line-height:1.55;
}
.${prefix}-card__action{
  display:inline-flex;
  align-items:center;
  gap:0.5rem;
  color:${config.variant === 'outline' ? 'var(--ui-text)' : 'var(--ui-accent)'};
  text-decoration:none;
  font-weight:700;
}
.${prefix}-card:hover,
[data-preview-state="hover"] .${prefix}-card{
  transform:translateY(calc(${px(Math.max(0, Number(config.hoverLift) || 0))} * -1));
  box-shadow:${shadowFor(Math.min(4, Number(config.shadowDepth) + 1))};
}
[data-preview-state="selected"] .${prefix}-card{
  border-color:var(--ui-accent);
  box-shadow:${shadowFor(Math.min(4, Number(config.shadowDepth) + 1))}, 0 0 0 3px color-mix(in srgb, var(--ui-accent) 20%, transparent);
}
${darkMode}`;
}

function cardHtml(config) {
  const prefix = config.classPrefix;
  return `<div class="${prefix}-preview-shell ${prefix}-theme" data-center="true">
  <article class="${prefix}-card ${prefix}-card--${config.variant}">
    <span class="${prefix}-card__eyebrow">${escapeHtml(config.badge)}</span>
    <h3 class="${prefix}-card__title">${escapeHtml(config.title)}</h3>
    <p class="${prefix}-card__body">${escapeHtml(config.body)}</p>
    <a class="${prefix}-card__action" href="#0">${escapeHtml(config.ctaText)} <span aria-hidden="true">→</span></a>
  </article>
</div>`;
}

function inputCss(prefix, config, dna, constraints) {
  const darkMode = constraints.includes('dark-mode') ? `
@media (prefers-color-scheme: dark){
  .${prefix}-theme{
    --ui-surface:#0b1323;
    --ui-surface-alt:#10192d;
    --ui-text:#eff6ff;
    --ui-text-soft:#cbd5e1;
    --ui-border:#22324d;
  }
}` : '';
  return `${buildThemeVars(prefix, dna)}
.${prefix}-field{
  width:min(100%, ${px(config.width)});
  display:grid;
  gap:0.5rem;
  font-family:var(--ui-font);
}
.${prefix}-field__label{
  color:var(--ui-text);
  font-size:0.86rem;
  font-weight:650;
}
.${prefix}-field__control{
  width:100%;
  min-height:44px;
  padding:${px(config.paddingY)} ${px(config.paddingX)};
  border-radius:${px(config.radius)};
  border:${px(config.borderWidth)} solid var(--ui-border);
  background:var(--ui-surface);
  color:var(--ui-text);
  font-size:${px(config.fontSize)};
  box-shadow:${shadowFor(config.shadowDepth)};
  transition:border-color ${transitionMs(config)} ease, box-shadow ${transitionMs(config)} ease, transform ${transitionMs(config)} ease;
}
.${prefix}-field__control:focus-visible,
[data-preview-state="focus"] .${prefix}-field__control{
  outline:none;
  border-color:var(--ui-accent);
  box-shadow:${shadowFor(config.shadowDepth)}, 0 0 0 4px color-mix(in srgb, var(--ui-accent) 20%, transparent);
}
[data-preview-state="disabled"] .${prefix}-field__control{
  opacity:0.62;
  cursor:not-allowed;
}
[data-preview-state="invalid"] .${prefix}-field__control{
  border-color:var(--ui-danger);
  box-shadow:${shadowFor(config.shadowDepth)}, 0 0 0 4px color-mix(in srgb, var(--ui-danger) 16%, transparent);
}
[data-preview-state="success"] .${prefix}-field__control{
  border-color:var(--ui-success);
  box-shadow:${shadowFor(config.shadowDepth)}, 0 0 0 4px color-mix(in srgb, var(--ui-success) 16%, transparent);
}
.${prefix}-field__helper{
  font-size:0.8rem;
  color:var(--ui-text-soft);
}
[data-preview-state="invalid"] .${prefix}-field__helper{
  color:var(--ui-danger);
}
[data-preview-state="success"] .${prefix}-field__helper{
  color:var(--ui-success);
}
${darkMode}`;
}

function inputHtml(config) {
  const prefix = config.classPrefix;
  const state = config.previewState || 'default';
  const disabled = state === 'disabled' ? ' disabled' : '';
  const helperText = state === 'invalid'
    ? config.invalidMessage
    : state === 'success'
      ? config.successMessage
      : config.helper;
  return `<div class="${prefix}-preview-shell ${prefix}-theme" data-center="true">
  <label class="${prefix}-field">
    <span class="${prefix}-field__label">${escapeHtml(config.label)}${config.required ? ' *' : ''}</span>
    <input class="${prefix}-field__control" type="${escapeHtml(config.inputType)}" placeholder="${escapeHtml(config.placeholder)}"${disabled}>
    <span class="${prefix}-field__helper">${escapeHtml(helperText)}</span>
  </label>
</div>`;
}

function modalCss(prefix, config, dna, constraints) {
  const positionRule = config.layout === 'sheet'
    ? `align-items:end; justify-content:center;`
    : `align-items:center; justify-content:center;`;
  const panelRadius = config.layout === 'sheet'
    ? `${px(config.radius)} ${px(config.radius)} 0 0`
    : px(config.radius);
  const panelWidth = config.layout === 'sheet'
    ? 'min(100%, 42rem)'
    : `min(100%, ${px(config.width)})`;
  const darkMode = constraints.includes('dark-mode') ? `
@media (prefers-color-scheme: dark){
  .${prefix}-theme{
    --ui-surface:#0b1323;
    --ui-surface-alt:#10192d;
    --ui-text:#eff6ff;
    --ui-text-soft:#cbd5e1;
    --ui-border:#22324d;
  }
}` : '';
  return `${buildThemeVars(prefix, dna)}
.${prefix}-demo{
  display:grid;
  gap:1rem;
}
.${prefix}-trigger{
  justify-self:start;
  min-height:44px;
  padding:0.8rem 1rem;
  border-radius:999px;
  border:${px(config.borderWidth)} solid var(--ui-border);
  background:var(--ui-accent);
  color:#fff;
  cursor:pointer;
  font:700 0.95rem var(--ui-font);
}
.${prefix}-modal{
  position:relative;
  min-height:18rem;
  overflow:hidden;
  border-radius:calc(${panelRadius} + 2px);
  border:1px dashed color-mix(in srgb, var(--ui-border) 80%, transparent);
}
.${prefix}-modal__overlay{
  position:absolute;
  inset:0;
  background:rgba(2, 6, 23, ${Number(config.overlayTint || 0.58)});
  display:flex;
  ${positionRule}
  padding:1rem;
}
.${prefix}-modal__panel{
  width:${panelWidth};
  margin:${config.layout === 'sheet' ? 'auto auto 0' : 'auto'};
  display:grid;
  gap:1rem;
  padding:${px(config.padding)};
  border-radius:${panelRadius};
  border:${px(config.borderWidth)} solid var(--ui-border);
  background:${config.glass ? 'var(--ui-surface-tint)' : 'var(--ui-surface)'};
  color:var(--ui-text);
  box-shadow:${shadowFor(config.shadowDepth)};
  ${config.glass ? `backdrop-filter: blur(${px(config.blur || 12)}); -webkit-backdrop-filter: blur(${px(config.blur || 12)});` : ''}
}
.${prefix}-modal__title{
  margin:0;
  font:700 ${px(config.titleSize)} / 1.15 var(--ui-font);
}
.${prefix}-modal__body{
  margin:0;
  color:var(--ui-text-soft);
  line-height:1.55;
}
.${prefix}-modal__actions{
  display:flex;
  flex-wrap:wrap;
  gap:0.75rem;
  justify-content:flex-end;
}
.${prefix}-modal__button{
  min-height:44px;
  padding:0.72rem 1rem;
  border-radius:999px;
  border:${px(config.borderWidth)} solid var(--ui-border);
  background:var(--ui-surface-alt);
  color:var(--ui-text);
  cursor:pointer;
  font-weight:700;
}
.${prefix}-modal__button--primary{
  background:var(--ui-accent);
  color:#fff;
}
[data-preview-state="closed"] .${prefix}-modal__overlay{
  opacity:0.26;
}
[data-preview-state="destructive"] .${prefix}-modal__button--primary{
  background:var(--ui-danger);
}
${darkMode}`;
}

function modalHtml(config, constraints) {
  const prefix = config.classPrefix;
  const dataStatic = constraints.includes('no-js') ? ' data-static="true"' : '';
  return `<div class="${prefix}-preview-shell ${prefix}-theme" data-stack="true">
  <div class="${prefix}-demo">
    <button class="${prefix}-trigger" type="button">${escapeHtml(config.triggerText)}</button>
    <div class="${prefix}-modal"${dataStatic}>
      <div class="${prefix}-modal__overlay">
        <section class="${prefix}-modal__panel" role="dialog" aria-modal="true" aria-labelledby="${prefix}-modal-title">
          <h3 id="${prefix}-modal-title" class="${prefix}-modal__title">${escapeHtml(config.title)}</h3>
          <p class="${prefix}-modal__body">${escapeHtml(config.body)}</p>
          <div class="${prefix}-modal__actions">
            <button class="${prefix}-modal__button" type="button">${escapeHtml(config.cancelText)}</button>
            <button class="${prefix}-modal__button ${prefix}-modal__button--primary" type="button">${escapeHtml(config.confirmText)}</button>
          </div>
        </section>
      </div>
    </div>
  </div>
</div>`;
}

function modalJs(config, constraints) {
  const prefix = config.classPrefix;
  if (constraints.includes('no-js')) {
    return '';
  }
  return `const root = document.querySelector('.${prefix}-demo');
if (root) {
  const trigger = root.querySelector('.${prefix}-trigger');
  const overlay = root.querySelector('.${prefix}-modal__overlay');
  const panel = root.querySelector('.${prefix}-modal__panel');
  const closeButton = root.querySelector('.${prefix}-modal__button');
  let lastActive = null;

  function openModal() {
    lastActive = document.activeElement;
    root.dataset.open = 'true';
    overlay.hidden = false;
    panel.setAttribute('tabindex', '-1');
    panel.focus();
  }

  function closeModal() {
    root.dataset.open = 'false';
    overlay.hidden = true;
    panel.removeAttribute('tabindex');
    lastActive?.focus?.();
  }

  overlay.hidden = true;
  trigger.addEventListener('click', openModal);
  closeButton?.addEventListener('click', closeModal);

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && root.dataset.open === 'true') {
      closeModal();
    }
  });
}`;
}

function badgeCss(prefix, config, dna, constraints) {
  const toneMap = {
    neutral: ['var(--ui-surface)', 'var(--ui-text)'],
    success: ['color-mix(in srgb, var(--ui-success) 16%, var(--ui-surface))', 'var(--ui-success)'],
    warning: ['color-mix(in srgb, var(--ui-warning) 16%, var(--ui-surface))', 'var(--ui-warning)'],
    error: ['color-mix(in srgb, var(--ui-danger) 16%, var(--ui-surface))', 'var(--ui-danger)'],
    info: ['color-mix(in srgb, var(--ui-accent) 16%, var(--ui-surface))', 'var(--ui-accent)']
  };
  const [bg, fg] = toneMap[config.tone] || toneMap.neutral;
  const darkMode = constraints.includes('dark-mode') ? `
@media (prefers-color-scheme: dark){
  .${prefix}-theme{
    --ui-surface:#071117;
    --ui-text:#eff6ff;
    --ui-border:#22324d;
  }
}` : '';
  return `${buildThemeVars(prefix, dna)}
.${prefix}-badge{
  display:inline-flex;
  align-items:center;
  gap:0.45rem;
  min-height:${config.size === 'sm' ? '28px' : config.size === 'lg' ? '40px' : '34px'};
  padding:${config.size === 'sm' ? '0.25rem 0.55rem' : config.size === 'lg' ? '0.55rem 0.85rem' : '0.4rem 0.7rem'};
  border-radius:${px(config.pill ? 999 : config.radius)};
  border:${px(config.borderWidth)} solid ${config.outlined ? fg : 'var(--ui-border)'};
  background:${config.outlined ? 'transparent' : (config.gradient ? `linear-gradient(135deg, ${bg}, color-mix(in srgb, ${bg} 70%, white))` : bg)};
  color:${fg};
  font:700 ${px(config.fontSize)} / 1 var(--ui-font);
  box-shadow:${shadowFor(config.shadowDepth)};
}
[data-preview-state="subtle"] .${prefix}-badge{
  box-shadow:none;
  opacity:0.82;
}
${darkMode}`;
}

function badgeHtml(config) {
  const prefix = config.classPrefix;
  return `<div class="${prefix}-preview-shell ${prefix}-theme" data-center="true">
  <span class="${prefix}-badge">${escapeHtml(config.text)}</span>
</div>`;
}

function buildElement({
  id,
  label,
  intents,
  defaults,
  fields,
  states,
  notes = [],
  generateHtml,
  generateCss,
  generateJs
}) {
  return {
    id,
    label,
    intents,
    defaults,
    fields,
    states,
    notes,
    generateHtml,
    generateCss,
    generateJs
  };
}

export const ELEMENTS = {
  button: buildElement({
    id: 'button',
    label: 'Button',
    intents: ['primary-cta', 'secondary-action', 'destructive-action'],
    defaults: {
      text: 'Click me',
      variant: 'primary',
      size: 'md',
      radius: 14,
      paddingX: 18,
      paddingY: 10,
      fontSize: 15,
      borderWidth: 1,
      shadowDepth: 2,
      gradient: false,
      glass: false,
      glow: false,
      blur: 12,
      hoverLift: 2,
      pressDepth: 1,
      transitionSpeed: 160,
      focusRing: 'strong',
      fullWidth: false,
      classPrefix: 'uiforge',
      exportCssVars: true,
      ariaLabel: ''
    },
    fields: [
      { group: 'core', type: 'text', name: 'text', label: 'Button text' },
      { group: 'core', type: 'select', name: 'variant', label: 'Variant', options: ['primary', 'secondary', 'ghost', 'destructive'] },
      { group: 'core', type: 'select', name: 'size', label: 'Size', options: ['sm', 'md', 'lg'] },
      { group: 'core', type: 'checkbox', name: 'fullWidth', label: 'Full width' },
      { group: 'core', type: 'range', name: 'radius', label: 'Radius', min: 0, max: 36, step: 1, unit: 'px' },
      { group: 'core', type: 'range', name: 'paddingX', label: 'Horizontal padding', min: 8, max: 40, step: 1, unit: 'px' },
      { group: 'core', type: 'range', name: 'paddingY', label: 'Vertical padding', min: 6, max: 24, step: 1, unit: 'px' },
      { group: 'core', type: 'range', name: 'fontSize', label: 'Font size', min: 12, max: 20, step: 1, unit: 'px' },

      { group: 'effects', type: 'range', name: 'shadowDepth', label: 'Shadow depth', min: 0, max: 4, step: 1 },
      { group: 'effects', type: 'checkbox', name: 'gradient', label: 'Gradient' },
      { group: 'effects', type: 'checkbox', name: 'glass', label: 'Glass' },
      { group: 'effects', type: 'checkbox', name: 'glow', label: 'Glow' },
      { group: 'effects', type: 'range', name: 'blur', label: 'Blur', min: 0, max: 24, step: 1, unit: 'px' },
      { group: 'effects', type: 'range', name: 'hoverLift', label: 'Hover lift', min: 0, max: 8, step: 1, unit: 'px' },
      { group: 'effects', type: 'range', name: 'pressDepth', label: 'Press depth', min: 0, max: 5, step: 1, unit: 'px' },
      { group: 'effects', type: 'range', name: 'transitionSpeed', label: 'Transition speed', min: 0, max: 500, step: 10, unit: 'ms' },

      { group: 'expert', type: 'range', name: 'borderWidth', label: 'Border width', min: 0, max: 4, step: 1, unit: 'px' },
      { group: 'expert', type: 'text', name: 'ariaLabel', label: 'ARIA label' },
      { group: 'expert', type: 'text', name: 'classPrefix', label: 'Class prefix' },
      { group: 'expert', type: 'checkbox', name: 'exportCssVars', label: 'Export CSS variables' }
    ],
    states: [
      { id: 'default', label: 'default' },
      { id: 'hover', label: 'hover' },
      { id: 'focus', label: 'focus' },
      { id: 'active', label: 'active' },
      { id: 'disabled', label: 'disabled' },
      { id: 'loading', label: 'loading' }
    ],
    notes: ['Buttons export actual hover, focus, and active styles.'],
    generateHtml: (config) => buttonHtml(config),
    generateCss: (config, dna, constraints) => buttonCss(config.classPrefix, config, dna, constraints),
    generateJs: (config, dna, constraints) => buttonJs(config, constraints)
  }),

  card: buildElement({
    id: 'card',
    label: 'Card',
    intents: ['promo-card', 'info-card'],
    defaults: {
      badge: 'Featured',
      title: 'Card title',
      body: 'Use this panel for short summaries, promos, or grouped actions.',
      ctaText: 'Read more',
      variant: 'elevated',
      width: 320,
      radius: 22,
      padding: 20,
      titleSize: 24,
      bodySize: 15,
      borderWidth: 1,
      shadowDepth: 2,
      gradient: false,
      glass: false,
      blur: 12,
      glow: false,
      hoverLift: 3,
      transitionSpeed: 180,
      classPrefix: 'uiforge',
      exportCssVars: true
    },
    fields: [
      { group: 'core', type: 'text', name: 'badge', label: 'Eyebrow' },
      { group: 'core', type: 'text', name: 'title', label: 'Title' },
      { group: 'core', type: 'textarea', name: 'body', label: 'Body' },
      { group: 'core', type: 'text', name: 'ctaText', label: 'Action text' },
      { group: 'core', type: 'select', name: 'variant', label: 'Variant', options: ['elevated', 'outline', 'glass'] },
      { group: 'core', type: 'range', name: 'width', label: 'Card width', min: 220, max: 540, step: 2, unit: 'px' },
      { group: 'core', type: 'range', name: 'radius', label: 'Radius', min: 0, max: 36, step: 1, unit: 'px' },
      { group: 'core', type: 'range', name: 'padding', label: 'Padding', min: 10, max: 32, step: 1, unit: 'px' },

      { group: 'effects', type: 'range', name: 'shadowDepth', label: 'Shadow depth', min: 0, max: 4, step: 1 },
      { group: 'effects', type: 'checkbox', name: 'gradient', label: 'Gradient fill' },
      { group: 'effects', type: 'checkbox', name: 'glass', label: 'Glass' },
      { group: 'effects', type: 'range', name: 'blur', label: 'Blur', min: 0, max: 24, step: 1, unit: 'px' },
      { group: 'effects', type: 'range', name: 'hoverLift', label: 'Hover lift', min: 0, max: 10, step: 1, unit: 'px' },
      { group: 'effects', type: 'range', name: 'transitionSpeed', label: 'Transition speed', min: 0, max: 500, step: 10, unit: 'ms' },

      { group: 'expert', type: 'range', name: 'titleSize', label: 'Title size', min: 18, max: 34, step: 1, unit: 'px' },
      { group: 'expert', type: 'range', name: 'bodySize', label: 'Body size', min: 12, max: 18, step: 1, unit: 'px' },
      { group: 'expert', type: 'range', name: 'borderWidth', label: 'Border width', min: 0, max: 4, step: 1, unit: 'px' },
      { group: 'expert', type: 'text', name: 'classPrefix', label: 'Class prefix' },
      { group: 'expert', type: 'checkbox', name: 'exportCssVars', label: 'Export CSS variables' }
    ],
    states: [
      { id: 'default', label: 'default' },
      { id: 'hover', label: 'hover' },
      { id: 'selected', label: 'selected' }
    ],
    notes: ['Cards are static by default and export without JavaScript.'],
    generateHtml: (config) => cardHtml(config),
    generateCss: (config, dna, constraints) => cardCss(config.classPrefix, config, dna, constraints),
    generateJs: () => ''
  }),

  input: buildElement({
    id: 'input',
    label: 'Input',
    intents: ['form-input'],
    defaults: {
      label: 'Email',
      placeholder: 'name@example.com',
      helper: 'We will never share your email.',
      invalidMessage: 'Enter a valid value.',
      successMessage: 'Looks good.',
      inputType: 'email',
      required: false,
      width: 340,
      radius: 14,
      paddingX: 14,
      paddingY: 11,
      fontSize: 15,
      borderWidth: 1,
      shadowDepth: 0,
      transitionSpeed: 150,
      classPrefix: 'uiforge',
      exportCssVars: true
    },
    fields: [
      { group: 'core', type: 'text', name: 'label', label: 'Label' },
      { group: 'core', type: 'select', name: 'inputType', label: 'Input type', options: ['text', 'email', 'password', 'search', 'tel'] },
      { group: 'core', type: 'text', name: 'placeholder', label: 'Placeholder' },
      { group: 'core', type: 'text', name: 'helper', label: 'Helper text' },
      { group: 'core', type: 'checkbox', name: 'required', label: 'Required' },
      { group: 'core', type: 'range', name: 'width', label: 'Field width', min: 220, max: 540, step: 2, unit: 'px' },
      { group: 'core', type: 'range', name: 'radius', label: 'Radius', min: 0, max: 28, step: 1, unit: 'px' },

      { group: 'effects', type: 'range', name: 'paddingX', label: 'Horizontal padding', min: 8, max: 26, step: 1, unit: 'px' },
      { group: 'effects', type: 'range', name: 'paddingY', label: 'Vertical padding', min: 8, max: 20, step: 1, unit: 'px' },
      { group: 'effects', type: 'range', name: 'fontSize', label: 'Font size', min: 12, max: 20, step: 1, unit: 'px' },
      { group: 'effects', type: 'range', name: 'shadowDepth', label: 'Shadow depth', min: 0, max: 4, step: 1 },
      { group: 'effects', type: 'range', name: 'transitionSpeed', label: 'Transition speed', min: 0, max: 400, step: 10, unit: 'ms' },

      { group: 'expert', type: 'text', name: 'invalidMessage', label: 'Invalid message' },
      { group: 'expert', type: 'text', name: 'successMessage', label: 'Success message' },
      { group: 'expert', type: 'range', name: 'borderWidth', label: 'Border width', min: 0, max: 4, step: 1, unit: 'px' },
      { group: 'expert', type: 'text', name: 'classPrefix', label: 'Class prefix' },
      { group: 'expert', type: 'checkbox', name: 'exportCssVars', label: 'Export CSS variables' }
    ],
    states: [
      { id: 'default', label: 'default' },
      { id: 'focus', label: 'focus' },
      { id: 'disabled', label: 'disabled' },
      { id: 'invalid', label: 'invalid' },
      { id: 'success', label: 'success' }
    ],
    notes: ['Input exports semantic label, input, and helper text structure.'],
    generateHtml: (config) => inputHtml(config),
    generateCss: (config, dna, constraints) => inputCss(config.classPrefix, config, dna, constraints),
    generateJs: () => ''
  }),

  modal: buildElement({
    id: 'modal',
    label: 'Modal',
    intents: ['center-modal', 'sheet-modal'],
    defaults: {
      triggerText: 'Open modal',
      title: 'Confirm action',
      body: 'This action cannot be easily undone.',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      layout: 'center',
      width: 420,
      radius: 20,
      padding: 20,
      titleSize: 24,
      borderWidth: 1,
      shadowDepth: 3,
      glass: false,
      blur: 12,
      overlayTint: 0.58,
      transitionSpeed: 180,
      classPrefix: 'uiforge',
      exportCssVars: true
    },
    fields: [
      { group: 'core', type: 'text', name: 'triggerText', label: 'Trigger text' },
      { group: 'core', type: 'text', name: 'title', label: 'Title' },
      { group: 'core', type: 'textarea', name: 'body', label: 'Body' },
      { group: 'core', type: 'text', name: 'confirmText', label: 'Primary action' },
      { group: 'core', type: 'text', name: 'cancelText', label: 'Secondary action' },
      { group: 'core', type: 'select', name: 'layout', label: 'Layout', options: ['center', 'sheet'] },
      { group: 'core', type: 'range', name: 'width', label: 'Panel width', min: 280, max: 640, step: 2, unit: 'px' },
      { group: 'core', type: 'range', name: 'radius', label: 'Radius', min: 0, max: 32, step: 1, unit: 'px' },

      { group: 'effects', type: 'range', name: 'padding', label: 'Padding', min: 12, max: 32, step: 1, unit: 'px' },
      { group: 'effects', type: 'range', name: 'titleSize', label: 'Title size', min: 18, max: 34, step: 1, unit: 'px' },
      { group: 'effects', type: 'range', name: 'shadowDepth', label: 'Shadow depth', min: 0, max: 4, step: 1 },
      { group: 'effects', type: 'checkbox', name: 'glass', label: 'Glass panel' },
      { group: 'effects', type: 'range', name: 'blur', label: 'Blur', min: 0, max: 24, step: 1, unit: 'px' },
      { group: 'effects', type: 'range', name: 'overlayTint', label: 'Overlay tint', min: 0.2, max: 0.9, step: 0.02 },
      { group: 'effects', type: 'range', name: 'transitionSpeed', label: 'Transition speed', min: 0, max: 400, step: 10, unit: 'ms' },

      { group: 'expert', type: 'range', name: 'borderWidth', label: 'Border width', min: 0, max: 4, step: 1, unit: 'px' },
      { group: 'expert', type: 'text', name: 'classPrefix', label: 'Class prefix' },
      { group: 'expert', type: 'checkbox', name: 'exportCssVars', label: 'Export CSS variables' }
    ],
    states: [
      { id: 'closed', label: 'closed' },
      { id: 'open', label: 'open' },
      { id: 'focus', label: 'open focus' },
      { id: 'destructive', label: 'destructive' }
    ],
    notes: ['Modal includes behavior JS unless the No JavaScript constraint is enabled.'],
    generateHtml: (config, dna, constraints) => modalHtml(config, constraints),
    generateCss: (config, dna, constraints) => modalCss(config.classPrefix, config, dna, constraints),
    generateJs: (config, dna, constraints) => modalJs(config, constraints)
  }),

  badge: buildElement({
    id: 'badge',
    label: 'Badge',
    intents: ['status-badge'],
    defaults: {
      text: 'New',
      tone: 'info',
      size: 'md',
      pill: true,
      outlined: false,
      radius: 999,
      fontSize: 13,
      borderWidth: 1,
      shadowDepth: 0,
      gradient: false,
      classPrefix: 'uiforge',
      exportCssVars: true
    },
    fields: [
      { group: 'core', type: 'text', name: 'text', label: 'Badge text' },
      { group: 'core', type: 'select', name: 'tone', label: 'Tone', options: ['neutral', 'info', 'success', 'warning', 'error'] },
      { group: 'core', type: 'select', name: 'size', label: 'Size', options: ['sm', 'md', 'lg'] },
      { group: 'core', type: 'checkbox', name: 'pill', label: 'Pill shape' },
      { group: 'core', type: 'checkbox', name: 'outlined', label: 'Outlined' },

      { group: 'effects', type: 'range', name: 'radius', label: 'Radius', min: 0, max: 999, step: 1, unit: 'px' },
      { group: 'effects', type: 'range', name: 'fontSize', label: 'Font size', min: 11, max: 18, step: 1, unit: 'px' },
      { group: 'effects', type: 'range', name: 'shadowDepth', label: 'Shadow depth', min: 0, max: 4, step: 1 },
      { group: 'effects', type: 'checkbox', name: 'gradient', label: 'Gradient' },

      { group: 'expert', type: 'range', name: 'borderWidth', label: 'Border width', min: 0, max: 4, step: 1, unit: 'px' },
      { group: 'expert', type: 'text', name: 'classPrefix', label: 'Class prefix' },
      { group: 'expert', type: 'checkbox', name: 'exportCssVars', label: 'Export CSS variables' }
    ],
    states: [
      { id: 'default', label: 'default' },
      { id: 'success', label: 'success' },
      { id: 'warning', label: 'warning' },
      { id: 'error', label: 'error' },
      { id: 'subtle', label: 'subtle' }
    ],
    notes: ['Badges remain CSS-only and are easy to embed.'],
    generateHtml: (config) => badgeHtml(config),
    generateCss: (config, dna, constraints) => badgeCss(config.classPrefix, config, dna, constraints),
    generateJs: () => ''
  })
};

export function elementList() {
  return Object.values(ELEMENTS).map(({ id, label }) => ({ id, label }));
}

export function intentList() {
  return Object.values(INTENTS).map(({ id, label }) => ({ id, label }));
}

export function styleDnaList() {
  return Object.values(STYLE_DNA).map(({ id, label }) => ({ id, label }));
}

export function getElementSchema(id) {
  return ELEMENTS[id] ?? ELEMENTS.button;
}

export function getIntent(id) {
  return INTENTS[id];
}

export function getStyleDna(id) {
  return STYLE_DNA[id] ?? STYLE_DNA.minimal;
}

export function collectNotes(schema, config, constraints) {
  return [...baseNotes(config, constraints), ...schema.notes];
}
