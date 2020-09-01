import { omit } from 'lodash';
import PolyphonyService from './EventPolyphonyService';

const getInitialCamera = (json) => {
    return json.initialCamera;
};

const getStartTime = (json) => {
    const startTime = json.startTime;
    return startTime ? startTime : 0;
}

const getLoops = (json) => {

};

const getEventPlusSprite = (event, sprites) => {
    const eventWithoutProps = omit(event, "props");
    if(eventWithoutProps.sprites && eventWithoutProps.sprites.length > 0) {
        const eventWithoutPropsOrSprites = omit(eventWithoutProps, "sprites");
        const spritesToApply = event.sprites ? Object.keys(sprites).filter(key => event.sprites.includes(key)).map(key => sprites[key]) : [];
        return spritesToApply.reduce((event, sprite) => ({
            ...omit(sprite, "props"),
            ...eventWithoutPropsOrSprites
        }), omit(event, "props"));
    };
    return eventWithoutProps;
}

const useSpriteProps = (event, sprites) => {
    if(event.sprites && event.sprites.length > 0) {
        const spritesToApply = Object.keys(sprites).filter(key => event.sprites.includes(key)).map(key => sprites[key]);
        return spritesToApply.reduce((event, sprite) => ({
            ...sprite.props,
            ...event.props
        }), event);
    }
    return event.props;
};

const getEvents = (eventsJson, spritesJson) => {
    
    const events = PolyphonyService.apply(eventsJson.events);
    const sprites = spritesJson.sprites;
    return events.map((event, index) => {
        const eventPlusSprite = getEventPlusSprite(event, sprites);
        return {
            time: event.time,
            action: {
                type: `${eventPlusSprite.action}_${eventPlusSprite.element}`,
                key: `${eventPlusSprite.action}_${eventPlusSprite.element}_${index}`,
                props: useSpriteProps(event, sprites)
            }
        };
    })
}

const SequenceReaderService = (eventsJson, spritesJson) => {
    return {
        getStartTime: getStartTime(eventsJson),
        getInitialCamera: getInitialCamera(eventsJson),
        getEvents: getEvents(eventsJson, spritesJson),
        getLoops: getLoops(eventsJson, spritesJson)
    }
}

export default SequenceReaderService;
