# instrument-v8 (WIP)

Instrument your code to see if everything is optimized.

Inspired by this article: https://github.com/petkaantonov/bluebird/wiki/Optimization-killers

## Installation

```sh
npm install instrument-v8 -g
```

## Usage

```sh
instrument-v8 <pathToModule> --methodToCall=argumentsForMethod
```

for example, let's take [Jade](https://github.com/jadejs/jade):

```sh
npm install jade
```

Let's see if the `render` function is optimized:

```sh
instrument-v8 node_modules/jade --render='""'
```

The results is:

```sh
Function jade::render is not optimized
```

If you look into the source code you will see that there is a `try-catch` that is preventing optimizations. The solution is to move the try-catch to a separate function allowing the rest of the `render` function to be optimized.

## See Also

[v8-natives](https://github.com/NathanaelA/v8-Natives)
