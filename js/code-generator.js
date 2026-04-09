export function generateOutputs(schema, config, dna, constraints) {
  const html = schema.generateHtml({ ...config, previewState: 'default' }, dna, constraints).trim();
  const css = schema.generateCss(config, dna, constraints).trim();
  const js = (schema.generateJs(config, dna, constraints) || '').trim();
  return { html, css, js };
}
