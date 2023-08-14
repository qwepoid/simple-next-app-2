export type QuotationItemError = {
    testDescription: string,
    quantity: string,
    unit: string,
    rate: string,
}
export type FormikErrors = {
    quotationTo: string,
    subject: string,
    dateOfQuotation: string,
    quotationItems: QuotationItemError[]
}