import React, {EffectCallback, ReactNode, useEffect} from "react";
import {createPortal} from "react-dom";

interface IPortalProps{
    children: ReactNode
}

const Portal = (props: IPortalProps) => {
    const {children} = props;
    const parentElement: HTMLElement = document.getElementById('notifications') || document.body;
    const portalContainer: HTMLElement = document.createElement('div');
    portalContainer.classList.add('portal-container');

    useEffect((): ReturnType<EffectCallback> => {
        parentElement.appendChild(portalContainer);

        return (): void => {
            if(parentElement.contains(portalContainer)){
                parentElement.removeChild(portalContainer)
            }
        };
    }, [children]);

    return children ? createPortal(children, portalContainer) : <p>no content in portal</p>

}

export default Portal;