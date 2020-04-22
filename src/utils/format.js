import { STATE_CODES } from "../Constants";
import moment from "moment";

const months = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
};

export const getStateName = (code) => {
  return STATE_CODES[code.toUpperCase()];
};

// Formate Date
export const formatDate = (dateString) => {
  const dt = new Date(dateString);
  return `${dt.getDate().toString().padStart(2, "0")}/${(dt.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${dt
    .getFullYear()
    .toString()
    .padStart(4, "0")} ${dt
    .getHours()
    .toString()
    .padStart(2, "0")}:${dt
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${dt.getSeconds().toString().padStart(2, "0")}`;
};

export const formatDateIst = (unformattedDate) => {
  const day = unformattedDate.slice(0, 2);
  const month = unformattedDate.slice(3, 5);
  const year = unformattedDate.slice(6, 10);
  const time = unformattedDate.slice(11);
  return `${year}-${month}-${day}T${time}+05:30`;
};

export const formatDateAbsolute = (unformattedDate) => {
  const day = unformattedDate.slice(0, 2);
  const month = unformattedDate.slice(3, 5);
  const time = unformattedDate.slice(11);
  return `${day} ${months[month]}, ${time.slice(0, 5)} IST`;
};

const validateCTS = (data = []) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dataTypes = [
    "dailyconfirmed",
    "dailydeceased",
    "dailyrecovered",
    "totalconfirmed",
    "totaldeceased",
    "totalrecovered",
  ];
  return data
    .filter((d) => dataTypes.every((dt) => d[dt]) && d.date)
    .filter((d) => dataTypes.every((dt) => Number(d[dt]) >= 0))
    .filter((d) => {
      const year = today.getFullYear();
      return new Date(d.date + year) < today;
    });
};

export const preprocessTimeseries = (timeseries) => {
  return validateCTS(timeseries).map((stat, index) => ({
    date: new Date(stat.date + " 2020"),
    totalconfirmed: +stat.totalconfirmed,
    totalrecovered: +stat.totalrecovered,
    totaldeceased: +stat.totaldeceased,
    dailyconfirmed: +stat.dailyconfirmed,
    dailyrecovered: +stat.dailyrecovered,
    dailydeceased: +stat.dailydeceased,
    // Active = Confimed - Recovered - Deceased
    totalactive:
      +stat.totalconfirmed - +stat.totalrecovered - +stat.totaldeceased,
    dailyactive:
      +stat.dailyconfirmed - +stat.dailyrecovered - +stat.dailydeceased,
  }));
};

/**
 * Returns the last `days` entries
 * @param {Array<Object>} timeseries
 * @param {number} days
 *
 * @return {Array<Object>}
 */

export function sliceTimeseriesFromEnd(timeseries, days) {
  return timeseries.slice(-days);
}

// Formate Number
export const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const formatNumberSat = (value) => {
  const numberFormatter = new Intl.NumberFormat("en-IN");
  return isNaN(value) ? "-" : numberFormatter.format(value);
};

export const parseStateTimeseries = ({ states_daily: data }) => {
  const statewiseSeries = Object.keys(STATE_CODES).reduce((a, c) => {
    a[c] = [];
    return a;
  }, {});

  const today = moment();
  for (let i = 0; i < data.length; i += 3) {
    const date = moment(data[i].date, "DD-MMM-YY");
    // Skip data from the current day
    if (date.isBefore(today, "Date")) {
      Object.entries(statewiseSeries).forEach(([k, v]) => {
        const stateCode = k.toLowerCase();
        const prev = v[v.length - 1] || {};
        // Parser
        const dailyconfirmed = +data[i][stateCode] || 0;
        const dailyrecovered = +data[i + 1][stateCode] || 0;
        const dailydeceased = +data[i + 2][stateCode] || 0;
        const totalconfirmed = +data[i][stateCode] + (prev.totalconfirmed || 0);
        const totalrecovered =
          +data[i + 1][stateCode] + (prev.totalrecovered || 0);
        const totaldeceased =
          +data[i + 2][stateCode] + (prev.totaldeceased || 0);
        // Push
        v.push({
          date: date.toDate(),
          dailyconfirmed: dailyconfirmed,
          dailyrecovered: dailyrecovered,
          dailydeceased: dailydeceased,
          totalconfirmed: totalconfirmed,
          totalrecovered: totalrecovered,
          totaldeceased: totaldeceased,
          // Active = Confimed - Recovered - Deceased
          totalactive: totalconfirmed - totalrecovered - totaldeceased,
          dailyactive: dailyconfirmed - dailyrecovered - dailydeceased,
        });
      });
    }
  }

  return statewiseSeries;
};

// Merged duplicate object with same id-value inside an array
export const getCurrentStats = (confirmed, deaths, recovered) => {
  // [confirmed, deaths, recovered].includes().replace(",", "");
  confirmed.replace(",", "");
  deaths.replace(",", "");
  recovered.replace(",", "");
  const active = confirmed - (deaths - recovered);
  return [
    {
      color: "#ffc107",
      title: "Confirmed Cases",
      value: confirmed,
    },
    {
      color: "#dc3545",
      title: "Deaths",
      value: deaths,
    },
    {
      color: "#6c757d",
      title: "cured",
      value: recovered,
    },
    {
      color: "#17a2b8",
      title: "active",
      value: active,
    },
  ];
};
