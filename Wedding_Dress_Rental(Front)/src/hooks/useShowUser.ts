import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Response from "../entities/GlobalResponse";
import APIClient, { setAuthToken } from "../services/APIClient";
import User from "../entities/User";
interface CustomError extends Error {
  response?: {
    status: number;
  };
}
const useShowUser = () => {
  const apiClient = new APIClient<Response<User>>(`/users/show`);
  const navigate = useNavigate();
  setAuthToken();
  const query = useQuery({
    queryKey: [`showuser`],
    queryFn: () => apiClient.get(),
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
export default useShowUser;
