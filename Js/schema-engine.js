import { deepClone, mergeConfig } from './utils.js';
import { getElementSchema, getIntent } from './registry.js';

export function getDefaultConfig(elementId) {
  return deepClone(getElementSchema(elementId).defaults);
}

export function resolveSchemaFromIntent(intentId) {
  const intent = getIntent(intentId);
  if (!intent) return { schema: getElementSchema('button'), intent: null };
  return {
    schema: getElementSchema(intent.element),
    intent
  };
}

export function configFromElement(elementId) {
  return getDefaultConfig(elementId);
}

export function configFromIntent(intentId) {
  const { schema, intent } = resolveSchemaFromIntent(intentId);
  const defaults = getDefaultConfig(schema.id);
  return {
    schema,
    intent,
    config: intent ? mergeConfig(defaults, intent.config) : defaults
  };
}

export function groupFields(schema) {
  return schema.fields.reduce((groups, field) => {
    const key = field.group || 'core';
    if (!groups[key]) groups[key] = [];
    groups[key].push(field);
    return groups;
  }, { core: [], effects: [], expert: [] });
}
