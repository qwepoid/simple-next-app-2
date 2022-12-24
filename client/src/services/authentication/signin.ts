import { apiRoutes } from "../../constants/apiRoutes";
import makeApiCall from "../core/makeApiCall";

const signin = async (payload) => {
    try {
        const data = await makeApiCall({url: apiRoutes.signin, method: 'POST', payload})
        return data;
    } catch(err) {
        throw new Error(err.message)
    }
}

export default signin;