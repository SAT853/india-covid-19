import React from "react";
import { formatNumber } from "../utils/format";

const DeathCase = ({ caseData }) => {
  return (
    <section className="data-confirmed">
      <h3>Deaths</h3>
      <ul>
        {caseData.map((data) => {
          return (
            data.deaths !== 0 && (
              <li key={data.id}>
                <p style={{ fontWeight: 600 }}>
                  {formatNumber(data.deaths)}{" "}
                  <span style={{ fontWeight: 500 }}>Deaths</span>
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

export default DeathCase;
