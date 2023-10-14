import { apiRoutes } from "../../constants/apiRoutes";
import makeApiCall from "../core/makeApiCall";

const getJobs = async ({
  id = "",
  searchString = "",
}: {
  id: String;
  searchString: String;
}) => {
  try {
    const baseRoute = apiRoutes.getJobs;
    const url = id
      ? `${baseRoute}/${id}`
      : searchString
      ? `${baseRoute}?q=${searchString}`
      : baseRoute;
    const data = await makeApiCall({ url });
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};
export default getJobs;
