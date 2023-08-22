import { useEffect, useState } from "react";
import getQuotationsService from "../../../services/quotation/getQuotations";

const useGetQuotations = (idRequired = 0) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function getQuotations({id = '', searchString = ''}:{id?: String, searchString?: String}) {
        setIsLoading(true);
        try {
            const response = await getQuotationsService({id, searchString})
            setData(response)
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (idRequired === 0) getQuotations({})
    }, [idRequired])

    return {
        data,
        isLoading,
        error,
        getQuotations
    }

}

export default useGetQuotations;