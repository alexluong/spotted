import mean from "compute-mean"
import median from "compute-median"
import mode from "compute-mode"
import unlerp from "unlerp"
import lerp from "lerp"
import visit from "unist-util-visit"
import toString from "nlcst-to-string"
import normalize from "nlcst-normalize"
import syllable from "syllable"
import spache from "spache"
import daleChall from "dale-chall"
import daleChallFormula from "dale-chall-formula"
import ari from "automated-readability"
import colemanLiau from "coleman-liau"
import flesch from "flesch"
import smog from "smog-formula"
import gunningFog from "gunning-fog"
import spacheFormula from "spache-formula"

import unified from "unified"
import english from "retext-english"
import readability from "retext-readability"
import rehype2retext from "rehype-retext"
import htmlStringify from "rehype-stringify"
import htmlParser from "rehype-parse"

import unifiedActions from "../unified"

const readabilityActions = {}

const readabilityProcessor = unified()
  .use(htmlParser)
  .use(
    rehype2retext,
    unified()
      .use(english)
      .use(readability),
  )
  .use(htmlStringify)

readabilityActions.runAnalysis = function(html) {
  const htmlTree = unifiedActions.createHtmlTree(html)
  const analysis = readabilityProcessor.processSync(html)

  return { htmlTree, analysis }
}

const averages = { mean, median, mode }

const types = {
  sentence: "SentenceNode",
  paragraph: "ParagraphNode",
}

const ages = {
  min: 5,
  max: 22,
  default: 12,
}

const scale = 6

const max = Math.max
const min = Math.min
const floor = Math.floor
const round = Math.round
const ceil = Math.ceil
const sqrt = Math.sqrt

const state = {
  type: types.sentence,
  average: averages.median,
  age: ages.default,
}

readabilityActions.highlight = function highlight(node) {
  var familiarWords = {}
  var easyWord = {}
  var complexPolysillabicWord = 0
  var familiarWordCount = 0
  var polysillabicWord = 0
  var syllableCount = 0
  var easyWordCount = 0
  var wordCount = 0
  var letters = 0
  var sentenceCount = 0
  var counts
  var average
  var weight
  var hue

  visit(node, "SentenceNode", sentence)
  visit(node, "WordNode", word)

  counts = {
    complexPolysillabicWord: complexPolysillabicWord,
    polysillabicWord: polysillabicWord,
    unfamiliarWord: wordCount - familiarWordCount,
    difficultWord: wordCount - easyWordCount,
    syllable: syllableCount,
    sentence: sentenceCount,
    word: wordCount,
    character: letters,
    letter: letters,
  }

  average = state.average([
    gradeToAge(daleChallFormula.gradeLevel(daleChallFormula(counts))[1]),
    gradeToAge(ari(counts)),
    gradeToAge(colemanLiau(counts)),
    fleschToAge(flesch(counts)),
    smogToAge(smog(counts)),
    gradeToAge(gunningFog(counts)),
    gradeToAge(spacheFormula(counts)),
  ])

  weight = unlerp(state.age, state.age + scale, average)
  hue = lerp(120, 0, min(1, max(0, weight)))

  return {
    style: {
      boxShadow: `0px 2px 0px 0px hsl(${[hue, "93%", "85%"].join(", ")}`,
    },
  }

  function sentence() {
    sentenceCount++
  }

  function word(node) {
    var value = toString(node)
    var syllables = syllable(value)
    var normalized = normalize(node, { allowApostrophes: true })
    var head

    wordCount++
    syllableCount += syllables
    letters += value.length

    /**
     * Count complex words for gunning-fog based on
     * whether they have three or more syllables
     * and whether they aren’t proper nouns.  The
     * last is checked a little simple, so this
     * index might be over-eager.
     */
    if (syllables >= 3) {
      polysillabicWord++
      head = value.charAt(0)

      if (head === head.toLowerCase()) {
        complexPolysillabicWord++
      }
    }

    /* Find unique unfamiliar words for spache. */
    if (
      spache.indexOf(normalized) !== -1 &&
      familiarWords[normalized] !== true
    ) {
      familiarWords[normalized] = true
      familiarWordCount++
    }

    /* Find unique difficult words for dale-chall. */
    if (daleChall.indexOf(normalized) !== -1 && easyWord[normalized] !== true) {
      easyWord[normalized] = true
      easyWordCount++
    }
  }
}

/**
 * Calculate the typical starting age (on the higher-end) when
 * someone joins `grade` grade, in the US.
 * See https://en.wikipedia.org/wiki/Educational_stage#United_States.
 */
function gradeToAge(grade) {
  return round(grade + 5)
}

/* Calculate the age relating to a Flesch result. */
function fleschToAge(value) {
  return 20 - floor(value / 10)
}

/**
 * Calculate the age relating to a SMOG result.
 * See http://www.readabilityformulas.com/smog-readability-formula.php.
 */
function smogToAge(value) {
  return ceil(sqrt(value) + 2.5)
}

export default readabilityActions
