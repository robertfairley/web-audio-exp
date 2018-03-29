import Oscilloscope from './Oscilloscope';
/**
 * @class Oscillator
 * @classdesc Create an oscillator node and render relevant elements
 */
class Oscillator {
  constructor(audioContext = new AudioContext(), props = defaultProps) {
    this.context = audioContext;
    this.oscNode = audioContext.createOscillator();

    this.props = props;

    this.title            = this.props.title            || 'Oscillator';
    this.initialFrequency = this.props.initialFrequency ||  440;
    this.maxFrequency     = this.props.maxFrequency     || 1800;
    this.minFrequency     = this.props.minFrequency     ||   22;
    this.rangeStep        = this.props.rangeStep        ||    1;
    this.oscNode.type     = this.props.type             || 'square';

    this.scope = new Oscilloscope(this.context, { source: this.oscNode });

    this.state = {
      isOn: 0,
    };

    this.toggle          = this.toggle.bind(this);
    this.changeFrequency = this.changeFrequency.bind(this);
    this.resetFrequency  = this.resetFrequency.bind(this);
  }

  toggle(event) {
    if (!event)
      return;
    
    if(this.state.isOn) {
      this.oscNode.disconnect(this.context.destination);
      this.scope.analyser.disconnect(this.context.destination);
      cancelAnimationFrame(this.scope.vis);
      this.state.isOn       = 0;
      this.switch.innerText = 'ON';
     // this.container.querySelector('.oscilloscope-container').innerHTML = null;
    }
    else {
      this.oscNode.connect(this.context.destination);
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
    this.freqValue.innerText = this.oscNode.frequency.value + ' Hz';
  }

  resetFrequency(event) {
    if (!event)
      return;

    this.oscNode.frequency.setValueAtTime(this.initialFrequency, this.context.currentTime);
    this.freqValue.innerText = `${this.initialFrequency} Hz`;
    this.freqRange.value     = this.initialFrequency;
  }

  render() {
    this.heading    = document.createElement('div');
    this.container  = document.createElement('div');
    this.switch     = document.createElement('button');
    this.freqRange  = document.createElement('input');
    this.freqButton = document.createElement('button');
    this.freqValue  = document.createElement('div');

    this.container.classList.add('oscillator');
    this.heading.classList.add('oscillator__heading');
    this.freqRange.classList.add('oscillator__frequency');

    this.freqRange.type  = 'range';
    this.freqRange.max   = this.maxFrequency;
    this.freqRange.min   = this.minFrequency;
    this.freqRange.step  = this.rangeStep;
    this.freqRange.value = this.initialFrequency;

    this.heading.innerText = this.title;
    this.switch.innerText  = 'ON';
    this.freqButton.innerText = `${this.initialFrequency} Hz`;
    this.freqValue.innerText = `${this.initialFrequency} Hz`;

    this.oscNode.frequency.setValueAtTime(this.initialFrequency, this.context.currentTime);

    this.switch.addEventListener('click', this.toggle);
    this.freqRange.addEventListener('input', this.changeFrequency);
    this.freqButton.addEventListener('click', this.resetFrequency);


    this.container.appendChild(this.heading);
    this.container.appendChild(this.freqValue);
    this.container.appendChild(this.freqRange);
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