import { apiRoutes } from "../../constants/apiRoutes";

const getDashboardData = async () => {
  const data = await fetch(`${apiRoutes.getDashboardData}`).then((res) =>
    res.json()
  );
  return data;
};

export default getDashboardData;
