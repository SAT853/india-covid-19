import React, { useState, useEffect } from "react";
import axios from "axios";
import GenderChart from "./GenderChart";
import AgeChart from "./AgeChart";

const DeepDive = (props) => {
  const [fetched, setFetched] = useState(false);
  const [rawData, setRawData] = useState([]);

  useEffect(() => {
    if (fetched === false) {
      getStates();
    }
  }, [fetched]);

  const getStates = async () => {
    try {
      const [rawDataResponse] = await Promise.all([
        axios.get("https://api.covid19india.org/raw_data.json"),
      ]);

      setRawData(rawDataResponse.data.raw_data);
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="card fadeInUp" style={{ animationDelay: "0.7s" }}>
        <GenderChart title="Patient Gender" data={rawData} />
      </div>
      <div className="card fadeInUp" style={{ animationDelay: "0.7s" }}>
        <AgeChart title="Patient Age" data={rawData} />
      </div>
    </>
  );
};

export default DeepDive;
