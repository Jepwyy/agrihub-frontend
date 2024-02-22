import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AccountService } from "@api/openapi";
import { UserProfile } from "@api/openapi";
import { useNavigate } from "react-router-dom";
import { GET_MY_PROFILE_KEY } from "../get/useGetMyProfileQuery";

const useUserFinalSetupKey = () => "FINAL_SETUP";

export default function useUserFinalSetup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation([useUserFinalSetupKey()], {
    mutationFn: async (data: UserProfile) => {
      console.log(data);

      const response = await AccountService.postApiAccountSetupProfile({
        formData: data
      });

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_MY_PROFILE_KEY()] });

      navigate("/", { replace: true });
    }
  });
}
