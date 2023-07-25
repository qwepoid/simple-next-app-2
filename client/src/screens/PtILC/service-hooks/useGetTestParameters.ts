import { useEffect, useState } from "react"
import getTestParameters from "../../../services/scope/getTestParameters";

const useGetTestParameters = () => {
    const [data, setData ]= useState(null);
    const [isLoading, setisLoading ]= useState(true);
    const [error, seterror ]= useState(null);

    async function getRecords(material) {
        try {
            const response = await getTestParameters(material)
            console.log('response: ',  response)
            setData(response)
        } catch (err) {
            console.log('err: ',  err)
            seterror(err);
        } finally {
            setisLoading(false)
        }
    }
    return {
        data,
        getRecords,
        isLoading,
        error
    }
}

export default useGetTestParameters