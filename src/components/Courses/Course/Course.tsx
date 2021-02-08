/**
 * 
 * Course card
 * Displays dept, num, title
 * In cart indicator
 * Buttons to add/remove to cart and show additional information
 * 
 */

import classes from './Course.module.css';
import Button from '../../UI/Button/Button';
import CourseInfo from '../../types/CourseInfo';

function Course(props: CourseInfo) {
    return (
        <div className={classes.Course}>
            <div className={classes.Content}>
                <p className={classes.DeptAndNum}>
                    {props.dept} {props.number}
                </p>
                <p className={classes.Title}>
                    <strong>{props.title}</strong>
                </p>
                {props.prereqs ? (
                    <div className={classes.Prerequisites}>
                                {props.prereqs.map((prereq) => {
                                    return (
                                        <div key={props.title + prereq}>
                                            <div
                                                className={classes.Prereq}
                                            >
                                                {prereq}
                                            </div>
                                        </div>
                                    );
                                })}
                    </div>
                ) : null}
            </div>
            <div className={classes.ButtonPanel}>
                {!props.selected ? (
                    <Button
                        color="green"
                        onClick={() => props.add(props.id)}
                        className={classes.B}
                    >
                        Add Course
                    </Button>
                ) : (
                    <Button
                        color="red"
                        onClick={() => props.delete(props.id)}
                        className={classes.B}
                    >
                        Remove Course
                    </Button>
                )}
                <Button
                    color="blue"
                    onClick={() => props.showDescription(props.id)}
                    className={classes.B}
                >
                    More...
                </Button>
            </div>
            <div
                className={classes.SelectedBanner}
                style={{
                    opacity: props.selected ? '1' : '0',
                    transform: props.selected
                        ? 'translate(38%, 160%) rotate(45deg) scale(1.5)'
                        : 'translate(50%, 0) rotate(45deg) scale(1)',
                }}
            >
                <span className={classes.SelectedText}>In Cart</span>
            </div>
        </div>
    );
}

export default Course;
