// import {default as safeStringify} from 'fast-safe-stringify'

const formatJSONString = (x:unknown) => JSON.stringify(
    JSON.parse((x as string)),
    null,
    2
)

export const transformStdOut = (stream: Highland.Stream<unknown>) => stream
// This is an example, you can keep add multiple map() to transform the standard output
.map(formatJSONString)
