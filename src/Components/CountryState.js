import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
  fetchCountryConfirmed,
  fetchCountryDeaths,
  fetchCountryRecovered,
} from "../redux/FetchGlobalData/FetchReducers";
import ConfirmedCase from "./ConfirmedCase";
import DeathCase from "./DeathCase";
import RecoveredCase from "./RecoveredCase";

const CountryState = (props) => {
  const [toggel, settoggel] = useState(false);
  const [confirmed, setconfirmed] = useState([]);
  const [deaths, setdeaths] = useState([]);
  const [recovered, setrecovered] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCountryConfirmed());
    dispatch(fetchCountryDeaths());
    dispatch(fetchCountryRecovered());
    return () => {
      dispatch(fetchCountryConfirmed());
      dispatch(fetchCountryDeaths());
      dispatch(fetchCountryRecovered());
    };
  }, [dispatch]);

  useEffect(() => {
    const totalConfirmed = Object.values(
      props.countryDataConfirmed.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.countryRegion]: {
            countryRegion: cur.countryRegion,
            confirmed:
              cur.confirmed +
              (acc[cur.countryRegion] ? acc[cur.countryRegion].confirmed : 0),
            id: Math.floor(Math.random() * 1000000),
          },
        }),
        {}
      )
    ).sort((a, b) => {
      return b.confirmed - a.confirmed;
    });
    const totalDeaths = Object.values(
      props.countryDataDeaths.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.countryRegion]: {
            countryRegion: cur.countryRegion,
            deaths:
              cur.deaths +
              (acc[cur.countryRegion] ? acc[cur.countryRegion].deaths : 0),
            id: Math.floor(Math.random() * 1000000),
          },
        }),
        {}
      )
    ).sort((a, b) => {
      return b.deaths - a.deaths;
    });
    const totalRecovered = Object.values(
      props.countryDataRecovered.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.countryRegion]: {
            countryRegion: cur.countryRegion,
            recovered:
              cur.recovered +
              (acc[cur.countryRegion] ? acc[cur.countryRegion].recovered : 0),
            id: Math.floor(Math.random() * 1000000),
          },
        }),
        {}
      )
    ).sort((a, b) => {
      return b.confirmed - a.confirmed;
    });

    setconfirmed(totalConfirmed);
    setdeaths(totalDeaths);
    setrecovered(totalRecovered);
    return () => {};
  }, [
    props.countryDataConfirmed,
    props.countryDataDeaths,
    props.countryDataRecovered,
  ]);

  return (
    <>
      <button
        className="btn btn-outline-secondary m-1 mb-2 "
        onClick={() => settoggel(!toggel)}
      >
        {!toggel ? "View Country Wise Report" : "Hide Details"}
      </button>
      {toggel ? (
        <>
          <h4 className="data-header">Data by Country/Region/Sovereignty</h4>
          <div className="flex-container fadeInUp">
            {confirmed.length !== 0 && (
              <>
                <ConfirmedCase caseData={confirmed} />
                <DeathCase caseData={deaths} />
                <RecoveredCase caseData={recovered} />
              </>
            )}
          </div>
        </>
      ) : null}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    countryDataConfirmed: state.countryStateConfirmed.data,
    countryDataDeaths: state.countryStateDeaths.data,
    countryDataRecovered: state.countryStateRecovered.data,
  };
};

export default connect(mapStateToProps, null)(CountryState);
