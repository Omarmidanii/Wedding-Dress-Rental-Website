import { useMutation } from "@tanstack/react-query";
import User from "../entities/User";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/userStore";
import Response from "../entities/GlobalResponse";
import { setAuthToken } from "../services/APIClient";
const useAuth = (type: string) => {
  const navigate = useNavigate();
  const setUser = useUserStore((s) => s.setUser);
  return useMutation<Response<User>, Error, User>({
    mutationKey: [`${type}`],
    mutationFn: (user) =>
      axios
        .post<Response<User>>(`http://127.0.0.1:8000/api/${type}`, user)
        .then((res) => {
          if (res.data.data.token) {
            localStorage.removeItem("token");
            localStorage.setItem("token", res.data.data.token);
            setAuthToken();
          }
          if (res.data.data.name)
            localStorage.setItem("userName", res.data.data.name);
          setUser(res.data.data);
          return res.data;
        }),
    onSuccess: (data, variable) => {
      console.log(data, variable);
      navigate("/weddingDresses");
    },
  });
};

export default useAuth;
