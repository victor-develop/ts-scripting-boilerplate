import {default as safeStringify} from 'fast-safe-stringify'
const formatJSONString = (x:unknown) => safeStringify(
    x as string,
    null,
    2
)

import * as chalk from 'chalk'
import {EOL} from 'os'
const addSplitLine = (x:string) => {
  const [terminal_width] = process.stdout.getWindowSize()
  const line = chalk.blue.underline(Array(terminal_width).fill(' ').join(''))
  return `${x}${EOL}${line}${EOL}${EOL}`
}

import { JSONString } from '../json/types'
// This demonstrates how you can format the standard output
export const transformStdOut = (stream: Highland.Stream<JSONString>):Highland.Stream<string> => stream
// For standard output you just want to inspect a few samples
.take(5)
.map(JSON.parse)
.map(formatJSONString)
.map(addSplitLine)
