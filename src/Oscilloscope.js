import { FAST_FOURIER_TRANSFORM_SIZE } from './constants';

/**
 * @class Oscilloscope
 * @classdesc 
 */
class Oscilloscope {
  constructor(audioContext = new AudioContext(), props = defaultProps) {
    if (!props.source)
      throw new Error('A source is required for the oscilloscope!');
    
    this.props    = props;

    this.context  = audioContext;
    this.source   = this.props.source;
    this.analyser = this.context.createAnalyser();

    this.analyser.fftSize = FAST_FOURIER_TRANSFORM_SIZE;
    this.bufferLength     = this.analyser.fftSize;
    this.dataArray        = new Uint8Array(this.bufferLength);
    this.analyser.getByteTimeDomainData(this.dataArray);

    this.source.connect(this.analyser);

    this.title       = this.props.title       || null;
    this.screenColor = this.props.screenColor || 'rgb(210, 210, 210)';
    this.lineColor   = this.props.lineColor   || 'rgb(60, 60, 60)';
  }

  render() {
    this.container = document.createElement('div');
    this.display   = document.createElement('canvas');

    this.container.classList.add('.oscilloscope-container');

    this.container.appendChild(this.display);
    this.analyser.disconnect();

    this.display.width  = 400;
    this.display.height = 300;

    const WIDTH  = this.display.width;
    const HEIGHT = this.display.height;
    const CTX    = this.display.getContext('2d');
    this.vis     = null;

    this.draw = () =>{
      this.vis = requestAnimationFrame(this.draw);

      this.analyser.getByteTimeDomainData(this.dataArray);
      CTX.fillStyle = this.screenColor;
      CTX.fillRect(0, 0, WIDTH, HEIGHT);

      CTX.lineWidth = 1;
      CTX.strokeStyle = this.lineColor;

      CTX.beginPath();

      let sliceWidth = WIDTH * 1.0 / this.analyser.fftSize;
      let position   = { x: 0, y: 0 };

      for (let i = 0; i < this.analyser.fftSize; i++) {
        let delta  = this.dataArray[i] / 128.0;
        position.y = delta * (HEIGHT / 2);

        if (i === 0)
          CTX.moveTo(position.x, position.y);
        else
          CTX.lineTo(position.x, position.y);

        position.x += sliceWidth;
      }

      CTX.lineTo(WIDTH, HEIGHT / 2);
      CTX.stroke();
    }

    this.draw();

    //;(this.title) ? : null;

    return this.container;
  }
}

const defaultProps = {
  source:      null,
  title:       String(),
  screenColor: String(),
  lineColor:   String(),
};

export default Oscilloscope;