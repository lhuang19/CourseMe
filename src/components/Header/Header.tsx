/**
 * 
 * Header display
 * Contains title and navigation buttons
 * 
 */

import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <header className={classes.Header}>
            <h1 className={classes.Title}>Penn Course Cart</h1>
            <div>
                <NavLink
                    to="/"
                    exact
                    className={classes.Button}
                    activeClassName={classes.Active}
                >
                    Courses Catalogue
                </NavLink>
                <NavLink
                    to="/schedules"
                    className={classes.Button}
                    activeClassName={classes.Active}
                >
                    My Receipts
                </NavLink>
            </div>
        </header>
    );
}
export default Header;
