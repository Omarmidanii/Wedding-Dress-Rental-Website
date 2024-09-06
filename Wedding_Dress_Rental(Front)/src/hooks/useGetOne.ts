import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Response from "../entities/GlobalResponse";
import APIClient, { setAuthToken } from "../services/APIClient";
interface CustomError extends Error {
  response?: {
    status: number;
  };
}
const useGetOne = <T>(id: number | null, endPoint: string) => {
  const apiClient = new APIClient<Response<T>>(`/${endPoint}`);
  const navigate = useNavigate();
  setAuthToken();
  const query = useQuery({
    queryKey: [`one${endPoint}`, id],
    queryFn: () => apiClient.getWithId(id ? id : undefined),
  });
  if (query.error) {
    const err = query.error as CustomError;
    if (err.response) {
      const statusCode = err.response.status;
      if (statusCode === 401) {
        navigate("/login");
      }
    }
  }

  return query;
};
export default useGetOne;
