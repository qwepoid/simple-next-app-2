import { apiRoutes } from "../../constants/apiRoutes";
import makeApiCall from "../core/makeApiCall";

const signup = async (payload) => {
    try {
        const data = await makeApiCall({url: apiRoutes.signup, method: 'POST', payload})
        return data;
    } catch(err) {
        throw new Error(err.message)
    }
}

export default signup;