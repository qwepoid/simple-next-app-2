import { useContext } from "react"
import AuthContext from "../../context/auth-context/AuthContext"

const makeApiCall = async ({url, payload, method='GET'}: {url: string, payload?: any, method?: any}) => {
    // const { username }= useContext(AuthContext)
    // const headers = prepareHeaders()
    const data = await fetch(url, {
        method,
        body: payload ? JSON.stringify(payload) : undefined,
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer `
        }
    })
    if (!data.ok) {
        const error = await data.json()
        throw new Error(error.message)
    }
    const successData = await data.json();
    return successData;
}

export default makeApiCall;