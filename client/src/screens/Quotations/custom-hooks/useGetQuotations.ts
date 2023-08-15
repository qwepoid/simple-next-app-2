import { useEffect, useState } from "react";
import getQuotationsService from "../../../services/quotation/getQuotations";

const useGetQuotations = () => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function getQuotations() {
        setIsLoading(true);
        try {
            const response = await getQuotationsService()
            setData(response)
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getQuotations()
    }, [])

    return {
        data,
        isLoading,
        error
    }

}

export default useGetQuotations;