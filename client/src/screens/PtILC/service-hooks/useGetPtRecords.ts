import { useEffect, useState } from "react"
import getPtRecords from "../../../services/pt/getPtRecords";

const useGetPtRecords = () => {
    const [data, setData ]= useState(null);
    const [isLoading, setisLoading ]= useState(true);
    const [error, seterror ]= useState(null);

    async function getRecords() {
        try {
            const response = await getPtRecords()
            setData(response)
        } catch (err) {
            seterror(err);
        } finally {
            setisLoading(false)
        }
    }

    useEffect(( ) => {
        getRecords()
    }, [])

    function refetchPtRecords() {
        getRecords()
    }

    return {
        data,
        refetchPtRecords,
        isLoading,
        error
    }
}

export default useGetPtRecords