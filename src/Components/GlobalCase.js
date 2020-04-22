import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import { fetchGlobal } from "../redux/FetchGlobalData/FetchReducers";
import PieChart from "./Charts/PieChart";
import {
  formatNumber,
  formatDateIst,
  formatDateAbsolute,
  formatDate,
} from "../utils/format";
import { formatDistance } from "date-fns";
import Loader from "./Loader";
import CountryState from "./CountryState";
const GlobalCase = (props) => {
  const [confirmed, setconfirmed] = useState(null);
  const [deaths, setdeaths] = useState(null);
  const [recovered, setrecovered] = useState(null);
  const [active, setactive] = useState(null);
  const [lastupdate, setlastupdate] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGlobal());

    return () => {
      dispatch(fetchGlobal());
    };
  }, [dispatch]);

  useEffect(() => {
    props.globaldata.map((item) => {
      const activeCase = formatNumber(
        parseInt(item.confirmed) -
          (parseInt(item.recovered) + parseInt(item.deaths))
      );
      return (
        setconfirmed(item.confirmed),
        setdeaths(item.deaths),
        setrecovered(item.recovered),
        setlastupdate(formatDate(item.lastUpdate)),
        setactive(activeCase)
      );
    });
    return () => {};
  }, [props.globaldata]);

  return (
    <>
      {!confirmed ? (
        <Loader />
      ) : (
        <section className="center-text fadeInUp">
          <div className="global-case center-text">
            <h2 className="title">Overall Global Case</h2>
            <span className="data-time" style={{ textTransform: "uppercase" }}>
              Last Updated:{" "}
              {isNaN(Date.parse(formatDateIst(lastupdate)))
                ? ""
                : formatDateAbsolute(lastupdate)}
              {" - "}
              {formatDistance(new Date(formatDateIst(lastupdate)), new Date()) +
                " Ago"}
            </span>
          </div>
          <div className="piechart-container">
            <div className="pie-chart">
              <PieChart
                confirmed={confirmed}
                deaths={deaths}
                recovered={recovered}
              />
              <div className="piechart-info">
                <p className="btn confirmed ">Confirmed</p>
                <p className="btn deaths">Deaths</p>
                <p className="btn recovered">Recovered</p>
                <p className="btn active">Active</p>
              </div>
            </div>
          </div>
          <div className="data-container">
            <div className="global-data confirmed">
              <div>
                <h4>
                  {window.innerWidth < 485 ? "Confirmed" : "Total Confirmed"}
                </h4>
                <h2 style={{ color: "red" }}>{formatNumber(confirmed)}</h2>
              </div>
            </div>
            <div className="global-data">
              <div>
                <h4>Active Cases</h4>
                <h2 style={{ color: "#17a2b8" }}>{active}</h2>
              </div>
            </div>
            <div className="global-data deaths">
              <div>
                <h4> Deaths</h4>
                <h2>{formatNumber(deaths)}</h2>
              </div>
            </div>
            <div className="global-data recovered">
              <div>
                <h4>Recovered</h4>
                <h2 style={{ color: "green" }}>{formatNumber(recovered)}</h2>
              </div>
            </div>
          </div>
          <CountryState />
        </section>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    globaldata: state.globalState.data,
  };
};

export default connect(mapStateToProps, null)(GlobalCase);
