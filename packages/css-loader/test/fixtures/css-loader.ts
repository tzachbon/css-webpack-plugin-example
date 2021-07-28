export const transformCSSClasses = {
  css: `.root { color: red; } div .label { font-size: 1rem; }`,
  expectedCSS: `.s7ad3f4__root { color: red; } div .s7ad3f4__label { font-size: 1rem; }`,
  expected: `\n\n  export default {"root":"s7ad3f4__root","label":"s7ad3f4__label"}`,
} as const

export const transformAndAddStyleScript = {
  css: `.root { color: red; } div .label { font-size: 1rem; }`,
  expected: `(function appendStyle(css) {\n    const style = document.createElement('style');\n    style.textContent = css;\n    document.head.appendChild(style);\n})(".s7ad3f4__root { color: red; } div .s7ad3f4__label { font-size: 1rem; }")\n\n  export default {"root":"s7ad3f4__root","label":"s7ad3f4__label"}`,
} as const
