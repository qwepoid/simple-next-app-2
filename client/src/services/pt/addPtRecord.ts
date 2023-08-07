import { apiRoutes } from "../../constants/apiRoutes";
import makeApiCall from "../core/makeApiCall";

const addPtRecord = async (payload) => {
    try {
        const data = await makeApiCall({url: apiRoutes.addPtRecord, method: "POST", payload});
        return data;
    } catch(err) {
        throw new Error(err.message)
    }
}


export default addPtRecord;