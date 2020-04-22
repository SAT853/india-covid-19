import React from "react";
import { formatNumber } from "../utils/format";

const RecoveredCase = ({ caseData }) => {
  return (
    <section className="data-confirmed">
      <h3>Recovered</h3>
      <ul>
        {caseData.map((data) => {
          return (
            data.recovered !== 0 && (
              <li key={data.id}>
                <p style={{ color: "green" }}>
                  {formatNumber(data.recovered)} <span>Recovered</span>
                </p>
                <span>{data.countryRegion}</span>
              </li>
            )
          );
        })}
      </ul>
    </section>
  );
};

export default RecoveredCase;
