export const prepareHeaders = (method) => {
    // const base = {}
    return  {
        'Content-Type': 'application/json',
        'Authorization': `Bearer `
    }
}