import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { GetAllResponseWithPaginate } from "../entities/GlobalResponse";
import APIClient, { setAuthToken } from "../services/APIClient";

interface CustomError extends Error {
  response?: {
    status: number;
  };
}

const useGetPaginated = <T>(endPoint: string) => {
  const navigate = useNavigate();
  const apiClient = new APIClient<GetAllResponseWithPaginate<T>>(
    `/${endPoint}`
  );
  setAuthToken();

  const query = useInfiniteQuery<GetAllResponseWithPaginate<T>, CustomError>({
    queryKey: [endPoint],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          page: pageParam,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.meta?.links.next ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
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

export default useGetPaginated;
