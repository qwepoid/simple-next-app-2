import { apiRoutes } from "../../constants/apiRoutes";
import makeApiCall from "../core/makeApiCall";

const syncSheetsDashboardData = async () => {
  try {
    return await makeApiCall({
      url: apiRoutes.syncSheetsDashboardData,
      method: "POST",
      payload: { secret: process.env.NEXT_PUBLIC_CRON_SECRET },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export default syncSheetsDashboardData;
