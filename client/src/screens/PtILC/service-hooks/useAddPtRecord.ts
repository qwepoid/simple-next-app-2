import { useState } from "react"
import addPtRecord from "../../../services/pt/addPtRecord";
import { useRouter } from "next/router";
import { applicationRoutes } from "../../../constants/applicationRoutes";

const useAddPtRecord = () => {
    const router = useRouter();
    const [data, setData ]= useState(null);
    const [isLoading, setisLoading ]= useState(true);
    const [error, seterror ]= useState(null);

    async function addRecord(payload) {
        try {
            const response = await addPtRecord(payload)
            if (response.acknowledged) {
                router.replace(applicationRoutes.ptIlc);
            }
            setData(response)
        } catch (err) {
            seterror(err);
        } finally {
            setisLoading(false)
        }
    }

    return {
        data,
        addRecord,
        isLoading,
        error
    }
}

export default useAddPtRecord