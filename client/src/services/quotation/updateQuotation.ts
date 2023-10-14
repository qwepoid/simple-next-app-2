import { apiRoutes } from "../../constants/apiRoutes";
import makeApiCall from "../core/makeApiCall";

const updateQuotation = async (payload) => {
    try {
        const data = await makeApiCall({url: apiRoutes.updateQuotation, method: 'POST', payload})
        return data;
    } catch(err) {
        throw new Error(err.message)
    }
}

export default updateQuotation;