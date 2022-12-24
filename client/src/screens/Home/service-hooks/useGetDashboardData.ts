import { useQuery } from "react-query";
import getDashboardData from "../../../services/dashboard/getDashboardData";

const useGetDashboardData = () => {
    const {
        data: dashboardData,
        isError: isDashboardDataError,
        isLoading: isDashboardDataLoading,
    } = useQuery([], getDashboardData, {
        staleTime: 20 * (60 * 1000), 
        cacheTime: 10 * (60 * 1000) 
    });

    return {
        dashboardData,
        isDashboardDataLoading,
        isDashboardDataError, 
    }
}

export default useGetDashboardData;