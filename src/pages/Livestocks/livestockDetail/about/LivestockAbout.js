import { Stack } from "@mui/material";
import LivestockBirthDetails from "./LivestockBirthDetails";
import LiveStockInfoEdit from "./LiveStockInfoEdit";
import LivestockDisposalDetails from "./LivestockDisposalDetails";
import { useParams } from "react-router-dom";
import useGetOverviewData from "../overview/hooks/useGetOverviewData";
import { Skeleton } from "../../../../ComponentsV2";
import toast from "react-hot-toast";

const LivestockAbout = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useGetOverviewData(id);

  const getLoader = () => (
    <Skeleton width={"100%"} height={`68vh`} sx={{ background: "#F7F8FD" }} />
  );
  if(error){
    toast.error(error?.message)
  }
  return (
    <Stack
      direction={"row"}
      alignItems={"flex-start"}
      gap={2}
      justifyContent={"space-between"}
      sx={{ pt: 3 }}
    >
      {isLoading ? (
        getLoader()
      ) : (
        <LiveStockInfoEdit livestockInfo={data} infoLoading={isLoading} />
      )}
      {isLoading ? (
        getLoader()
      ) : (
        <LivestockBirthDetails livestockInfo={data} infoLoading={isLoading} />
      )}
      {isLoading ? (
        getLoader()
      ) : (
        <LivestockDisposalDetails
          livestockInfo={data}
          infoLoading={isLoading}
        />
      )}
    </Stack>
  );
};

export default LivestockAbout;
