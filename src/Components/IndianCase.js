import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { formatDistance } from "date-fns";
import TodayStatus from "./TodayStatus";
import TotalConfirmedChart from "./Charts/TotalConfirmedChart";
import DailyConfirmedChart from "./Charts/DailyConfirmedChart";
import DeepDive from "./Charts/DeepDive";
import Table from "./Table";
import Loader from "./Loader";
import MapExplorer from "./MapExplorer";
import { MAP_META } from "../Constants";
import TimeSeries from "./TimeSeries";
import {
  formatNumber,
  formatDateIst,
  formatDateAbsolute,
  parseStateTimeseries,
  preprocessTimeseries,
} from "../utils/format";

const IndianCase = (props) => {
  const [fetched, setFetched] = useState(false);

  // Country State - India (Confirmed. Active, Deaths, Recovered)
  const [confirmed, setconfirmed] = useState(null);
  const [deaths, setdeaths] = useState(null);
  const [recovered, setrecovered] = useState(null);
  const [active, setactive] = useState(null);
  const [lastupdate, setlastupdate] = useState(null);

  // Today status (Today - Confirmed, Recovered)
  const [todayCases, settodayCases] = useState(null);
  const [todayRecovered, settodayRecovered] = useState(null);

  // TotalConfirmedChart & DailyConfirmedChart
  const [timeseries, setTimeseries] = useState([]);
  const [timeseries1, setTimeseries1] = useState([]);

  // StatewiseTable (State & Districwise Data)
  const [stateDistrictWiseData, setStateDistrictWiseData] = useState({});
  const [states, setStates] = useState([]);

  // State for Map Explorer
  const [stateTestData, setStateTestData] = useState({});
  const [regionHighlighted, setRegionHighlighted] = useState(undefined);

  //State Daily time-series Data
  const [activeStateCode, setActiveStateCode] = useState("TT"); // TT -> India

  // States for TimeSeries
  const [timeseriesMode, setTimeseriesMode] = useState(true);
  const [timeseriesLogMode, setTimeseriesLogMode] = useState(false);
  const [graphOption, setGraphOption] = useState(1);

  useEffect(() => {
    if (fetched === false) {
      getStates();
    }
  }, [fetched]);

  const getStates = async () => {
    try {
      const [
        { data },
        stateDistrictWiseResponse,
        { data: statesDailyResponse },
        { data: stateTestData },
      ] = await Promise.all([
        axios.get("https://api.covid19india.org/data.json"),
        axios.get("https://api.covid19india.org/state_district_wise.json"),
        axios.get("https://api.covid19india.org/states_daily.json"),
        axios.get("https://api.covid19india.org/state_test_data.json"),
      ]);
      // Country State - India (Confirmed. Active, Deaths, Recovered)
      setconfirmed(formatNumber(data.statewise[0].confirmed));
      setdeaths(formatNumber(data.statewise[0].deaths));
      setrecovered(formatNumber(data.statewise[0].recovered));
      const activeCase =
        parseInt(data.statewise[0].confirmed) -
        (parseInt(data.statewise[0].deaths) +
          parseInt(data.statewise[0].recovered));
      setactive(formatNumber(activeCase));
      setlastupdate(data.statewise[0].lastupdatedtime);

      // Today status (Today - Confirmed, Recovered)
      settodayCases(data.statewise[0].deltaconfirmed);
      settodayRecovered(data.statewise[0].deltarecovered);

      // TotalConfirmedChart & DailyConfirmedChart
      setTimeseries1(data.cases_time_series);

      // StatewiseTable (State & Districwise Data)
      setStates(data.statewise);
      setStateDistrictWiseData(stateDistrictWiseResponse.data);

      // State for MapExplorer
      const testData = stateTestData.states_tested_data.reverse();
      const totalTest = data.tested[data.tested.length - 1];
      testData.push({
        updatedon: totalTest.updatetimestamp.split(" ")[0],
        totaltested: totalTest.totalindividualstested,
        source: totalTest.source,
        state: "Total", // India
      });
      setStateTestData(testData);

      setStates(data.statewise);
      const ts = parseStateTimeseries(statesDailyResponse);
      ts["TT"] = preprocessTimeseries(data.cases_time_series); // TT -> India
      setTimeseries(ts);

      // setStatesTimeSeries(stateDailyResponse.data.states_daily);
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };

  const onHighlightState = (state, index) => {
    if (!state && !index) return setRegionHighlighted(null);
    setRegionHighlighted({ state, index });
  };
  const onHighlightDistrict = (district, state, index) => {
    if (!state && !index && !district) return setRegionHighlighted(null);
    setRegionHighlighted({ district, state, index });
  };

  const onMapHighlightChange = useCallback(({ statecode }) => {
    setActiveStateCode(statecode);
  }, []);

  const refs = [useRef(), useRef(), useRef()];

  return (
    <>
      {!confirmed ? (
        <Loader />
      ) : (
        <>
          <section className="center-text fadeInUp indian-case">
            <div className="global-case ">
              <h2 className="title">Country Case: India</h2>
              <span
                className="data-time"
                style={{ textTransform: "uppercase" }}
              >
                Last Updated: {lastupdate ? formatDateAbsolute(lastupdate) : ""}
                {" - "}
                {lastupdate
                  ? formatDistance(
                      new Date(formatDateIst(lastupdate)),
                      new Date()
                    ) + " Ago"
                  : ""}
              </span>
            </div>
            <div className="data-container">
              <div className="global-data">
                <div>
                  <h4>
                    {window.innerWidth < 485 ? "Confirmed" : "Total Confirmed"}
                  </h4>
                  <h2 style={{ color: "red" }}>{confirmed}</h2>
                </div>
              </div>
              <div className="global-data">
                <div>
                  <h4>Active Cases</h4>
                  <h2 style={{ color: "#17a2b8" }}>{active}</h2>
                </div>
              </div>
              <div className="global-data">
                <div>
                  <h4>Deaths</h4>
                  <h2>{deaths}</h2>
                </div>
              </div>
              <div className="global-data">
                <div>
                  <h4>Recovered</h4>
                  <h2 style={{ color: "green" }}>{recovered}</h2>
                </div>
              </div>
            </div>
            <TodayStatus
              dailyData={[{ todayCases, todayRecovered, lastupdate }]}
            />
            <div className="cards-container">
              <section className="cards">
                <div
                  className="card fadeInUp"
                  style={{ animationDelay: "0.7s" }}
                >
                  <TotalConfirmedChart
                    title="India - Total Cases"
                    timeseries={timeseries1}
                  />
                </div>
                <div
                  className="card fadeInUp"
                  style={{ animationDelay: "0.7s" }}
                >
                  <DailyConfirmedChart
                    title="India - Daily Cases"
                    timeseries={timeseries1}
                  />
                </div>
                <DeepDive />
              </section>
            </div>
          </section>
          <div>
            <Table
              forwardRef={refs[0]}
              states={states}
              summary={false}
              stateDistrictWiseData={stateDistrictWiseData}
              onHighlightState={onHighlightState}
              onHighlightDistrict={onHighlightDistrict}
            />
            {fetched && (
              <div className="mapdata-container">
                <MapExplorer
                  forwardRef={refs[1]}
                  mapMeta={MAP_META.India}
                  states={states}
                  stateDistrictWiseData={stateDistrictWiseData}
                  stateTestData={stateTestData}
                  regionHighlighted={regionHighlighted}
                  onMapHighlightChange={onMapHighlightChange}
                  isCountryLoaded={true}
                />
                <div
                  className="timeseries-header fadeInUp"
                  style={{ animationDelay: "2.5s" }}
                  ref={refs[2]}
                >
                  <h1>Spread Trends</h1>
                  <div className="tabs">
                    <div
                      className={`tab ${graphOption === 1 ? "focused" : ""}`}
                      onClick={() => {
                        setGraphOption(1);
                      }}
                    >
                      <h4>Cumulative</h4>
                    </div>
                    <div
                      className={`tab ${graphOption === 2 ? "focused" : ""}`}
                      onClick={() => {
                        setGraphOption(2);
                      }}
                    >
                      <h4>Daily</h4>
                    </div>
                  </div>
                  <div className="scale-modes">
                    <label className="main">Scale Modes:</label>
                    <div className="timeseries-mode">
                      <label htmlFor="timeseries-mode">Uniform</label>
                      <input
                        id="timeseries-mode"
                        type="checkbox"
                        checked={timeseriesMode}
                        className="switch"
                        aria-label="Checked by default to scale uniformly."
                        onChange={(event) => {
                          setTimeseriesMode(!timeseriesMode);
                        }}
                      />
                    </div>
                    <div
                      className={`timeseries-logmode ${
                        graphOption !== 1 ? "disabled" : ""
                      }`}
                    >
                      <label htmlFor="timeseries-logmode">Logarithmic</label>
                      <input
                        id="timeseries-logmode"
                        type="checkbox"
                        checked={graphOption === 1 && timeseriesLogMode}
                        className="switch"
                        disabled={graphOption !== 1}
                        onChange={(event) => {
                          setTimeseriesLogMode(!timeseriesLogMode);
                        }}
                      />
                    </div>
                  </div>

                  <div className="trends-state-name">
                    <select
                      onChange={({ target }) => {
                        onHighlightState(JSON.parse(target.value));
                      }}
                    >
                      {states.map((s) => {
                        return (
                          <option
                            key={s.statecode}
                            value={JSON.stringify(s)}
                            defaultValue="All States"
                            // selected={s.statecode === activeStateCode}
                          >
                            {s.state === "Total" ? "All States" : s.state}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <TimeSeries
                    timeseries={timeseries[activeStateCode]}
                    type={graphOption}
                    mode={timeseriesMode}
                    logMode={timeseriesLogMode}
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default IndianCase;
