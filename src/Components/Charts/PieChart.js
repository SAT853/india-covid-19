import React from "react";
import ReactMinimalPieChart from "react-minimal-pie-chart";

const PieChart = (props) => {
  const confirmed = parseInt(props.confirmed);
  const deaths = parseInt(props.deaths);
  const recovered = parseInt(props.recovered);
  const active = confirmed - (deaths + recovered);
  const data = [
    {
      color: "#f94f4f",
      title: "Confirmed Cases",
      value: confirmed,
    },
    {
      color: "black",
      title: "Total Deaths",
      value: deaths,
    },
    {
      color: "green",
      title: "Recovered",
      value: recovered,
    },
    {
      color: "#17a2b8",
      title: "Active",
      value: active,
    },
  ];
  return (
    <ReactMinimalPieChart
      className="test2"
      animate
      animationDuration={1200}
      animationEasing="ease-out"
      cx={50}
      cy={50}
      data={data}
      label
      labelPosition={60}
      style={{ height: "250px" }}
      labelStyle={{
        fontFamily: "Verdana",
        fontSize: "5px",
      }}
      lengthAngle={360}
      lineWidth={15}
      onClick={undefined}
      onMouseOut={undefined}
      onMouseOver={undefined}
      paddingAngle={20}
      radius={40}
      rounded
      startAngle={0}
      viewBoxSize={[100, 100]}
    />
  );
};

export default PieChart;
