/**
 * 
 * Shows course description
 * Fetched data from PennAPI
 * Contains graph visualization with courses linked to the one selected
 * Buttons to add/remove to cart and close pop up
 * 
 */

import React, { useState, useEffect, useContext } from 'react';
import Graph, {Network} from 'react-graph-vis';
import classes from './DescriptionPopUp.module.css';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import axios from 'axios';
import { CoursesContext } from '../../Context/CoursesContext';
import {GraphInfo, NodeInfo, EdgeInfo} from '../../types/GraphInfo';
import '../../../../node_modules/vis-network/dist/vis-network.min.css'

type DescriptionInfo = {
    dept: string;
    number: number;
    title: string;
    prereqs: Array<string>;
    description: string;
    selected: boolean;
    add: () => void;
    delete: () => void;
    close: () => void;
};

function DescriptionPopUp(props: DescriptionInfo) {
    let prereqs = props.prereqs ? (
        <div className={classes.DescriptionElement}>
            Prerequisites:
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
        </div>
    ) : (
        <p className={classes.DescriptionElement}>No prerequisites</p>
    );
    let descriptionDisplay = (
        <p className={classes.DescriptionElement}>{props.description}</p>
    );

    const [display, setDisplay] = useState(
        <>
            <p className={classes.DeptAndNum}>
                {props.dept} {props.number}
            </p>
            <h1 className={classes.Title}>{props.title}</h1>
            {prereqs} {descriptionDisplay} <Spinner />
        </>
    );

    const { infoById, prereqDict, nextDict } = useContext(CoursesContext);

    const closeThenExecute = (func: () => void) => {
        props.close();
        setTimeout(() => {
            func();
        }, 100);
    };

    const courseId = props.dept + ' ' + props.number;
    let graphNodes = new Set([courseId]);
    let graph: GraphInfo = {
      nodes: [ {id: courseId, label: courseId, shape: 'circle', title: courseId+' '+ infoById[courseId]} ],
      edges: []
    };

    const options = {
      autoResize: false,
      layout: {
        hierarchical: {
          enabled: true,
          levelSeparation: 180,
          direction: 'LR',
          sortMethod: 'directed'
        }
      },
      edges: {
        width: 1.2
      },
      nodes: {
        shape: 'box',
        physics: false,
        hover: {
          border: '#2B7CE9',
          background: '#D2E5FF'
        }
      },
      interaction: {
        navigationButtons: true,
        keyboard: {
          enabled: true
        },
        hover: true,
        tooltipDelay: 1
      }
    };

    useEffect(() => {
        axios
            .get(
                `https://api.pennlabs.org/registrar/search?q=${props.dept}-${props.number}`
            )
            .then((response) => {
                return response.data;
            })
            .then((responseData) => {
                if (
                    responseData.courses[0] === undefined ||
                    responseData.courses[0] === null
                ) {
                    throw new Error('No Data Available');
                }
                return responseData.courses[0];
            })
            .then((responseData) => {
                const instructor = (
                    <p className={classes.DescriptionElement}>
                        Instructor:{' '}
                        <strong>
                            {responseData['instructors'][0]['name']}
                        </strong>
                    </p>
                );
                let newDisplay = (
                    <>
                        <p className={classes.DeptAndNum}>
                            {responseData['course_department']}{' '}
                            {responseData['course_number']}
                        </p>
                        <h1 className={classes.Title}>
                            {responseData['course_title']}
                        </h1>
                        {prereqs} {instructor}
                        <p className={classes.CUAndURL}>
                            <strong>
                                {responseData['credit_and_grade_type']} &emsp;
                                <a
                                    className={classes.URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={responseData['department_url']}
                                >
                                    {responseData['department_url']}
                                </a>
                            </strong>
                        </p>
                        {descriptionDisplay}
                        {graph.nodes.length <=1 ?
                          <div /> :
                          <Graph graph={graph} options={options} style={{ height: "240px" }} />
                        }
                    </>
                );

                setDisplay(newDisplay);
            })
            .catch((error) => {
                let newDisplay = (
                    <>
                        <h3 className={classes.DeptAndNum}>
                            {props.dept} {props.number}
                        </h3>
                        <h1 className={classes.Title}>{props.title}</h1>
                        {prereqs} {descriptionDisplay}{' '}
                        <h4>No Additional Data Available</h4>
                        {graph.nodes.length <=1 ?
                          <div /> :
                          <Graph graph={graph} options={options} style={{ height: "240px" }}/>
                        }
                    </>
                );
                setDisplay(newDisplay);
            });
    }, []);
    let pendingNodes: string[] = [courseId];
    let isDirect = true;
    while (pendingNodes.length>0){
      let newPendingNodes: string[] = [];
      pendingNodes.forEach(node => {
        if (node in prereqDict){
          const pres = prereqDict[node];
          pres.forEach(pre => {
            if (!graphNodes.has(pre)){
              graphNodes.add(pre);
              newPendingNodes.push(pre);
              if (isDirect)
                graph.nodes.push({id: pre, label: pre, shape: 'eclipse', borderWidth: 2, 
                                title: 'prerequisite: '+pre+(pre in infoById? ' ' + infoById[pre] : ''), color: "#ffcccb"});
              else
                graph.nodes.push({id: pre, label: pre, 
                                  title: 'prerequisite: '+pre+(pre in infoById? + ' ' + infoById[pre] : ''), color: "#ffcccb"});
            }
            graph.edges.push({from: pre, to: node, title: 'prerequisite', color: "#ffcccb"});
          });
        }     
      });
      pendingNodes = newPendingNodes;
      isDirect = false;
    }

    isDirect = true;
    pendingNodes = [courseId];
    while (pendingNodes.length>0){
      let newPendingNodes: string[] = [];
      pendingNodes.forEach(node => {
        if (node in nextDict){
          const nexts = nextDict[node];
          nexts.forEach(next => {
            if (!graphNodes.has(next)){
              graphNodes.add(next);
              newPendingNodes.push(next);
              if (isDirect)
                graph.nodes.push({id: next, label: next, shape: 'eclipse', borderWidth: 2, title: 'successor: ' + next + ' ' + infoById[next], color: "#90ee90"});
              else
                graph.nodes.push({id: next, label: next, title: 'successor: ' + next + ' ' + infoById[next], color: "#90ee90"});
            }
            graph.edges.push({from: node, to: next, title: 'successor', color: "#90ee90"});
          });
        }     
      });
      pendingNodes = newPendingNodes;
      isDirect = false;
    }

    return (
        <div className={classes.Container}>
            <div className={classes.Description}>
                {display}
                <div className={classes.BottomBanner} />
            </div>
            <div className={classes.Buttons}>
                <Button color="black" onClick={props.close}>
                    Close
                </Button>
                {!props.selected ? (
                    <Button
                        color="green"
                        onClick={() => closeThenExecute(props.add)}
                    >
                        Add to Cart
                    </Button>
                ) : (
                    <Button
                        color="red"
                        onClick={() => closeThenExecute(props.delete)}
                    >
                        Remove from Cart
                    </Button>
                )}
            </div>
        </div>
    );
}

export default DescriptionPopUp;
