import { apiRoutes } from "../../constants/apiRoutes";
import makeApiCall from "../core/makeApiCall";

const getPtRecords = async () => {
    try {
        const data = await makeApiCall({url: apiRoutes.getPtRecords})
        return data;
    } catch(err) {
        throw new Error(err.message)
    }
}

export default getPtRecords;