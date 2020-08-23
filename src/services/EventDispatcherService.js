const initialDelay = 1000;

const EventDispatcherService = {
    play: (events, dispatch, clock) => {
        
        events.map(event => {
            setTimeout(() => {
                dispatch({
                    ...event.action,
                    startTime: clock.elapsedTime
                })
            }, initialDelay + event.time * 1000);
        });
    }
};

export default EventDispatcherService;
