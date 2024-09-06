import { useMutation } from "@tanstack/react-query";
import Response from "../entities/GlobalResponse";
import APIClient, { setAuthToken } from "../services/APIClient";
import useErrorStore from "../stores/errorStore";

const usePost = <T, D>(endPoint: string) => {
  const apiClient = new APIClient<Response<T>>(`/${endPoint}`);
  setAuthToken();
  const {setMessage} = useErrorStore();
  return useMutation<Response<T>, Error, D>({
    mutationKey: [`create${endPoint}`],
    mutationFn: (data) => apiClient.post<D>(data),
    onError(error : any) {
      if (error.response && error.response.status === 422) {
        const errorMessage = error.response.data.errors;
        setMessage(errorMessage);
      } else {
        console.error("An error occurred:", error.message);
      }
    },
    onSuccess: (vlaues, variables) => {
      console.log(vlaues, variables);
    },
  });
};
export default usePost;
