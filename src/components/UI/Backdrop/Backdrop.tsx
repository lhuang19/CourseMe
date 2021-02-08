/**
 * 
 * Blurry backdrop behind modal
 * 
 */

import classes from './Backdrop.module.css';

type BackdropProps = {
  clicked: () => void;
  show: boolean;
  style: React.CSSProperties;
};

function Backdrop(props: BackdropProps) {
    return (
        <div
            className={classes.Backdrop}
            onClick={props.clicked}
            style={props.style}
        ></div>
    );
}

export default Backdrop;
