/**
 * 
 * Controls routing
 * 
 */

import { Switch, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classes from './App.module.css';
import Layout from './hoc/Layout/Layout';
import Courses from './components/Courses/Courses';
import Checkout from './components/Checkout/Checkout';
import Schedules from './components/Schedules/Schedules';
import Receipt from './components/Receipt/Receipt';
import CourseGraph from './components/CourseGraph/CourseGraph'
import './transitions.css';

const App = () => {
    let location = useLocation();
    return (
        <div className={classes.App}>
            <Layout>
                <TransitionGroup>
                    <CSSTransition
                        key={location.key}
                        timeout={500}
                        classNames="transitions"
                    >
                        <Switch location={location}>
                            <Route path="/coursegraph" component={CourseGraph} />
                            <Route path="/receipt" component={Receipt} />
                            <Route path="/checkout" component={Checkout} />
                            <Route path="/schedules" component={Schedules} />
                            <Route component={Courses} />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </Layout>
        </div>
    );
};

export default App;
