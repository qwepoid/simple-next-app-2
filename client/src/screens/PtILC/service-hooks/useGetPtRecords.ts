import { useEffect, useState } from "react"
import getPtRecords from "../../../services/pt/getPtRecords";

const useGetPtRecords = () => {
    console.log('inside pt hook')
    const [data, setData ]= useState(null);
    const [isLoading, setisLoading ]= useState(true);
    const [error, seterror ]= useState(null);

    async function getRecords() {
        try {
            const response = await getPtRecords()
            console.log('response: ',  response)
            setData(response)
        } catch (err) {
            console.log('err: ',  err)
            seterror(err);
        } finally {
            setisLoading(false)
        }
    }

    useEffect(( ) => {
        getRecords()
    }, [])

    return {
        data,
        isLoading,
        error
    }
}

export default useGetPtRecords