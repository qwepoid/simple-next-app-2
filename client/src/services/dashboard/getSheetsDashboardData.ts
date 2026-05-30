import { apiRoutes } from "../../constants/apiRoutes";
import makeApiCall from "../core/makeApiCall";

const getSheetsDashboardData = async () => {
  try {
    return await makeApiCall({ url: apiRoutes.getSheetsDashboardData });
  } catch (err) {
    throw new Error(err.message);
  }
};

export default getSheetsDashboardData;
