# victor-swiss-knife

I want to establish a working pattern that we can use js/ts to quickly explore data, execute snippets, persist output and adjust code quickly. And of course, to stablize this pattern via code.

I want to make it so easy that writing some working code with working test and persisting it no longer looks scary, where you are forced to setup a repo and many basic things.

# How to write script


## output: ._log/ files

First, you need to open the nodemon with `npm run d -- files src/your-file.ts` to quickly see your code changes

Now, you shall open another terminal tab to see the standard output. I will setup a logger that will print things to standard output AND also a new log file.

Use `npm run dlog` : this will trigger a shell script which will try to cat first 100 lines of the most recent files


## License

Licensed under the APLv2. See the [LICENSE](https://github.com/jsynowiec/node-typescript-boilerplate/blob/main/LICENSE) file for details.
