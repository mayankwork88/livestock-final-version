export const getTabText = (title, dataLength) => {
  return `Showing ${(dataLength > 10 ? 10 : dataLength) || 0} out of ${
    dataLength || 0
  } ${title}`;
};


let timeout;
export const handleSearchQuery = (query, setter) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => setter(query), 1000);
};

export function ordinalNumber(i) {
  let j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return i + "st";
  }
  if (j === 2 && k !== 12) {
    return i + "nd";
  }
  if (j === 3 && k !== 13) {
    return i + "rd";
  }
  return i + "th";
}


export const getCapitalize = (str) => {
  if (str?.toLowerCase() === "n/a" || !str) {
    return "N/A";
  }
  return (
    str?.toString()?.[0]?.toUpperCase() +
    str?.toString()?.slice(1)?.toLowerCase()
  );
};
