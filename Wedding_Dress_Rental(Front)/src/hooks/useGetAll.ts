import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { GetAllResponse } from "../entities/GlobalResponse";
import APIClient, { setAuthToken } from "../services/APIClient";

interface CustomError extends Error {
  response?: {
    status: number;
  };
}

const useGetAll = <T>(endPoint: string) => {
  const navigate = useNavigate();
  const apiClient = new APIClient<GetAllResponse<T>>(
    `/${endPoint}`
  );
  setAuthToken();

  const query = useQuery<GetAllResponse<T>, CustomError>({
    queryKey: [endPoint],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          page: pageParam,
        },
      }),
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

export default useGetAll;
