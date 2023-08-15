import { apiRoutes } from "../../constants/apiRoutes";
import makeApiCall from "../core/makeApiCall";

const getQuotation = async () => {
    try {
        const data = await makeApiCall({url: apiRoutes.getQuotations})
        return data;
    } catch(err) {
        throw new Error(err.message)
    }
}

export default getQuotation;