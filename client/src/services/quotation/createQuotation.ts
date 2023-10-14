import { apiRoutes } from "../../constants/apiRoutes";
import makeApiCall from "../core/makeApiCall";

const createQuotation = async (payload) => {
    try {
        const data = await makeApiCall({url: apiRoutes.createQuotation, method: 'POST', payload})
        return data;
    } catch(err) {
        throw new Error(err.message)
    }
}

export default createQuotation;