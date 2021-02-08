/**
 * 
 * Course graph page
 * Creates prerequisite and next course information to be used in visualization
 * 
 */

import { useEffect, useState, useContext } from 'react';
import { CoursesContext } from '../Context/CoursesContext'
import { GraphInfo } from '../types/GraphInfo'
import Visualization from './Visualization/Visualization'
import { RouteComponentProps, Redirect } from 'react-router-dom';

const CourseGraph = (props: RouteComponentProps) => {
    const { courses, prereqDict } = useContext(CoursesContext);
    const getLevel = (courseId: string) => {
        if (courseId === 'CIS 110' || courseId === 'CIS 120' || courseId === 'CIS 160') return 1;
        if (courseId === 'CIS 240' || courseId === 'CIS 121' || courseId === 'ESE 112') return 2;
        const tokens = courseId.split(' ');
        if (tokens[0] !== 'CIS') return 7;
        return Number(tokens[1][0])+2;
    };
    
    let graph: GraphInfo = {
    nodes: [],
    edges: []
    };
    const [vis, setVis] = useState(<h1>Loading</h1>);
    useEffect(() => {
        let nodes = new Set<string>();
        for (const idx in courses) {
            const course = courses[idx];
            const courseId = course.dept + ' ' + course.number;
            nodes.add(courseId);
            graph.nodes.push({ id: courseId, label: courseId, level: getLevel(courseId), title: courseId + ' ' + course.title });
        }
        for (const courseId in prereqDict) {
            for (const idx in prereqDict[courseId]) {
                const prereq = prereqDict[courseId][idx];
                if (nodes.has(prereq) === false) {
                    nodes.add(prereq);
                    const color = prereq.startsWith('MATH') ? '#ffdfbf' :
                        prereq.startsWith('ESE') ? '#fef6c5' :
                            prereq.startsWith('STAT') ? '#b19cd9' :
                                prereq.startsWith('PHYS') ? '#d2e9af' : '#97c2fc'
                    graph.nodes.unshift({ id: prereq, label: prereq, level: getLevel(prereq), title: prereq, color: color });
                }
                graph.edges.push({ from: prereq, to: courseId, title: 'prerequisite' });
            }
        }
        setVis(<Visualization graph={graph} />)
    }, []);

    return (
        <div>
            {courses.length === 0? <Redirect to="/" /> : vis}
        </div>
    )
}


export default CourseGraph;
