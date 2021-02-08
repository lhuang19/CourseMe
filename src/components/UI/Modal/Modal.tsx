/**
 * 
 * Modal component wrapping children to create pop up
 * 
 */

import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
const Modal = (props: {
    close: () => void;
    show: boolean;
    children: JSX.Element;
}) => {
    return (
        <React.Fragment>
            <Backdrop
                clicked={props.close}
                show={props.show}
                style={{
                    backdropFilter: props.show ? 'blur(20px)' : 'blur(0px)',
                    visibility: props.show ? 'visible' : 'hidden',
                    opacity: props.show ? '.8' : '0',
                }}
            />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show
                        ? 'translateY(0)'
                        : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0',
                    transition: props.show
                        ? 'opacity 0.5s ease-out, transform .8s ease-out'
                        : 'opacity 0.5s ease-out, transform 2s ease-out',
                }}
            >
                {props.children}
            </div>
        </React.Fragment>
    );
};

export default Modal;
