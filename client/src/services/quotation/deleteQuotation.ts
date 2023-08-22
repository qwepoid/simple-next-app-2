import { apiRoutes } from "../../constants/apiRoutes";
import makeApiCall from "../core/makeApiCall";

const deleteQuotation = async (payload) => {
    try {
        const data = await makeApiCall({url: apiRoutes.deleteQuotation, method: 'POST', payload})
        return data;
    } catch(err) {
        throw new Error(err.message)
    }
}

export default deleteQuotation;