import Oscilloscope from './Oscilloscope';
import { hz } from './helpers';
/**
 * @class Oscillator
 * @classdesc Create an oscillator node and render relevant elements
 */
class Oscillator {
  constructor(audioContext = new AudioContext(), props = defaultProps) {
    this.context  = audioContext;
    this.oscNode  = audioContext.createOscillator();
    this.gainNode = audioContext.createGain();

    this.props = props;

    this.title            = this.props.title            || 'Oscillator';
    this.initialFrequency = this.props.initialFrequency ||  440;
    this.maxFrequency     = this.props.maxFrequency     || 1800;
    this.minFrequency     = this.props.minFrequency     ||   22;
    this.rangeStep        = this.props.rangeStep        ||    1;
    this.oscNode.type     = this.props.type             || 'square';
    
    this.gainNode.gain.value = 0.5;

    this.gainNode.connect(this.context.destination);

    this.scope = new Oscilloscope(this.context, { source: this.oscNode });

    this.state = {
      isOn: 0,
    };

    this.toggle          = this.toggle.bind(this);
    this.changeFrequency = this.changeFrequency.bind(this);
    this.changeVolume    = this.changeVolume.bind(this);
    this.resetFrequency  = this.resetFrequency.bind(this);
  }

  toggle(event) {
    if (!event)
      return;
    
    if(this.state.isOn) {
      this.oscNode.disconnect(this.gainNode);
      this.scope.analyser.disconnect(this.context.destination);
      cancelAnimationFrame(this.scope.vis);
      this.state.isOn       = 0;
      this.switch.innerText = 'ON';
     // this.container.querySelector('.oscilloscope-container').innerHTML = null;
    }
    else {
      this.oscNode.connect(this.gainNode);
      this.scope.analyser.connect(this.context.destination);
      this.scope.vis = requestAnimationFrame(this.scope.draw);
      this.state.isOn       = 1;
      this.switch.innerText = 'OFF';
    //  this.container.appendChild(this.scope.render());
    }
  }

  changeFrequency(event) {
    let newFrequency = Math.floor(event.target.value);
    this.oscNode.frequency.setValueAtTime(newFrequency, this.context.currentTime);
    this.freqValue.innerText = hz(this.oscNode.frequency.value);
  }

  changeVolume(event) {
    let newVolume = Math.floor(event.target.value);
    this.gainNode.gain.value = newVolume;
  }

  resetFrequency(event) {
    if (!event)
      return;

    this.oscNode.frequency.setValueAtTime(this.initialFrequency, this.context.currentTime);
    this.freqValue.innerText = hz(this.initialFrequency);
    this.freqRange.value     = this.initialFrequency;
  }

  render() {
    this.heading    = document.createElement('div');
    this.container  = document.createElement('div');
    this.switch     = document.createElement('button');
    this.freqRange  = document.createElement('input');
    this.freqButton = document.createElement('button');
    this.freqValue  = document.createElement('div');

    this.gainRange  = document.createElement('input');
    this.gainValue  = document.createElement('div'); 

    this.container.classList.add('oscillator');
    this.heading.classList.add('oscillator__heading');
    this.freqRange.classList.add('oscillator__frequency');

    this.freqRange.type  = 'range';
    this.freqRange.max   = this.maxFrequency;
    this.freqRange.min   = this.minFrequency;
    this.freqRange.step  = this.rangeStep;
    this.freqRange.value = this.initialFrequency;

    this.gainRange.type  = 'range';
    this.gainRange.max   = 1;
    this.gainRange.min   = 0;
    this.gainRange.step  = 0.01;
    this.gainRange.value = this.gainNode.gain.value;

    this.heading.innerText = this.title;
    this.switch.innerText  = 'ON';

    this.freqButton.innerText = hz(this.initialFrequency);
    this.freqValue.innerText  = hz(this.initialFrequency);

    this.oscNode.frequency.setValueAtTime(this.initialFrequency, this.context.currentTime);

    this.switch.addEventListener('click', this.toggle);
    this.freqRange.addEventListener('input', this.changeFrequency);
    this.freqButton.addEventListener('click', this.resetFrequency);
    this.gainRange.addEventListener('input', this.changeVolume);

    this.container.appendChild(this.heading);
    this.container.appendChild(this.freqValue);
    this.container.appendChild(this.freqRange);
    this.container.appendChild(this.gainValue);
    this.container.appendChild(this.gainRange);
    this.container.appendChild(this.switch);
    this.container.appendChild(this.freqButton);
    this.container.appendChild(this.scope.render());

    this.oscNode.start();
    cancelAnimationFrame(this.scope.vis);
    return this.container;
  }
}

const defaultProps = {
  title:            String(),
  type:             String(),
  initialFrequency: Number(),
  minFrequency:     Number(),
  maxFrequency:     Number(),
  rangeStep:        Number(),
};


export default Oscillator;
