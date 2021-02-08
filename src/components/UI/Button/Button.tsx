/**
 * 
 * Custom buttom class with preset colors/hover behavior
 * 
 */

import classes from './Button.module.css';

interface IPalette {
    red: string,
    green: string,
    blue: string,
    black: string
};

const palette: IPalette = {
    red: '#C0392B',
    green: '#66CC66',
    blue: '#0066FF',
    black: '#566573',
};

const shadow: IPalette = {
    red: '#702219',
    green: '#1f5c1f',
    blue: '#003585',
    black: '#2a3137',
};

type onClickHndl = (event: React.MouseEvent<HTMLElement>) => void;

type ButtonProps = {
  color: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: onClickHndl;
  disabled?: boolean;
  children: React.ReactNode;
};

const Button = (props: ButtonProps) => {
    return (
        <button
            className={[classes.Button, props.className].join(' ')}
            onClick={props.onClick}
            style={{
                ...props.style,
                backgroundColor: palette[props.color as keyof IPalette],
                boxShadow: `0 0 1px ${shadow[props.color as keyof IPalette]}`,
            }}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;
