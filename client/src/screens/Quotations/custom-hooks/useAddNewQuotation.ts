import { useState } from "react";
import { createQuotationService, updateQuotationService, deleteQuotationService } from "../../../services/quotation";

const useAddNewQuotation = () => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function addNewQuotation(payload) {
        setIsLoading(true);
        try {
            const response = await createQuotationService(payload)
            setData(response)
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }

    async function updateQuotation(payload) {
        setIsLoading(true);
        try {
            const response = await updateQuotationService(payload)
            setData(response)
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteQuotation(quotationId) {
        setIsLoading(true);
        try {
            const response = await deleteQuotationService(quotationId)
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
        addNewQuotation,
        updateQuotation,
        deleteQuotation
    }
}

export default useAddNewQuotation