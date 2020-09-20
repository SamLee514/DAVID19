import React from 'react';
import Chart from 'chart.js';
// import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

import './Plot.css';

// the colors corresponding to sentiment scores of 0 and 1, respectively
const color_0 = [224, 254, 219];
const color_1 = [29, 202, 0];
function gradColor(x) {
  // returns the rgba css color string for a sentiment score of x in [0,1.0]
  let r = (1-x)*color_0[0] + x*color_1[0];
  let g = (1-x)*color_0[1] + x*color_1[1];
  let b = (1-x)*color_0[2] + x*color_1[2];
  return 'rgba('+r+','+g+','+b+')';
};

class Plot extends React.Component {
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext('2d');

    // obtain the data somehow
    const data = {
      // the labels would be days of the week
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'Rainfall',
          fill: false,
          lineTension: 0,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          // data[i] is the y-value for x-value labels[i]
          data: [65, 59, 80, 81, 56],
        }
      ]
    };

    // get the data, set the state
    // mood_data[i] is the mood for x-value labels[i]
    let mood_data = [1.0, 0.5, 0.0, 0.3, null];

    // boxes are defined for the day, i.e. the mood of the current day is not displayed
    // I assume mood_data.length = data.length, so make sure to pad mood_data with a dummy value for the most recent day (eg null above)
    let mood_boxes = mood_data.slice(0, mood_data.length - 1).map((mood_val, i) => (
      {
        drawTime: "beforeDatasetsDraw",
        type: 'box',
        xScaleID: 'x-axis-0',
        yScaleID: 'y-axis-0',
        xMin: data.labels[i],
        xMax: data.labels[i+1],
        // omitted yMin/yMax causes the box to fill vertical
        backgroundColor: gradColor(mood_val),
        onClick: function(e) {
          console.log("Box", e.type, this);
        }
      }
    ));

    let plot = new Chart(myChartRef, {
      type: 'line',
      data: data,
      options: {
        title: {
          display: true,
          text: 'Average Rainfall per month',
          fontSize: 20,
        },
        legend: {
          display: true,
          position: 'right'
        },
        annotation: {
          annotations: mood_boxes,
        },
        maintainAspectRatio: false,
      }
    });
  }

  render() {
    return (
      <div className="plot-container">
        <canvas
          id = "myChart"
          ref = {this.chartRef}
        />
      </div>
    );
  }
};

export default Plot;