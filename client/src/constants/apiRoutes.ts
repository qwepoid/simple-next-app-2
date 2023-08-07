function getUrl(url): string {
    return `${process.env.NEXT_PUBLIC_BASE_API_URL}${url}`
}

export const apiRoutes = {
    getEquipments: getUrl('/api/getEquipments'),
    getDashboardData: getUrl('/api/getDashboardData'),
    getTestParameters: getUrl('/scope/getTestParameters'),
    signup: getUrl('/users/signup'),
    signin: getUrl('/users/signin'),
    getPtRecords: getUrl('/pt/getRecords'),
    addPtRecord: getUrl('/pt/addRecord'),
    deletePtRecord: getUrl('/pt/deleteRecord')
}