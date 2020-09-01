const fragments = 4;

const fragmentWidth = 3;

const fragmentHeight = 3;

const fragmentDepth = 3;

const delta = (max) => Math.random() * max - max / 2;

const getParticlePositions = (initialPosition, finalPosition, width, height, depth) =>{
    return {
        initialPosition: [
            initialPosition[0] - delta(width),
            initialPosition[1] - delta(height),
            initialPosition[2] - delta(depth)
        ],
        finalPosition: [
            finalPosition[0] - delta(width),
            finalPosition[1] - delta(height),
            finalPosition[2] - delta(depth)
        ]
    }
};

const betweenRange = (index, firstIndex, latestIndex) => {
    return (index >= firstIndex && index <= latestIndex);
};

const getFirstIndex = (lastFree, animationSize, amount) => {
    
    return lastFree + animationSize > amount ? 0 : lastFree % amount;
};

const getLastIndex = (firstIndex, animationSize) => {
    return firstIndex + (animationSize === 0 ? 0 : animationSize - 1);
};

const getNextFree = (firstIndex, animationSize) => {
    return firstIndex + animationSize;
};

const getShapes = (oldShapes, firstIndex, lastIndex, newProps) => {
    const particlePositions = () => newProps.isParticle ? getParticlePositions(
        newProps.initialPosition,
        newProps.finalPosition,
        fragmentWidth,
        fragmentHeight,
        fragmentDepth
    ) : {};
    const array = oldShapes.map((oldProps, index) => {
        return betweenRange(
            index,
            firstIndex,
            lastIndex,
        ) ? {
                ...newProps,
                ...particlePositions(),
                key: (index - firstIndex) % fragments
            } : oldProps
    });
    return array;
};

const updateAnimations = (oldShapes, amount, lastFree, startTime, newProps) => {
    const size = newProps.animationSize * (newProps.isParticle ? fragments : 1);
    const firstIndex = getFirstIndex(lastFree, size, amount);
    const lastIndex = getLastIndex(firstIndex, size);
    const nextFree = getNextFree(firstIndex, size);
    return {
        amount: amount,
        lastFree: nextFree,
        shapes: getShapes(oldShapes, firstIndex, lastIndex, {
            startTime: startTime,
            ...newProps
        })
    };
};

const shapesAnimationsReducer = actionType => (state, action) => {
    
    switch(action.type) {
        case actionType:
            return updateAnimations(
                state.shapes,
                state.amount,
                state.lastFree,
                action.startTime,
                action.props
            );
        default:
            return state;
    };
};

export default shapesAnimationsReducer;
