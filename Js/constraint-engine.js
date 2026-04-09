import { clamp, slugify } from './utils.js';

function pushWarning(warnings, severity, title, detail) {
  warnings.push({ severity, title, detail });
}

export function applyConstraints(schemaId, config, constraintIds) {
  const next = { ...config };
  const warnings = [];
  const constraints = new Set(constraintIds);

  if (constraints.has('embed-safe')) {
    next.classPrefix = slugify(next.classPrefix);
  }

  if (constraints.has('token-ready')) {
    next.exportCssVars = true;
  }

  if (constraints.has('mobile-safe')) {
    if (schemaId === 'card' || schemaId === 'input' || schemaId === 'modal') {
      if (Number(next.width) > 420) {
        next.width = 420;
        pushWarning(warnings, 'info', 'Width trimmed for mobile', 'The active width was capped to 420px for a safer mobile footprint.');
      }
    }
  }

  if (constraints.has('min-tap-target')) {
    if (schemaId === 'button') {
      const approximateHeight = Number(next.fontSize) + Number(next.paddingY) * 2;
      if (approximateHeight < 44) {
        next.paddingY = clamp(Math.ceil((44 - Number(next.fontSize)) / 2), 10, 24);
        pushWarning(warnings, 'info', 'Tap target increased', 'Button vertical padding was increased to aim for a 44px tap target.');
      }
    }

    if (schemaId === 'input') {
      const approximateHeight = Number(next.fontSize) + Number(next.paddingY) * 2;
      if (approximateHeight < 44) {
        next.paddingY = clamp(Math.ceil((44 - Number(next.fontSize)) / 2), 10, 20);
        pushWarning(warnings, 'info', 'Input height increased', 'Input vertical padding was increased to aim for a 44px tap target.');
      }
    }
  }

  if (constraints.has('keyboard-accessible')) {
    if (schemaId === 'button' && next.focusRing === 'none') {
      next.focusRing = 'strong';
      pushWarning(warnings, 'warning', 'Focus ring restored', 'Keyboard accessible mode keeps visible focus states.');
    }
  }

  if (constraints.has('low-motion')) {
    if (Number(next.transitionSpeed) > 140) {
      next.transitionSpeed = 140;
    }
    if ('hoverLift' in next) next.hoverLift = Math.min(1, Number(next.hoverLift) || 0);
    if ('pressDepth' in next) next.pressDepth = Math.min(1, Number(next.pressDepth) || 0);
    pushWarning(warnings, 'info', 'Motion reduced', 'Hover and transition intensity were lowered to respect low-motion preferences.');
  }

  if (constraints.has('lightweight-css')) {
    ['gradient', 'glass', 'glow'].forEach((field) => {
      if (field in next && next[field]) {
        next[field] = false;
      }
    });
    if ('blur' in next) next.blur = 0;
    pushWarning(warnings, 'info', 'Heavy effects removed', 'Gradient, glow, glass, and blur were stripped for leaner CSS.');
  }

  if (constraints.has('no-js') && schemaId === 'modal') {
    pushWarning(warnings, 'warning', 'Modal JS disabled', 'The modal export will render as a static example shell because No JavaScript is enabled.');
  }

  if (constraints.has('dark-mode')) {
    pushWarning(warnings, 'info', 'Dark mode block enabled', 'The exported CSS will include a prefers-color-scheme: dark media block.');
  }

  if (constraints.has('no-dependencies')) {
    pushWarning(warnings, 'info', 'Dependency-free output', 'The export remains plain HTML, CSS, and JavaScript.');
  }

  return {
    config: next,
    warnings
  };
}
