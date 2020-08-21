const getInitialCamera = (json) => {
    return json.initialCamera;
};

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
        getInitialCamera: getInitialCamera(json),
        getEvents: getEvents(json)
    }
}

export default SceneService;
