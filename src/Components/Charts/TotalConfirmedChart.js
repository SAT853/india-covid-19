import React from "react";
import { Line, defaults } from "react-chartjs-2";
import moment from "moment";

const TotalConfirmedChart = (props) => {
  const dates = [];
  const confirmed = [];
  const recovered = [];
  const deceased = [];

  defaults.global.elements.line.fill = false;
  defaults.global.defaultFontFamily = "Baloo Tamma 2";
  defaults.global.tooltips.intersect = false;
  defaults.global.tooltips.mode = "nearest";
  defaults.global.tooltips.position = "average";
  defaults.global.tooltips.backgroundColor = "rgba(255, 255, 255, 0.6)";
  defaults.global.tooltips.displayColors = false;
  defaults.global.tooltips.borderColor = "#c62828";
  defaults.global.tooltips.borderWidth = 1;
  defaults.global.tooltips.titleFontColor = "#000";
  defaults.global.tooltips.bodyFontColor = "#000";
  defaults.global.tooltips.caretPadding = 4;
  defaults.global.tooltips.intersect = false;
  defaults.global.tooltips.mode = "nearest";
  defaults.global.tooltips.position = "nearest";
  defaults.global.legend.display = true;
  defaults.global.legend.position = "bottom";

  defaults.global.hover.intersect = false;

  if (!props.timeseries || props.timeseries.length === 0) {
    return <div></div>;
  }

  props.timeseries.forEach((data, index) => {
    if (index >= 31) {
      dates.push(moment(data.date.trim(), "DD MMM"));
      confirmed.push(data.totalconfirmed);
      recovered.push(data.totalrecovered);
      deceased.push(data.totaldeceased);
    }
  });

  const dataset = {
    labels: dates,
    datasets: [
      {
        borderWidth: 2,
        data: confirmed,
        borderCapStyle: "round",
        pointBackgroundColor: "rgba(249, 79, 79, 1.2)",
        label: "Confirmed",
        borderColor: "rgba(249, 79, 79, 1.2)",
        pointHoverRadius: 4,
      },
      {
        borderWidth: 2,
        data: recovered,
        borderCapStyle: "round",
        pointBackgroundColor: "green",
        label: "Recovered",
        borderColor: "green",
        pointHoverRadius: 4,
      },
      {
        borderWidth: 2,
        data: deceased,
        borderCapStyle: "round",
        pointBackgroundColor: "black",
        label: "Deaths",
        borderColor: "black",
        pointHoverRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    events: [
      "click",
      "mousemove",
      "mouseout",
      "touchstart",
      "touchmove",
      "touchend",
    ],
    maintainAspectRatio: false,
    legend: {
      display: true,
      labels: {
        usePointStyle: true,
        generateLabels: (chart) => {
          const labels = defaults.global.legend.labels.generateLabels(chart);
          labels.forEach((label) => {
            label.pointStyle = "rectRounded";
          });
          return labels;
        },
      },
    },
    tooltips: {
      mode: "index",
    },
    elements: {
      point: {
        radius: 1,
      },
      line: {
        tension: 0.2,
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 0,
        bottom: 10,
      },
    },
    scales: {
      yAxes: [
        {
          type: "linear",
          ticks: {
            beginAtZero: true,
            max: undefined,
            precision: 0,
          },
          scaleLabel: {
            display: false,
            labelString: "Total Cases",
          },
        },
      ],
      xAxes: [
        {
          type: "time",
          time: {
            unit: "day",
            tooltipFormat: "MMM DD",
            stepSize: 1,
            displayFormats: {
              millisecond: "MMM DD",
              second: "MMM DD",
              minute: "MMM DD",
              hour: "MMM DD",
              day: "MMM DD",
              week: "MMM DD",
              month: "MMM DD",
              quarter: "MMM DD",
              year: "MMM DD",
            },
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
        },
      ],
    },
  };

  if (props.mode) {
    options.scales.yAxes = [
      {
        type: "logarithmic",
        ticks: {
          min: 0,
          max: 10000,
          callback: function (value, index, values) {
            if (value === 10000) return "10000";
            if (value === 2000) return "2500";
            if (value === 500) return "500";
            if (value === 100) return "100";
            if (value === 20) return "25";
            if (value === 5) return "5";
            if (value === 0) return "0";
            return null;
          },
        },
        scaleLabel: {
          display: false,
          labelString: "Total Cases",
        },
      },
    ];
  }

  return (
    <div className="charts-header">
      <div className="chart-title">{props.title}</div>
      <div className="chart-content">
        <Line data={dataset} options={options} />
      </div>
    </div>
  );
};

export default TotalConfirmedChart;
