import { apiRoutes } from "../../constants/apiRoutes";
import makeApiCall from "../core/makeApiCall";

const deletePtRecord = async (payload) => {
    try {
        const data = await makeApiCall({url: apiRoutes.deletePtRecord, method: "POST", payload});
        return data;
    } catch(err) {
        throw new Error(err.message)
    }
}


export default deletePtRecord;