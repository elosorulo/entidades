import lerp from 'lerp';

const SINE_MODULATION = "SINE";

const TRIANGLE_MODULATION = "TRIANGLE";

const SQUARE_MODULATION = "SQUARE";

const SAWTOOTH_MODULATION = "SAWTOOTH";

const validateFrequency = (frequency) => frequency ? frequency : 1;

const validateAmplitude = (amplitude) => amplitude ? amplitude : 1;

const squareModulation = (alpha, frequency, amplitude) => {
    const phase = Math.sin(Math.PI * alpha * validateFrequency(frequency)) * validateAmplitude(amplitude);
    return phase >= 0 ? 0.1 : 0.8;
};

const triangleModulation = (alpha, frequency, amplitude) => {
    return (1 + lerp(-1, 1, Math.sin(Math.PI * validateFrequency(frequency) * alpha)) * validateAmplitude(amplitude)) / 2;
};

const sawtoothModulation = (alpha, frequency, amplitude) => {
    return triangleModulation(alpha > 0.5 ? alpha - 0.5 : alpha, frequency, amplitude);
};

const sineModulation = (alpha, frequency, amplitude) => {
    return (1 + Math.sin(Math.PI * alpha * validateFrequency(frequency)) * validateAmplitude(amplitude)) / 2;
};

const modulate = (modulation, alpha) => {
    switch(modulation.type) {
        case SINE_MODULATION:
            return sineModulation(alpha, modulation.frequency, modulation.amplitude);
        case SAWTOOTH_MODULATION:
            return sawtoothModulation(alpha, modulation.frequency, modulation.amplitude);
        case TRIANGLE_MODULATION:
            return triangleModulation(alpha, modulation.frequency, modulation.amplitude);
        case SQUARE_MODULATION:
            return squareModulation(alpha, modulation.frequency, modulation.amplitude);
        default:
            return alpha;        
    };
};

export default modulate;
