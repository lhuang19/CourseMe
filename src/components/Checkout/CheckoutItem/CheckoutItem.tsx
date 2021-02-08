/**
 * 
 * Displays course checkout information with remove button and animations
 * 
 */


import { useState, forwardRef } from 'react';
import classes from './CheckoutItem.module.css';
import Button from '../../UI/Button/Button';
import CheckoutItemInfo from '../../types/CheckoutItemInfo';

const CheckoutItem = forwardRef<HTMLDivElement, CheckoutItemInfo>(
    (props, ref) => {
        const [removed, setRemoved] = useState(false);
        const deleteHandler = (close: () => void) => {
            setRemoved(true);
            setTimeout(() => {
                close();
            }, 300);
        };

        return (
            <div
                className={classes.CheckoutItem}
                style={{
                    transform: removed ? 'translateX(-130%)' : 'translateX(0)',
                    backgroundColor: props.exceeded
                        ? '#FF848480'
                        : props.dragging
                        ? '#0066FF40'
                        : 'white',
                }}
                ref={ref}
            >
                <div
                    className={classes.Rank}
                    style={{
                        backgroundColor: props.dragging
                            ? '#0066FF'
                            : '#011f5bd0',
                    }}
                >
                    <p className={classes.RankText}>{props.index + 1}</p>
                </div>
                <div className={classes.Text}>
                    <p>
                        <span className={classes.DeptAndNumber}>
                            {props.dept} {props.number}{' '}
                        </span>
                        <strong> {props.title}</strong>
                    </p>
                </div>
                <div className={classes.ButtonContainer}>
                    <Button
                        color="red"
                        onClick={() =>
                            deleteHandler(() => props.delete(props.id))
                        }
                        style={{
                            padding: '5px 10px',
                        }}
                    >
                        ✕
                    </Button>
                </div>
            </div>
        );
    }
);

export default CheckoutItem;
