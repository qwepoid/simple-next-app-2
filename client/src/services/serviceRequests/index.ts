import { apiRoutes } from "../../constants/apiRoutes";
import makeApiCall from "../core/makeApiCall";

export const getServiceRequestsService = async ({id='', searchString=''}: {id: String, searchString: String}) => {
    try {
        const baseRoute = apiRoutes.getServiceRequests
        const url = id ? `${baseRoute}/${id}` : searchString ? `${baseRoute}?q=${searchString}` : baseRoute 
        const data = await makeApiCall({url})
        return data;
    } catch(err) {
        throw new Error(err.message)
    }
}

export const addServiceRequestService = async (payload) => {
    try {
        const data = await makeApiCall({url: apiRoutes.createServiceRequest, method: 'POST', payload})
        return data;
    } catch(err) {
        throw new Error(err.message)
    }
}