const getInitialCamera = (json) => {
    return json.initialCamera;
};

const getStartTime = (json) => {
    const startTime = json.startTime;
    return startTime ? startTime : 0;
}

const getEvents = (json) => {
    
    const events = json.events;
    return events.map((event, index) => {
        return {
            time: event.time,
            action: {
                type: `${event.type}_${event.element}`,
                key: `${event.type}_${event.element}_${index}`,
                props: event.props
            }
        };
    })
}

const SceneService = (json) => {
    return {
        getStartTime: getStartTime(json),
        getInitialCamera: getInitialCamera(json),
        getEvents: getEvents(json)
    }
}

export default SceneService;
