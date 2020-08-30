import { eventTypes as SoundEventTypes } from '../components/Sound'; 

const isSoundEvent = action => Object.values(SoundEventTypes).includes(action.type);

const EventDispatcherService = {
    play: (events, startTime, dispatch, clock, soundsApi) => {
        events.map(event => {
            if((!event.action.type.includes("PLAY") || (event.time >= startTime)) && !isSoundEvent(event.action)) {
                setTimeout(() => {
                        const elapsedTime = clock.elapsedTime;
                        dispatch({
                            ...event.action,
                            startTime: elapsedTime
                        })
                }, (event.time - startTime) * 1000);
            } else if (isSoundEvent(event.action)) {
                soundsApi.execute(
                    {
                        ...event.action,
                        startTime: startTime
                    }
                )
            }
        });
    }
};

export default EventDispatcherService;
