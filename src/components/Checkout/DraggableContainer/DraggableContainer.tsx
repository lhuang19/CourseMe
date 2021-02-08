/**
 * 
 * Contains draggable logic and passes course information to checkout item
 * Allows users to rank courses
 * 
 */

import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from 'react-beautiful-dnd';
import { useContext, Fragment } from 'react';
import CourseInfo from '../../types/CourseInfo';
import CheckoutItem from '../CheckoutItem/CheckoutItem';
import { CartContext } from '../../Context/CartContext';
import classes from './DraggableContainer.module.css';

type DraggableContainerType = {
    courses: CourseInfo[];
};

const DraggableCourse = (c: CourseInfo, index: number) => {
    const { setCart } = useContext(CartContext);
    return (
        <Draggable draggableId={c.id} index={index} key={c.id}>
            {(provided, snapshot) => (
                <div
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <CheckoutItem
                        key={c.id}
                        id={c.id}
                        index={index}
                        dept={c.dept}
                        number={c.number}
                        title={c.title}
                        delete={() => setCart({ type: 'REMOVE', data: c.id })}
                        exceeded={index >= 7}
                        dragging={snapshot.isDragging}
                    />
                </div>
            )}
        </Draggable>
    );
};

const CourseList = (props: CourseInfo[]) => {
    return (
        <div>
            {props.map((course: CourseInfo, index: number) => {
                return (
                    <Fragment key={course.id}>
                        {index === 7 ? (
                            <hr className={classes.Hr} key="hr" />
                        ) : null}
                        {DraggableCourse(course, index)}
                    </Fragment>
                );
            })}
        </div>
    );
};

function DraggableContainer(props: DraggableContainerType) {
    const { setCart } = useContext(CartContext);
    function onDragEnd(result: DropResult) {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        setCart({
            type: 'REORDER',
            data: '' + result.source.index + ' ' + result.destination.index,
        });
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {CourseList(props.courses)}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default DraggableContainer;
