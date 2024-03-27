
const useGetCamelCase = () => {
    const getCamelCase = (str) => {
        return str
          .split(" ")
          .map((ele, ind) =>
            ind === 0
              ? ele.toLowerCase()
              : ele.charAt(0).toUpperCase() + ele.slice(1).toLowerCase()
          )
          .join("");
      };
  return {getCamelCase}
}

export default useGetCamelCase;
