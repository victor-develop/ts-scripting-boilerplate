// import {default as safeStringify} from 'fast-safe-stringify'

export const transformStdOut = (stream: Highland.Stream<unknown>) => stream
// This is an example, you can keep add multiple map() to transform the standard output
.map(x => {
    return x
})
