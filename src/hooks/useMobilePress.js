import React from 'react';

function useMobilePress(props) {

    const [active, isActive] = React.useState(false);
    const [moved, isMoved] = React.useState(false);
    
    return {
        onClick: (e) => {
            if(props.onClick !== undefined) props.onClick(e);
        },
        active: active && !moved,
        onTouchStart: (e) => {
            e.preventDefault();
            setTimeout(() => {
                if(!moved)isActive(true)
            }, 100);
            if(props.onTouchStart !== undefined) props.onTouchStart();
        },
        onTouchEnd: (e) => {
            e.preventDefault();
            e.persist();
            if(!moved)props.onClick(e);
            isMoved(false);
            isActive(false);
            setTimeout(() => isActive(false), 100);
            if(props.onTouchEnd !== undefined) props.onTouchEnd(e);   
        },
        onTouchMove: (e) => {
            e.preventDefault();
            isMoved(true);
            isActive(false);
            setTimeout(() => isActive(false), 100);
            if(props.onTouchMove !== undefined) props.onTouchMove(e);
        },
        onTouchCancel: (e) => {
            e.preventDefault();
            isActive(false);
            isMoved(false);
            setTimeout(() => isActive(false), 100);
            if(props.onTouchCancel !== undefined) props.onTouchCancel(e);
        },
        onMouseDown: (e) => {
            if(props.onMouseDown !== undefined) props.onMouseDown(e);
            isActive(true);
        },
        onMouseUp: (e) => {
            if(props.onMouseUp !== undefined) props.onMouseUp(e);
            isActive(false);
        },
        onMouseLeave: (e) => {
            if(props.onMouseUp !== undefined) props.onMouseUp(e);
            isActive(false);
        }
    };
  };

  export default useMobilePress;
