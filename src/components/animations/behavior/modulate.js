import lerp from 'lerp';

const SINE_MODULATION = "SINE";

const TRIANGLE_MODULATION = "TRIANGLE";

const SQUARE_MODULATION = "SQUARE";

const SAWTOOTH_MODULATION = "SAWTOOTH";

const validateFrequency = (frequency) => frequency ? frequency : 1;

const validateAmplitude = (amplitude) => amplitude ? amplitude : 1;


const sawtoothModulation = (alpha, frequency, amplitude) => {
    return Math.abs(lerp(0, 0.5, Math.sin(Math.PI * (alpha > 0.5 ? alpha - 0.5 : alpha) * validateFrequency(frequency)))) * validateAmplitude(amplitude);
};

const squareModulation = (alpha, frequency, amplitude) => {
    const phase = Math.sin(Math.PI * alpha * 8 * validateFrequency(frequency)) * validateAmplitude(amplitude);
    return phase >= 0 ? 0.1 : 0.8;
};

const triangleModulation = (alpha, frequency, amplitude) => {
    return alpha + lerp(-1, 1, Math.sin(Math.PI * alpha * validateFrequency(frequency))) * validateAmplitude(amplitude);
};

const sineModulation = (alpha, frequency, amplitude) => {
    return alpha + Math.sin(Math.PI * alpha * validateFrequency(frequency) * validateAmplitude(amplitude));
};

const modulate = (modulation, alpha) => {
    switch(modulation.type) {
        case SINE_MODULATION:
            const res = sineModulation(alpha, modulation.frequency, modulation.amplitude);
            return res;
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
