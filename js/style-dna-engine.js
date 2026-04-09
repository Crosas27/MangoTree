import { getStyleDna } from './registry.js';

const DNA_FIELD_DEFAULTS = {
  radius: (dna) => dna.radius,
  borderWidth: (dna) => dna.borderWidth,
  shadowDepth: (dna) => dna.shadowDepth,
  glass: (dna) => dna.glass
};

export function applyStyleDna(config, dnaId, touchedFields = new Set(), { force = false } = {}) {
  const dna = getStyleDna(dnaId);
  const next = { ...config };

  Object.entries(DNA_FIELD_DEFAULTS).forEach(([field, resolver]) => {
    if (force || !touchedFields.has(field)) {
      next[field] = resolver(dna);
    }
  });

  return next;
}
