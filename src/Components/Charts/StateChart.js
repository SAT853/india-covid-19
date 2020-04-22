import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const initialState = {
  series: [
    {
      name: "Total Confirmed Case - India",
      data: [],
    },
  ],
  options: {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Total Confirmed State wise",
      align: "center",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [],
    },
  },
};

const StateChart = (props) => {
  const [state, setstate] = useState(initialState);
  const [chart, setchart] = useState(false);

  useEffect(() => {
    const state = props.data
      .filter((item) => item.confirmed !== "0")
      .map((item) => item.state);

    const confirmed = props.data
      .filter((item) => item.confirmed !== "0")
      .map((item) => parseInt(item.confirmed));

    setstate({
      ...state,
      series: [
        {
          name: "Total Confirmed Case",
          data: confirmed,
        },
      ],
      options: {
        chart: {
          height: 450,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        markers: {
          size: 4,
          colors: undefined,
          strokeColors: "#fff",
          strokeWidth: 2,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          discrete: [],
          shape: "circle",
          radius: 2,
          offsetX: 0,
          offsetY: 0,
          onClick: undefined,
          onDblClick: undefined,
          showNullDataPoints: true,
          hover: {
            size: undefined,
            sizeOffset: 3,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "state wise confirmed cases",
          align: "center",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: state,
        },
      },
    });
    setchart(true);
    return () => {};
  }, [props.data]);

  return (
    chart && (
      <div id="chart">
        <Chart
          options={state.options}
          series={state.series}
          type="line"
          height={350}
          className="barchart"
        />
      </div>
    )
  );
};

export default StateChart;
