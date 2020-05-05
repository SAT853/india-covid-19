import React, { useState, useEffect, useCallback } from "react";
import * as Icon from "react-feather";
import {
  formatDateIst,
  formatDateAbsolute,
  formatNumberSat,
} from "../utils/format";
import { formatDistance } from "date-fns";
import { Badge } from "react-bootstrap";

const Row = (props) => {
  const [state, setState] = useState(props.state);
  const [districts, setDistricts] = useState(props.districts);
  const [sortedDistricts, setSortedDistricts] = useState(props.districts);
  const [sortData, setSortData] = useState({
    sortColumn: localStorage.getItem("district.sortColumn")
      ? localStorage.getItem("district.sortColumn")
      : "confirmed",
    isAscending: localStorage.getItem("district.isAscending")
      ? localStorage.getItem("district.isAscending") === "true"
      : false,
  });

  useEffect(() => {
    setState(props.state);
  }, [props.state]);

  useEffect(() => {
    setDistricts(props.districts);
    setSortedDistricts(props.districts);
  }, [props.districts]);

  const handleReveal = () => {
    props.handleReveal(props.state.state);
  };

  const sortDistricts = useCallback(
    (aDistricts) => {
      const sorted = {};
      if (aDistricts) {
        Object.keys(aDistricts)
          .sort((district1, district2) => {
            const sortColumn = sortData.sortColumn;
            const value1 =
              sortColumn === "district"
                ? district1
                : parseInt(aDistricts[district1].confirmed);
            const value2 =
              sortColumn === "district"
                ? district2
                : parseInt(aDistricts[district2].confirmed);
            const comparisonValue =
              value1 > value2
                ? 1
                : value1 === value2 && district1 > district2
                ? 1
                : -1;
            return sortData.isAscending
              ? comparisonValue
              : comparisonValue * -1;
          })
          .forEach((key) => {
            sorted[key] = aDistricts[key];
          });
        setSortedDistricts(sorted);
      }
    },
    [sortData.isAscending, sortData.sortColumn]
  );

  const handleSort = (column) => {
    const isAscending =
      sortData.sortColumn === column
        ? !sortData.isAscending
        : sortData.sortColumn === "district";
    setSortData({
      sortColumn: column,
      isAscending: isAscending,
    });
    localStorage.setItem("district.sortColumn", column);
    localStorage.setItem("district.isAscending", isAscending);
  };

  useEffect(() => {
    sortDistricts(districts);
  }, [districts, sortData, sortDistricts]);

  return (
    <React.Fragment>
      <tr
        className={props.total ? "state is-total" : "state"}
        onMouseEnter={() => props.onHighlightState?.(state, props.index)}
        onMouseLeave={() => props.onHighlightState?.()}
        onClick={!props.total ? handleReveal : null}
        style={{ background: props.index % 2 === 0 ? "#f8f9fa" : "" }}
      >
        <td style={{ fontWeight: 600 }}>
          <div className="table__title-wrapper">
            <span
              className={`dropdown ${
                props.reveal ? "rotateRightDown" : "rotateDownRight"
              }`}
              style={{ display: !props.total ? "" : "none" }}
              onClick={() => {
                handleReveal();
              }}
            >
              <Icon.ChevronDown />
            </span>
            {state.state}
          </div>
        </td>
        <td>
          <span className="deltas" style={{ color: "#ff073a" }}>
            {state.deltaconfirmed > 0 && <Icon.ArrowUp />}
            {state.deltaconfirmed > 0 ? `${state.deltaconfirmed}` : ""}
          </span>
          <span className="table__count-text">
            {parseInt(state.confirmed) === 0 ? (
              "-"
            ) : (
              <Badge variant="warning">
                {formatNumberSat(state.confirmed)}
              </Badge>
            )}
          </span>
        </td>
        <td
          style={{
            color: parseInt(state.active) === 0 ? "#B5B5B5" : "inherit",
          }}
        >
          {/* <span className="deltas" style={{color: '#007bff'}}>
            {!state.delta.active==0 && <Icon.ArrowUp/>}
            {state.delta.active>0 ? `${state.delta.active}` : ''}
          </span>*/}
          {parseInt(state.active) === 0 ? (
            "-"
          ) : (
            <Badge variant="success">{formatNumberSat(state.active)}</Badge>
          )}
        </td>
        <td
          style={{
            color: parseInt(state.recovered) === 0 ? "#B5B5B5" : "inherit",
          }}
        >
          <span className="deltas" style={{ color: "#28a745" }}>
            {state.deltarecovered > 0 && <Icon.ArrowUp />}
            {state.deltarecovered > 0 ? `${state.deltarecovered}` : ""}
          </span>
          <span className="table__count-text">
            {parseInt(state.recovered) === 0 ? (
              "-"
            ) : (
              <Badge variant="dark">{formatNumberSat(state.recovered)}</Badge>
            )}
          </span>
        </td>
        <td
          style={{
            color: parseInt(state.deaths) === 0 ? "black" : "inherit",
          }}
        >
          <span className="deltas" style={{ color: "black" }}>
            {state.deltadeaths > 0 && <Icon.ArrowUp />}
            {state.deltadeaths > 0 ? `${state.deltadeaths}` : ""}
          </span>
          <span className="table__count-text" style={{ color: "black" }}>
            {parseInt(state.deaths) === 0 ? (
              "-"
            ) : (
              <Badge variant="danger"> {formatNumberSat(state.deaths)}</Badge>
            )}
          </span>
        </td>
      </tr>

      <tr
        className={"state-last-update"}
        style={{ display: props.reveal && !props.total ? "" : "none" }}
      >
        <td colSpan={4}>
          <div className="last-update">
            <h6>Last updated&nbsp;</h6>
            <h6
              title={
                isNaN(Date.parse(formatDateIst(props.state.lastupdatedtime)))
                  ? ""
                  : formatDateAbsolute(props.state.lastupdatedtime)
              }
            >
              {isNaN(Date.parse(formatDateIst(props.state.lastupdatedtime)))
                ? ""
                : `${formatDistance(
                    new Date(formatDateIst(props.state.lastupdatedtime)),
                    new Date()
                  )} ago`}
            </h6>
          </div>
        </td>
      </tr>

      <tr
        className={`district-heading`}
        style={{ display: props.reveal && !props.total ? "" : "none" }}
      >
        <td onClick={(e) => handleSort("district")}>
          <div className="heading-content">
            <abbr title="District">District</abbr>
            <div
              style={{
                display:
                  sortData.sortColumn === "district" ? "initial" : "none",
              }}
            >
              {sortData.isAscending ? (
                <div className="arrow-up" />
              ) : (
                <div className="arrow-down" />
              )}
            </div>
          </div>
        </td>
        <td onClick={(e) => handleSort("confirmed")}>
          <div className="heading-content">
            <abbr
              className={`${window.innerWidth <= 769 ? "is-cherry" : ""}`}
              title="Confirmed"
            >
              {window.innerWidth <= 769
                ? window.innerWidth <= 375
                  ? "C"
                  : "Cnfmd"
                : "Confirmed"}
            </abbr>
            <div
              style={{
                display:
                  sortData.sortColumn === "confirmed" ? "initial" : "none",
              }}
            >
              {sortData.isAscending ? (
                <div className="arrow-up" />
              ) : (
                <div className="arrow-down" />
              )}
            </div>
          </div>
        </td>
        <td>
          <div className="heading-content">
            <abbr
              className={`${window.innerWidth <= 769 ? "is-cherry" : ""}`}
              title="Active"
            >
              {window.innerWidth <= 375 ? "Act" : "Active"}
            </abbr>
          </div>
        </td>
        <td>
          <div className="heading-content">
            <abbr
              className={`${window.innerWidth <= 769 ? "is-cherry" : ""}`}
              title="Recovered"
            >
          {window.innerWidth <= 769
                          ? window.innerWidth <= 375
                            ? "R"
                            : "Rcvrd"
                          : "Recovered"}
            </abbr>
          </div>
        </td>
        <td>
          <div className="heading-content">
            <abbr
              className={`${window.innerWidth <= 769 ? "is-cherry" : ""}`}
              title="Deaths"
            >
              Deaths
            </abbr>
          </div>
        </td>
      </tr>

      

      {sortedDistricts &&
        Object.keys(sortedDistricts)
          .filter((district) => district.toLowerCase() !== "unknown")
          .map((district, index) => {
            if (district.toLowerCase() !== "unknown") {
              return (
              
                <tr
                  key={index}
                  className={`district district-data`}
                  style={{
                    display: props.reveal && !props.total ? "" : "none",
                    background: index % 2 === 0 ? "#f8f9fa" : "",
                  }}
                >
                  <td>{district}</td>
                  <td>
                    <span className="deltas" style={{ color: "#ff073a" }}>
                      {sortedDistricts[district].delta.confirmed > 0 && (
                        <Icon.ArrowUp />
                      )}
                      {sortedDistricts[district].delta.confirmed > 0
                        ? `${sortedDistricts[district].delta.confirmed}`
                        : ""}
                    </span>

                    <span className="table__count-text">
                      {formatNumberSat(sortedDistricts[district].confirmed)}
                    </span>
                  </td>
                  <td>
                    <span className="deltas" style={{ color: "17A2BB" }}>
                      {sortedDistricts[district].delta.active > 0 && (
                        <Icon.ArrowUp />
                      )}
                      {sortedDistricts[district].delta.active > 0
                        ? `${sortedDistricts[district].delta.active}`
                        : ""}
                    </span>
                    <span className="table__count-text">
                      {formatNumberSat(sortedDistricts[district].active)}
                    </span>
                  </td>
                  <td>
                    <span className="deltas" style={{ color: "rgb(40, 167, 69)" }}>
                      {sortedDistricts[district].delta.recovered > 0 && (
                        <Icon.ArrowUp />
                      )}
                      {sortedDistricts[district].delta.recovered > 0
                        ? `${sortedDistricts[district].delta.recovered}`
                        : ""}
                    </span>
                    <span className="table__count-text">
                      {formatNumberSat(sortedDistricts[district].recovered)}
                    </span>
                  </td>
                  <td>
                    <span className="deltas" style={{ color: "black" }}>
                      {sortedDistricts[district].delta.deceased > 0 && (
                        <Icon.ArrowUp />
                      )}
                      {sortedDistricts[district].delta.deceased > 0
                        ? `${sortedDistricts[district].delta.deceased}`
                        : ""}
                    </span>
                    <span className="table__count-text">
                      {formatNumberSat(sortedDistricts[district].deceased)}
                    </span>
                  </td>
                </tr>
               
               
              );
            }
            return null;
          })}

      {sortedDistricts?.Unknown && (
        <React.Fragment>
          <tr
            className={`district`}
            style={{ display: props.reveal && !props.total ? "" : "none" }}
          >
            <td style={{ fontWeight: 600 }}>
              Unknown{" "}
              <span style={{ fontSize: "0.75rem", color: "#201aa299" }}>#</span>
            </td>
            <td>
              <span className="deltas" style={{ color: "#ff073a" }}>
                {sortedDistricts["Unknown"].delta.confirmed > 0 && (
                  <Icon.ArrowUp />
                )}
                {sortedDistricts["Unknown"].delta.confirmed > 0
                  ? `${sortedDistricts["Unknown"].delta.confirmed}`
                  : ""}
              </span>
              <span className="table__count-text">
                {formatNumberSat(sortedDistricts["Unknown"].confirmed)}
              </span>
            </td>
          </tr>
        </React.Fragment>
      )}
            <tr
        className={"state-last-update"}
        style={{ display: props.reveal && !props.total ? "" : "none" }}
      >
        <td colSpan={5}>
          <div className="last-update">
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default Row;
