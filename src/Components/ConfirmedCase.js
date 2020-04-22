import React from "react";
import { formatNumber } from "../utils/format";
const ConfirmedCase = ({ caseData }) => {
  return (
    <section className="data-confirmed">
      <h3>Total Confirmed</h3>
      <ul>
        {caseData.map((data) => {
          return (
            <li key={data.id}>
              <p className="confirmed">{formatNumber(data.confirmed)}</p>
              <span>{data.countryRegion}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ConfirmedCase;
