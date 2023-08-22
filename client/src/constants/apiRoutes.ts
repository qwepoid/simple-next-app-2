function getUrl(url): string {
    return `${process.env.NEXT_PUBLIC_BASE_API_URL}${url}`
}

export const apiRoutes = {
    getEquipments: getUrl('/api/getEquipments'),
    getDashboardData: getUrl('/api/getDashboardData'),
    signup: getUrl('/users/signup'),
    signin: getUrl('/users/signin'),
    getPtRecords: getUrl('/pt/getRecords'),

    /** Quotations */
    getQuotations: getUrl('/quotation'),
    createQuotation: getUrl('/quotation/create'),
    updateQuotation: getUrl('/quotation/update'),
    deleteQuotation: getUrl('/quotation/delete'),
    createQuotationPdf: getUrl('/pdf/createQuotation')
}