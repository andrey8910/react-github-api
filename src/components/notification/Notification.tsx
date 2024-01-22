import styled, { css, keyframes } from "styled-components";
import { createPortal } from 'react-dom';
import {useEffect, useRef} from "react";

const animateBorderRotate = keyframes`
    0%{
        transform: translateY(50vh) ;
        opacity: 0;
       
    }

    100%{
        transform: translateY(0) ;
        opacity: 1;
    }
`


const NotificationBlock = styled.div`
  position: absolute;
    top: 40px;
  //bottom: 20px;
  left: 20px;
  width: 300px;
    max-width: 400px;
  min-height: 100px;
  z-index: 500;
    animation:  ${animateBorderRotate} 0.2s linear;
    
    .error{
        position: relative;
        border: 1px solid red;
        background-color: rgba(188, 143, 143, 0.5);
        width: 100%;
        height: 100%;
        padding: 10px;
        box-shadow: 1px 1px 1px rosybrown;
        overflow: hidden;
        
        .message-text{
            font-size: 16px;
        }
        
        .closeBtn{
            position: absolute;
            top: 10px;
            right: 10px;
            width: 20px;
            height: 20px;
            text-align: center;
            background-color: transparent;
            border: none;
            border-radius: 50%;
            outline: 1px solid black;
            
            &:hover{
                cursor: pointer;
            }
            
        }
    }
`

interface INotificationProps{
    type: 'error' | 'warning' | 'success'
    close: () => void
    message?: string
}

export function Notification (props: INotificationProps){
    const {type, close, message} = props;
    const el = useRef<HTMLDivElement>(null);
    const parentElement: HTMLElement = document.getElementById('notifications') || document.body;

    const removeNote = () => {
        if(el.current){
            const portalContainer = el.current.parentElement;
            if(portalContainer && parentElement){
                portalContainer.removeChild(el.current);
                parentElement.removeChild(portalContainer)
            }
        }
    }
    const notificationError =
        <NotificationBlock ref={el}>
            <div className="error">
                <p>ERROR</p>
                <p className='message-text'>{message}</p>
                <button className="closeBtn" onClick={close}>X</button>
            </div>
        </NotificationBlock>

    return notificationError
}