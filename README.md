# 40 lines - Build A Typescript Repo for Daily Experiments

This repo demonstrates a skeleton for storing daily typescript snippets in a single place, with nice supports for streaming output to files, terminal, and any other sources in only 40-ish lines of codes.

```sh
    ┌──────────────┐
    │ Experimental │
    │    Codes     │
    └──────┬───────┘
           │
           │logs
           │
           ▼
    ┌──────────────┐
    │              │
    │ log stream   │
    └─┬────────┬─┬─┘
      │        │ │
      │        │ └────────┐
      ▼        ▼          │
┌──────────┐ ┌───────┐ ┌──▼──┐
│          │ │       │ │     │
│ terminal │ │ files │ │ ... │
│          │ │       │ │     │
└──────────┘ └───────┘ └─────┘
```

A video tutorial on explaining the design is [here](https://youtube.com/playlist?list=PLZE9hPvxmyQBWmJIGQkOJUAkPuRRsp1am)

# Start coding

```
npm run repl
```

You likely want to play around [the code from here](src/repl/index.ts)

## License

Licensed under the APLv2. See the [LICENSE](https://github.com/jsynowiec/node-typescript-boilerplate/blob/main/LICENSE) file for details.
