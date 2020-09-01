import { omit } from 'lodash';

const POSITION_PYRAMID = "POSITION_PYRAMID";

const POSITION_GRID = "POSITION_GRID";

const INVERSE_POSITION_GRID = "INVERSE_POSITION_GRID";

const INTERPOLATION_PYRAMID = "INTERPOLATION_PYRAMID";

const INTERPOLATION_GRID = "INTERPOLATION_GRID";

const INVERSE_INTERPOLATION_GRID = "INVERSE_INTERPOLATION_GRID";

const applyProps = (props, injectedProps) => {
    return {
        ...props,
        ...injectedProps
    };
}

const applyGrid = (amount, fn) => {
    
    return [...Array(amount[2]).keys()].flatMap(z =>
        [...Array(amount[1]).keys()].flatMap(y =>
            [...Array(amount[0]).keys()].map(x =>
                {
                    return fn(x, y, z)
                }
            )
        )
    )
}

const positionGridPosition = (position, separation) => (x, y, z) => {
    
    const r = [
        position[0] + x * separation[0],
        position[1] + y * separation[1],
        position[2] + z * separation[2]
    ];
    return r;
}

const positionGridEventProps = (time, sprites, position, separation) => (x, y, z) => (
    {
        time: time,
        type: "SINGLE",
        sprites: sprites,
        props: {
            position: position(position, separation)(x, y, z)
        }
    }
);

const getTime = (time, delay, x) => {
    return time + delay * x;
};

const interpolationGridEventProps = (time, sprites, initialPosition, finalPosition, separation, delay) => (x, y, z) => {
    const props = {
        initialPosition: positionGridPosition(initialPosition, separation)(x, y, z),
        finalPosition: positionGridPosition(finalPosition, separation)(x, y, z)
    };
    return {
        time: getTime(time, delay, x),
        type: "SINGLE",
        sprites: sprites,
        props: props
    };
};

const applyPositionGrid = (event) => applyGrid(event.polyphony.amount, positionGridEventProps(
    event.time,
    event.sprites,
    event.polyphony.position,
    event.polyphony.separation
));

const applyInterpolationGrid = (event) => applyGrid(event.polyphony.amount, interpolationGridEventProps(
    event.time,
    event.sprites,
    event.polyphony.initialPosition,
    event.polyphony.finalPosition,
    event.polyphony.separation,
    event.polyphony.delay
));

const applyPoliphony = event => {
    switch(event.polyphony.type) {
        case POSITION_GRID:
            return applyPositionGrid(event);
        case INTERPOLATION_GRID:
            return applyInterpolationGrid(event);
        default:
            throw new Error(`event ${JSON.stringify(event)} was not polyphonic.`);
    };
};

const apply = (events) => {
    const r = [
        ...events.filter(event => event.type !== "POLYPHONIC"),
        ...events.filter(event => event.type === "POLYPHONIC").flatMap(event => applyPoliphony(event))
    ];
    return r;
};

const EventPolyphonyService = {
    apply: (events) => apply(events)
};

export default EventPolyphonyService;
