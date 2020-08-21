const initialDelay = 1000;

const EventDispatcherService = {
    play: (events, dispatch) => {
        events.map(event => {
            setTimeout(() => {
                dispatch(event.action)
            }, initialDelay + event.time * 1000);
        });
    }
};

export default EventDispatcherService;
