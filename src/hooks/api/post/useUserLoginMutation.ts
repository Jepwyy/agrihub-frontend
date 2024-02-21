import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthService, UserLoginSchema } from "@api/openapi";
import { GET_MY_PROFILE_KEY } from "../get/useGetMyProfileQuery";
import { useNavigate } from "react-router-dom";

const useLoginUserKey = () => "user_login";

export default function useLoginUserMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation([useLoginUserKey()], {
    async mutationFn(data: UserLoginSchema) {
      const response = await AuthService.postApiAuthLogin({
        requestBody: data
      });

      return response;
    },
    onSuccess: userAuth => {
      queryClient.invalidateQueries({ queryKey: [GET_MY_PROFILE_KEY()] });

      switch (userAuth?.user?.verification_level) {
        case "4":
          if (userAuth?.user?.role === "admin") navigate("/admin/dashboard");

          break;
      }
    },

    onError: (e: any) => {
      console.log(e);
    }
  });
}
