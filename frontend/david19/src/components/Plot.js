import React from 'react';
import Chart from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

import './Plot.css';

const state = {
  labels: ['January', 'February', 'March',
           'April', 'May'],
  datasets: [
    {
      label: 'Rainfall',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    }
  ]
}

class Plot extends React.Component {
  chartRef = React.createRef();

  componentDidMount() {
    // get the data, set the state
  }

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");

    const annos = {
      annotations: [{
        drawTime: "beforeDatasetsDraw",
        type: "box",
        xScaleID: "x-axis-0",
        yScaleID: "y-axis-0",
        xMin: "February",
        xMax: "April",
        yMin: "60",
        yMax: "75",
        backgroundColor: "rgba(101, 33, 171, 0.5)",
        borderColor: "rgb(101, 33, 171)",
        borderWidth: 1,
        onClick: function(e) {
          console.log("Box", e.type, this);
        }
      }],
    };

    new Chart(myChartRef, {
      type: "line",
      data: state,
      options: {
        title: {
          display:true,
          text:'Average Rainfall per month',
          fontSize:20
        },
        legend: {
          display:true,
          position:'right'
        },
        annotation: annos,
        maintainAspectRatio: false,
      }
    });
  }

  render() {
    return (
      <div className="plot-container">
        <canvas
          id="myChart"
          ref={this.chartRef}
        />
      </div>
    );
  }
}

export default Plot;