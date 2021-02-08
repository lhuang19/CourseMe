/**
 * 
 * Displays course list receipt
 * Allows user to name course
 * Allows signed-in users to save courses to backend for future reference
 * Allows users to export course to pdf
 * 
 */

import axios from '../../axios-instance';
import { useContext, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { AuthContext } from '../Context/AuthContext';
import { CartContext } from '../Context/CartContext';
import { CoursesContext } from '../Context/CoursesContext';
import Spinner from '../UI/Spinner/Spinner';
import Button from '../UI/Button/Button';
import ReceiptIcon from '../../img/receiptIcon.png';

import CourseInfo from '../types/CourseInfo';
import PostInfo from '../types/PostInfo';
import classes from './Receipt.module.css';

const Receipt = (props: RouteComponentProps) => {
    const { auth, user } = useContext(AuthContext);
    const { cart, setCart } = useContext(CartContext);
    const { courses } = useContext(CoursesContext);
    const [display, setDisplay] = useState(<Spinner />);
    const [selected, setSelected] = useState<CourseInfo[]>([]);
    const [title, setTitle] = useState('');
    useEffect(() => {
        if (courses) {
            let selectedCourses: CourseInfo[] = [];
            for (let course of cart) {
                const obj = courses.find((elem) => {
                    return elem.id === course;
                });
                if (obj) selectedCourses.push(obj);
            }
            setSelected(selectedCourses);
            let newDisplay = selectedCourses.map((c, index) => {
                return (
                    <p key={c.id} className={classes.Course}>
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
            setDisplay(<>{newDisplay}</>);
        }
    }, [cart, courses]);
    const backHandler = () => {
        props.history.push({
            pathname: '/checkout',
        });
    };
    const saveScheduleHandler = () => {
        if (title === '') {
            alert('Enter Course List Name');
            return;
        }
        axios
            .get('/users.json')
            .then((response) => {
                return response.data;
            })
            .then((responseData) => {
                for (let key in responseData.users) {
                    const entry = responseData.users[key];
                    if (entry == null) continue;
                    if (entry.name === user) {
                        let schedules: Array<PostInfo> = [];
                        if (entry.schedules != null) {
                            schedules = [...entry.schedules];
                        }
                        let compiledList: PostInfo = {
                            name: title,
                            list: [...selected],
                        };
                        schedules = schedules.concat(compiledList);
                        let newUsers = { ...responseData.users };
                        newUsers[key] = {
                            ...responseData.users[key],
                            schedules: schedules,
                        };
                        const newData = {
                            users: newUsers,
                        };
                        axios
                            .patch('/users.json', newData)
                            .then((response) => {});
                        props.history.push('/');
                        setCart({ type: 'CLEAR', data: '' });
                        return;
                    }
                }
            });
    };
    const exportToPDFHandler = () => {
        const pdf = new jsPDF({orientation: "landscape"});
        pdf.setFontSize(24);
        pdf.text('Penn Course Cart - Receipt', 20, 20);
        const startHeight = 40;
        const paragraphSpacing = 10;
        const lineHeight = 5;
        const pageHeight = 170;
        let height = startHeight;
        selected.forEach((course, index) => {
          pdf.setFontSize(16);
          pdf.text((index+1) + ') ' + course.dept + ' ' + course.number + ': ' + course.title, 20, height);
          pdf.setFontSize(12);
          height += paragraphSpacing;
          const lines = pdf.splitTextToSize(course.description, 250);
          lines.forEach((line: string) => {
            pdf.text(line, 20, height);
            height += lineHeight;
          });
          height += paragraphSpacing;
          if (height > pageHeight) {
            pdf.addPage();
            height = startHeight; 
          } 
        });
        pdf.save('penn-course-cart_receipt.pdf');
    };
    const inputChangedHandler = (
        target: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTitle(target.currentTarget.value);
    };

    return (
        <div className={classes.Receipt}>
            <div className={classes.TopBanner}>
                <img
                    src={ReceiptIcon}
                    style={{
                        height: '42px',
                        width: '42px',
                    }}
                    className={classes.CartIcon}
                    alt="cartIcon"
                />

                <h1>Receipt</h1>
            </div>
            <div className={classes.Display}>
                <div className={classes.Name}>
                    <input
                        className={classes.Input}
                        placeholder="Enter Receipt Name to Save"
                        value={title}
                        onChange={inputChangedHandler}
                    />
                    <hr className={classes.Hr} />
                </div>
                {display}
            </div>
            <div className={classes.Buttons}>
                <Button color="black" onClick={backHandler}>
                    Back to Checkout
                </Button>
                <Button
                    color="blue"
                    onClick={saveScheduleHandler}
                    disabled={cart.length <= 0 || cart.length > 7 || !auth}
                >
                    {auth ? "Save to Receipt" : "Login to save receipts"}
                </Button>
                <Button
                    color="blue"
                    onClick={exportToPDFHandler}
                    disabled={cart.length <= 0 || cart.length > 7}
                >
                    Export to PDF 
                </Button>
            </div>
        </div>
    );
};

export default Receipt;
