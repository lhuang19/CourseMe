import classes from './Schedule.module.css';
import Button from '../../UI/Button/Button';

type ScheduleInfo = {
    id: string;
    dept: string;
    number: number;
    title: string;
};

type SchedulesInfo = {
    key: string;
    name: string;
    courses: Array<ScheduleInfo>;
    remove: () => void;
};

const Schedule = (props: SchedulesInfo) => {
    let courses = props.courses.map((c, index) => {
        return (
            <p key={c.id}>
                {index + 1}){' '}
                <span className={classes.DeptAndNumber}>
                    &nbsp;&nbsp;
                    {c.dept} {c.number}{' '}
                </span>
                &nbsp;&nbsp;
                <strong>{c.title}</strong>
            </p>
        );
    });

    return (
        <div className={classes.Schedule}>
            <h3>{props.name}</h3>
            <Button color="red" onClick={props.remove}>
                Remove Course List
            </Button>
            {courses}
        </div>
    );
};

export default Schedule;
