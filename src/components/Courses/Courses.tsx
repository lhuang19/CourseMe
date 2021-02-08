/**
 * 
 * Course catalogue page
 * Contains courses, cart button, and sort/filter inputs
 * Dynamically display course cards
 * 
 */

import { useState, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Course from './Course/Course';
import Modal from '../UI/Modal/Modal';
import DescriptionPopUp from './DescriptionPopUp/DescriptionPopUp';
import { CoursesContext } from '../Context/CoursesContext';
import { CartContext } from '../Context/CartContext';
import CartButton from './CartButton/CartButton';
import Button from '../UI/Button/Button';

import classes from './Courses.module.css';

function Courses(props: RouteComponentProps) {
    const { courses, filter, sort } = useContext(CoursesContext);
    const { cart, setCart } = useContext(CartContext);

    const [showDescription, setShowDescription] = useState('');

    const [showModal, setShowModal] = useState(false);

    const selectHandler = (id: string) => {
        setCart({ type: 'ADD', data: id });
    };

    const deleteFromCartHandler = (id: string) => {
        setCart({ type: 'REMOVE', data: id });
    };

    const showDescriptionHandler = (id: string) => {
        setShowModal(true);
        setShowDescription(id);
    };

    const closeDescriptionHandler = () => {
        setShowModal(false);
        setTimeout(() => setShowDescription(''), 300);
    };

    let toRender = <h1>LOADING</h1>;
    if (courses) {
        toRender = (
            <div>
                {Object.keys(courses).map((key) => {
                    let element = courses[Number(key)];
                    return (
                        <Course
                            key={key}
                            id={element.id}
                            dept={element.dept}
                            number={element.number}
                            title={element.title}
                            selected={[...cart].includes(element.id)}
                            prereqs={element.prereqs}
                            add={selectHandler}
                            delete={deleteFromCartHandler}
                            description={element.description}
                            showDescription={showDescriptionHandler}
                        />
                    );
                })}
            </div>
        );
    }
    const checkoutHandler = () => {
        props.history.push({
            pathname: '/checkout',
        });
    };

    let description = showDescription
        ? () => {
              const selectedCourse = courses.find((course) => {
                  return course.id === showDescription;
              });
              if (selectedCourse === null || selectedCourse === undefined) {
                  return <div />;
              }
              return (
                  <DescriptionPopUp
                      dept={selectedCourse.dept}
                      number={selectedCourse.number}
                      title={selectedCourse.title}
                      prereqs={selectedCourse.prereqs}
                      description={selectedCourse.description}
                      selected={[...cart].includes(selectedCourse.id)}
                      add={() => selectHandler(selectedCourse.id)}
                      delete={() => deleteFromCartHandler(selectedCourse.id)}
                      close={closeDescriptionHandler}
                  />
              );
          }
        : () => {
              return <div />;
          };

    

    const visualizationHandler = () => {
        props.history.push("/coursegraph");
    };

    return (
        <div className={classes.Courses}>
            <Modal close={closeDescriptionHandler} show={showModal}>
                {description()}
            </Modal>
            <div className={classes.FilterDiv}>
                <div className={classes.InputAndSelect}>
                    <input
                        className={classes.Input}
                        placeholder="Search"
                        onChange={(event) =>
                            filter(event.target.value)
                        }
                    />
                    <select
                        className={classes.Select}
                        onChange={(event) =>
                            sort(event.target.value)
                        }
                    >
                        <option value="SORTBYNUM_LOWHIGH">
                            Sort By Number Low-High
                        </option>
                        <option value="SORTBYNUM_HIGHLOW">
                            Sort By Number High-Low
                        </option>

                        <option value="SORTBYTITLE_AZ">
                            Sort By Title a-z
                        </option>
                        <option value="SORTBYTITLE_ZA">
                            Sort By Title z-a
                        </option>
                    </select>
                </div>
                <div className={classes.CartButtonAndDisplay}>
                    <CartButton
                        showCartHandler={checkoutHandler}
                        number={cart.length}
                        cart={cart}
                    />
                </div>
            </div>
            <div className={classes.CoursesDisplay}>{toRender}</div>
            <div className={classes.VisualizationButton}>
                <Button color="blue" onClick={visualizationHandler}>
                    Courses Graph
                </Button>
            </div>
        </div>
    );
}
export default Courses;
