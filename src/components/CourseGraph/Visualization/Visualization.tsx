/**
 * 
 * Creates graph visualization
 * Stores graph properties
 * 
 */


import Graph from 'react-graph-vis';
import { GraphInfo } from '../../types/GraphInfo';
import classes from './Visualization.module.css';
import '../../../../node_modules/vis-network/dist/vis-network.min.css'


function Visualization(props: {graph: GraphInfo}) {
    const options = {
      autoResize: false,
      layout: {
        clusterThreshold: 60,
        improvedLayout: true,
        hierarchical: {
          enabled: true,
          levelSeparation: 100,
          direction: 'UD',
          sortMethod: 'directed',
          treeSpacing: 70,
          nodeSpacing: 100,
        }
      },
      edges: {
        width: 1.2,
        smooth: {
          enabled: true,
          type: "diagonalCross",
          roundness: 0.0
        },
        color: {
          hover: 'red',
        }
      },
      nodes: {
        shape: 'circle',
        physics: true,
        color: {
          hover: {
            border: 'red',
          },
        },
      },
      interaction: {
        navigationButtons: true,
        keyboard: {
          enabled: true
        },
        hover: true,
        tooltipDelay: 1
      },
      physics: {
        enabled: true,
        hierarchicalRepulsion: {
          nodeDistance: 120,
          centralGravity: 0.5, 
        },
        stabilization: {
          enabled: true,
          fit: true,
        },
      }
    };

    return (
        <div className={classes.Visualization}>
            <Graph graph={props.graph} options={options} style={{ height: "calc(100vh - 200px)" }} />
        </div>
    );
};

export default Visualization;
