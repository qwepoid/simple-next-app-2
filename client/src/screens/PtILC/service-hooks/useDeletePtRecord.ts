import { useState } from "react"
import deletePtRecord from "../../../services/pt/deletePtRecord";

const useDeletePtRecord = () => {
    const [data, setData ]= useState(null);
    const [isLoading, setisLoading ]= useState(true);
    const [error, seterror ]= useState(null);

    async function deleteRecord(payload) {
        try {
            const response = await deletePtRecord(payload)
            setData(response)
        } catch (err) {
            seterror(err);
        } finally {
            setisLoading(false)
        }
    }

    return {
        data,
        deleteRecord,
        isLoading,
        error
    }
}

export default useDeletePtRecord