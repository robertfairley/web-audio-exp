# web-audio-exp

A very simple web app experimenting with the Web Audio API to gain some familiarity with synthesizing tones.

It contains an Oscillator primitive that provides an oscilloscope, a frequency range slider, and a button to play the tone.

The initial app (contained in the `Audio` function) instantiates two Oscillator components with two different default settings.

## Try it

https://robertfairley.github.io/web-audio-exp/

**Two oscillators:**

* Sine
  * Initial frequency: 440Hz
  * Adjustable frequency: yes
  
* Sawtooth
  * Initial frequency: 440Hz
  * Adjustable frequency: yes

## Build

Install the project dependencies (`npm i`).

To run one build:
```shell
npm run build
```

To run a build and watch for changes (no hot reloading)
```shell
npm run watch
```

There is no included server so to run the application, just `open index.html`.

## Caution

Nothing about this project is developed with safety or security in mind. It is unfit for production and is only a localized toy.

The existing build wraps the application in `eval` functions, and so it is unsafe for exposing to the public as-is.
