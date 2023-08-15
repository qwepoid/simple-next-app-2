import { useState } from "react";
import createQuotation from "../../../services/quotation/createQuotation";

const useAddNewQuotation = () => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function addNewQuotation(payload) {
        setIsLoading(true);
        try {
            const response = await createQuotation(payload)
            setData(response)
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        data,
        isLoading,
        error,
        addNewQuotation
    }
}

export default useAddNewQuotation