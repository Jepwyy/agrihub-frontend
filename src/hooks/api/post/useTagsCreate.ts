import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TagsService, NewTagRequestBody } from "@api/openapi";
import { GET_TAG_BY_KEYWORD } from "../get/useGetTagByKeyword";

const useTagsCreateKey = () => "CREATE_TAG_KEY";

export default function useTagsCreate() {
  const queryClient = useQueryClient();
  return useMutation([useTagsCreateKey()], {
    async mutationFn(data: NewTagRequestBody) {
      const response = await TagsService.postApiTagsCreate({requestBody: data});
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_TAG_BY_KEYWORD()]
      });
    }
  });
}
