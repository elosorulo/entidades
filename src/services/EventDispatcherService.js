import { eventTypes as SoundEventTypes } from '../components/Sound'; 

const initialDelay = 1000;

const EventDispatcherService = {
    play: (events, dispatch, clock, soundsApi) => {
        events.map(event => {
            setTimeout(() => {
                if(Object.values(SoundEventTypes).includes(event.action.type)) {
                    soundsApi.execute(event.action);
                } else {
                    dispatch({
                        ...event.action,
                        startTime: clock.elapsedTime
                    })
                }
            }, initialDelay + event.time * 1000);
        });
    }
};

export default EventDispatcherService;
