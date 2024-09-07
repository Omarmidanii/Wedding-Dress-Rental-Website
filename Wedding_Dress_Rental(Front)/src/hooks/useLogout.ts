import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/APIClient"
import { useNavigate } from "react-router-dom";

const useLogout = () =>{
    const navigate = useNavigate();
    const apiClient = new APIClient<{}>("logout");
    return useMutation({
        mutationKey: ['logout'],
        mutationFn: (data) => apiClient.post({}),
        onSuccess: () => {
            navigate("/login");
        }
        
    })
};
export default useLogout;