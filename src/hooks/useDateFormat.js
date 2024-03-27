import moment from "moment/moment";

const useDateFormat = () => {
  const formattedDate = (dataString, need) => {
    const date = moment(dataString).format("DD/MM/YYYY");
    const time = moment(dataString).format("LT");

    const result = (key) => {
      switch (key) {
        case "date":
          return date;
        case "time":
          return time;
        default:
          return `${time} ${date}`;
      }
    };

    return result(need);
  };

  const paginationDateFormat = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };

  const getLongDateFormat = (date) => {
    return moment(date).format("ll");
  };

  const getRoundOffDigit = (value, afterDecimal) => {
    const rounded = Math.round(value * 10) / 10;
    const deciOne = rounded.toFixed(afterDecimal);
    return deciOne;
  };

  return {
    formattedDate,
    paginationDateFormat,
    getRoundOffDigit,
    getLongDateFormat,
  };
};

export default useDateFormat;
