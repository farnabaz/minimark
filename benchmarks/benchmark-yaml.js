import { load, dump } from 'js-yaml'
import yaml from 'yaml'

// Test data
const yamlString = ':test: true\nr: t'

// Helper function to remove quotes around keys starting with ':' (no regex)
function unquoteColonKeys(yamlOutput) {
  const lines = yamlOutput.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trimStart()

    // Check if line starts with a quote followed by colon
    if (trimmed[0] === '\'' || trimmed[0] === '"') {
      const quote = trimmed[0]
      if (trimmed[1] === ':') {
        // Find the closing quote
        const quoteEnd = trimmed.indexOf(quote, 1)
        if (quoteEnd > 1 && trimmed[quoteEnd + 1] === ':') {
          // Remove quotes: keep indentation + unquoted key + rest
          const indent = line.length - trimmed.length
          lines[i] = ' '.repeat(indent) + trimmed.slice(1, quoteEnd) + trimmed.slice(quoteEnd + 1)
        }
      }
    }
  }
  return lines.join('\n')
}

// Number of iterations for the benchmark
const iterations = 100000

console.log('🔬 YAML Library Performance Comparison\n')
console.log(`Test string: "${yamlString}"`)
console.log(`Iterations: ${iterations.toLocaleString()}\n`)

// ============================================
// yaml (yaml@2.8.2) benchmarks
// ============================================

console.log('📦 Testing yaml library...')

// Parse benchmark
const yamlParseStart = performance.now()
for (let i = 0; i < iterations; i++) {
  yaml.parse(yamlString)
}
const yamlParseEnd = performance.now()
const yamlParseTime = yamlParseEnd - yamlParseStart

// Stringify benchmark
const parsedData = yaml.parse(yamlString)
const yamlStringifyStart = performance.now()
for (let i = 0; i < iterations; i++) {
  yaml.stringify(parsedData)
}
const yamlStringifyEnd = performance.now()
const yamlStringifyTime = yamlStringifyEnd - yamlStringifyStart

// Combined benchmark
const yamlCombinedStart = performance.now()
for (let i = 0; i < iterations; i++) {
  yaml.stringify(yaml.parse(yamlString))
}
const yamlCombinedEnd = performance.now()
const yamlCombinedTime = yamlCombinedEnd - yamlCombinedStart

// ============================================
// js-yaml (js-yaml@4.1.1) benchmarks
// ============================================

console.log('📦 Testing js-yaml library...\n')

// Parse benchmark
const jsYamlParseStart = performance.now()
for (let i = 0; i < iterations; i++) {
  load(yamlString)
}
const jsYamlParseEnd = performance.now()
const jsYamlParseTime = jsYamlParseEnd - jsYamlParseStart

// Stringify benchmark (with post-processing to match yaml output)
const jsYamlParsedData = load(yamlString)
const jsYamlStringifyStart = performance.now()
for (let i = 0; i < iterations; i++) {
  unquoteColonKeys(dump(jsYamlParsedData, {
    replacer: (_key, value) => {
      if (value === 'true' || value === 'false') {
        return Boolean(value)
      }
      return value
    },
  }))
}
const jsYamlStringifyEnd = performance.now()
const jsYamlStringifyTime = jsYamlStringifyEnd - jsYamlStringifyStart

// Combined benchmark
const jsYamlCombinedStart = performance.now()
for (let i = 0; i < iterations; i++) {
  unquoteColonKeys(dump(load(yamlString), {
    replacer: (_key, value) => {
      if (value === 'true' || value === 'false') {
        return Boolean(value)
      }
      return value
    },
  }))
}
const jsYamlCombinedEnd = performance.now()
const jsYamlCombinedTime = jsYamlCombinedEnd - jsYamlCombinedStart

// ============================================
// Results
// ============================================

console.log('='.repeat(70))
console.log('📊 RESULTS')
console.log('='.repeat(70))

console.log('\n🔍 PARSE Operations:')
console.log(`  yaml:    ${yamlParseTime.toFixed(2)}ms (${(iterations / yamlParseTime * 1000).toFixed(0)} ops/sec)`)
console.log(`  js-yaml: ${jsYamlParseTime.toFixed(2)}ms (${(iterations / jsYamlParseTime * 1000).toFixed(0)} ops/sec)`)
const parseFaster = yamlParseTime < jsYamlParseTime ? 'yaml' : 'js-yaml'
const parseRatio = yamlParseTime < jsYamlParseTime
  ? (jsYamlParseTime / yamlParseTime).toFixed(2)
  : (yamlParseTime / jsYamlParseTime).toFixed(2)
console.log(`  ✨ ${parseFaster} is ${parseRatio}x faster`)

console.log('\n✍️  STRINGIFY Operations:')
console.log(`  yaml:    ${yamlStringifyTime.toFixed(2)}ms (${(iterations / yamlStringifyTime * 1000).toFixed(0)} ops/sec)`)
console.log(`  js-yaml: ${jsYamlStringifyTime.toFixed(2)}ms (${(iterations / jsYamlStringifyTime * 1000).toFixed(0)} ops/sec)`)
const stringifyFaster = yamlStringifyTime < jsYamlStringifyTime ? 'yaml' : 'js-yaml'
const stringifyRatio = yamlStringifyTime < jsYamlStringifyTime
  ? (jsYamlStringifyTime / yamlStringifyTime).toFixed(2)
  : (yamlStringifyTime / jsYamlStringifyTime).toFixed(2)
console.log(`  ✨ ${stringifyFaster} is ${stringifyRatio}x faster`)

console.log('\n🔄 COMBINED (parse + stringify):')
console.log(`  yaml:    ${yamlCombinedTime.toFixed(2)}ms (${(iterations / yamlCombinedTime * 1000).toFixed(0)} ops/sec)`)
console.log(`  js-yaml: ${jsYamlCombinedTime.toFixed(2)}ms (${(iterations / jsYamlCombinedTime * 1000).toFixed(0)} ops/sec)`)
const combinedFaster = yamlCombinedTime < jsYamlCombinedTime ? 'yaml' : 'js-yaml'
const combinedRatio = yamlCombinedTime < jsYamlCombinedTime
  ? (jsYamlCombinedTime / yamlCombinedTime).toFixed(2)
  : (yamlCombinedTime / jsYamlCombinedTime).toFixed(2)
console.log(`  ✨ ${combinedFaster} is ${combinedRatio}x faster`)

console.log('\n' + '='.repeat(70))

// Verify output consistency
console.log('\n🔍 Output Verification:')
const yamlResult = yaml.stringify(yaml.parse(yamlString))
const jsYamlRaw = dump(load(yamlString))
const jsYamlResult = unquoteColonKeys(jsYamlRaw)
console.log(`yaml output:       ${JSON.stringify(yamlResult)}`)
console.log(`js-yaml (raw):     ${JSON.stringify(jsYamlRaw)}`)
console.log(`js-yaml (fixed):   ${JSON.stringify(jsYamlResult)}`)
console.log(`Match: ${yamlResult === jsYamlResult ? '✅' : '❌'}`)
console.log('\nNote: Post-processing applied to js-yaml output (split, remove quotes, join)')
