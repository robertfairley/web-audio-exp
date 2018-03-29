import Oscillator from './Oscillator';

export function Audio() {
  const audioCtx = new AudioContext();
  window.audioCtx = audioCtx;

  const oscConfig = {
    title: 'Oscillator 1',
    type: 'triangle',
    initialFrequency: 440
  };

  const osc = new Oscillator(audioCtx, oscConfig);
  const osc2 = new Oscillator(audioCtx, { type: 'sawtooth' });

  document.querySelector('#root').appendChild(osc.render());
  document.querySelector('#root').appendChild(osc2.render());
}