import {Cow} from "../assets";

const useFormattedImage = () => {
  const getLivestockImg = (img) => {
    if (img) {
      const arr = img?.toString()?.split("/");
      const imgUrl = `http://localhost:8085/uploads/${arr[arr?.length - 1]}`;
      return imgUrl;
    }
    return Cow;
  };
  return { getLivestockImg };
};

export default useFormattedImage;
