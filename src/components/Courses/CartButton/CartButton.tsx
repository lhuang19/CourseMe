/**
 * 
 * Cart button
 * Displays cart button, icon, text, and selected courses
 * Dynamic width and overflow for selected courses
 * 
 */

import Button from '../../UI/Button/Button';
import CartIcon from '../../../img/cartIcon.png';
import classes from './CartButton.module.css';

type CartButtonInfo = {
    showCartHandler: () => void;
    number: number;
    disable?: boolean;
    cart: string[];
};

const CartButton = (props: CartButtonInfo) => {
    let courseIcons = props.cart.map((c) => {
        return (
            <p className={classes.CourseIconText} key={c}>
                {c}
            </p>
        );
    });
    return (
        <Button
            style={{
                width: props.cart.length * 42 + 90,
                maxWidth: 7 * 42 + 90 + 25,
                height: 35,
                fontSize: 14,
                overflow: 'hidden',
            }}
            color={props.number <= 7 ? 'blue' : 'red'}
            onClick={props.showCartHandler}
            disabled={props.disable}
        >
            <div
                className={classes.Container}
                style={{
                    width: props.cart.length * 42 + 90,
                    maxWidth: 7 * 42 + 100 + 25,
                }}
            >
                <div className={classes.CartAndNumber}>
                    <img
                        src={CartIcon}
                        style={{
                            height: '24px',
                            width: '24px',
                            color: 'white',
                            filter:
                                'invert(90%) sepia(99%) saturate(31%) hue-rotate(196deg) brightness(109%) contrast(99%)',
                        }}
                        className={classes.CartIcon}
                        alt="cartIcon"
                    />
                    <p className={classes.Number}>{props.number}</p>
                    <p className={classes.CartText}>Cart</p>
                </div>

                <div
                    className={classes.CourseIcons}
                    style={{
                        right: props.cart.length > 7 ? 33 : 23,
                    }}
                >
                    {courseIcons}
                </div>
            </div>
        </Button>
    );
};

export default CartButton;
