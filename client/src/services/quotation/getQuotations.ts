import { apiRoutes } from "../../constants/apiRoutes";
import makeApiCall from "../core/makeApiCall";

const getQuotation = async ({id='', searchString=''}: {id: String, searchString: String}) => {
    try {
        const baseRoute = apiRoutes.getQuotations
        const url = id ? `${baseRoute}/${id}` : searchString ? `${baseRoute}?q=${searchString}` : baseRoute 
        const data = await makeApiCall({url})
        return data;
    } catch(err) {
        throw new Error(err.message)
    }
}

export default getQuotation;