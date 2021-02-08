/**
 * 
 * Manages courses information
 * Stores all courses, displayed courses, loading information
 * Stores prerequisite, next course, and info by id dictionaries for graph visualization
 * Stores functions to set sorting and filtering state
 * Reducer to control setting, sorting, and filtering
 * Passes relevant info to consumers
 * 
 */

import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import CourseInfo from '../types/CourseInfo';

type CoursesState = {
    courses: Array<CourseInfo>;
    filteredCourses: Array<CourseInfo>;
    loading: boolean;
    sort: (keyword: string) => void;
    sortState: string;
    filter: (keyword: string) => void;
    prereqDict: { [id: string]: string[] };
    nextDict: { [id: string]: string[] };
    infoById: { [id: string]: string };
};

type Action = {
    type: string;
    data: Array<CourseInfo>;
    keyword: string;
};

const depts = new Set(['CIS', 'ESE', 'MATH', 'PHYS', 'STAT']);

const courseReducer = (prev: CoursesState, action: Action) => {
    switch (action.type) {
        case 'SET':
            let toAdd = [];
            let prereqDict = { ...prev.prereqDict };
            let nextDict = { ...prev.nextDict };
            let infoById = { ...prev.infoById };
            for (let course of action.data) {
                if (course.prereqs) {
                    Object.values(course.prereqs).forEach((preq) => {
                        const tokens = preq.split(' ');
                        if (depts.has(tokens[0])) {
                            const courseId = course.dept + ' ' + course.number;
                            const preqId = preq
                                .split(' ')
                                .slice(0, 2)
                                .join(' ');
                            if (!(courseId in prereqDict))
                                prereqDict[courseId] = [];
                            prereqDict[courseId].push(preqId);
                            if (!(preqId in nextDict)) nextDict[preqId] = [];
                            nextDict[preqId].push(courseId);
                        }
                    });
                }
                toAdd.push({ ...course, id: course.dept + course.number });
                infoById[course.dept + ' ' + course.number] = course.title;
            }
            return {
                ...prev,
                courses: toAdd,
                filteredCourses: toAdd,
                loading: false,
                prereqDict: prereqDict,
                nextDict: nextDict,
                infoById: infoById,
            };
        case 'SORT':
            return {
                ...prev,
                filteredCourses: sortSwitch(
                    [...prev.filteredCourses],
                    action.keyword
                ),
                sortState: action.keyword,
            };
        case 'FILTER':
            let filter = action.keyword.replace(/\s+/g, '').toLowerCase();
            let newFilteredCourses = [...prev.courses].filter((course) => {
                let searchBy = (
                    course.dept +
                    course.number.toString() +
                    course.title
                )
                    .replace(/\s+/g, '')
                    .toLowerCase();
                return searchBy.includes(filter);
            });
            let newSortedAndFiltered = sortSwitch(
                [...newFilteredCourses],
                prev.sortState
            );
            return {
                ...prev,
                filteredCourses: newSortedAndFiltered,
            };

        default:
            throw new Error('Something went wrong');
    }
};

const sortSwitch = (filteredCourses: Array<CourseInfo>, type: string) => {
    switch (type) {
        case 'SORTBYNUM_LOWHIGH':
            return filteredCourses.sort((a, b) => {
                return a.number - b.number;
            });
        case 'SORTBYNUM_HIGHLOW':
            return filteredCourses.sort((a, b) => {
                return b.number - a.number;
            });
        case 'SORTBYTITLE_AZ':
            return filteredCourses.sort((a, b) => {
                return a.title.localeCompare(b.title);
            });
        case 'SORTBYTITLE_ZA':
            return filteredCourses.sort((a, b) => {
                return b.title.localeCompare(a.title);
            });
        default:
            throw new Error('Something went wrong');
    }
};

const emptyPrereqDict: { [id: string]: string[] } = {};
const emptyInfoById: { [id: string]: string } = {};

export const CoursesContext = React.createContext({
    courses: new Array<CourseInfo>(),
    filteredCourses: new Array<CourseInfo>(),
    loading: true,
    sort: (keyword: string) => {},
    sortState: 'SORTBYNUM_LOWHIGH',
    filter: (keyword: string) => {},
    prereqDict: emptyPrereqDict,
    nextDict: emptyPrereqDict,
    infoById: emptyInfoById,
});

export const CoursesContextProvider = (props: { children: JSX.Element }) => {
    let [courseData, courseDataDispatch] = useReducer(courseReducer, {
        courses: new Array<CourseInfo>(),
        filteredCourses: new Array<CourseInfo>(),
        loading: true,
        sort: (type) => {
            courseDataDispatch({
                type: 'SORT',
                keyword: type,
                data: new Array<CourseInfo>(),
            });
        },
        sortState: 'SORTBYNUM_LOWHIGH',
        filter: (filter) => {
            courseDataDispatch({
                type: 'FILTER',
                keyword: filter,
                data: new Array<CourseInfo>(),
            });
        },
        prereqDict: {},
        nextDict: {},
        infoById: {},
    });

    useEffect(() => {
        axios
            .get('./courses.json')
            .then((response) => {
                return response.data;
            })
            .then((responseData) => {
                courseDataDispatch({
                    type: 'SET',
                    data: responseData,
                    keyword: ' ',
                });
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <CoursesContext.Provider
            value={{
                courses: courseData.filteredCourses,
                filteredCourses: courseData.filteredCourses,
                loading: courseData.loading,
                sort: courseData.sort,
                filter: courseData.filter,
                sortState: courseData.sortState,
                prereqDict: courseData.prereqDict,
                nextDict: courseData.nextDict,
                infoById: courseData.infoById,
            }}
        >
            {props.children}
        </CoursesContext.Provider>
    );
};

export default CoursesContextProvider;
