import { apiRoutes } from "../../constants/apiRoutes";
import makeApiCall from "../core/makeApiCall";

export const updateJobService = async (payload) => {
  try {
    const data = await makeApiCall({
      url: apiRoutes.updateJob,
      method: "POST",
      payload,
    });
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};
