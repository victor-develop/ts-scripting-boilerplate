import {default as safeStringify} from 'fast-safe-stringify'
const prepareJsonString = (x:unknown) => {
  return {
    json: x,
    string: safeStringify(
      x as string,
      null,
      2
  )
  }
}

type RenderPipelineObj = {json: unknown, string: string}
type RenderPipeline = (x: RenderPipelineObj) => RenderPipelineObj

import * as chalk from 'chalk'
import {EOL} from 'os'
const addSplitLine: RenderPipeline = ({json, string}) => {
  const [terminal_width] = process.stdout.getWindowSize()
  const line = chalk.blue.underline(Array(terminal_width).fill(' ').join(''))
  return {
    json,
    string: `${string}${EOL}${line}${EOL}${EOL}`
  }
}

const redError: RenderPipeline = x => {
  const string =  (x.json as unknown as {err?: unknown}).err?
  chalk.red(x.string):
  x.string
  return {
    ...x,
    string
  }
}

import { JSONString } from '../json/types'
// This demonstrates how you can format the standard output
export const transformStdOut = (stream: Highland.Stream<JSONString>):Highland.Stream<string> => stream
.map(JSON.parse)
// From now on start the rendering piepline
.map(prepareJsonString)
.map(redError)
.map(addSplitLine)
// last function to render string
.map(x => x.string)
