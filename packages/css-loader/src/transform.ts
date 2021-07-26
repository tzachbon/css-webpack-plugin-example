import postcss from 'postcss'
import selectorParser from 'postcss-selector-parser'
import { resolveNamespace } from './resolve-namespace'

export function transform(path: string, content: string) {
  const process = postcss.parse(content, { from: path })
  const classesMap = new Map()

  process.walkRules(node => {
    const ruleAst = selectorParser().astSync(node);

    ruleAst.walkClasses(selectorAst => {
      if (!classesMap.has(selectorAst.value)) {
        classesMap.set(selectorAst.value, `${resolveNamespace(path)}__${selectorAst.value}`)
      }

      selectorAst.value = classesMap.get(selectorAst.value)
    })

    node.selector = ruleAst.toString()
  })

  const css = process.toString()

  return {
    css,
    classesMap
  }
}