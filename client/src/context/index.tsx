import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./auth-context/Provider";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const AppProviders = ({ children }: { children: any }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
