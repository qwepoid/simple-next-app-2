function getUrl(url): string {
  return `${process.env.NEXT_PUBLIC_BASE_API_URL}${url}`;
}

export const apiRoutes = {
  getEquipments: getUrl("/api/getEquipments"),
  /** Service Request */
  getServiceRequests: getUrl("/sr"),
  createServiceRequest: getUrl("/sr/createServiceRequest"),

  /** Jobs */
  getJobs: getUrl("/job"),
  updateJob: getUrl("/job/update"),

  getDashboardData: getUrl("/api/getDashboardData"),
  signup: getUrl("/users/signup"),
  signin: getUrl("/users/signin"),
  getPtRecords: getUrl("/pt/getRecords"),
};
