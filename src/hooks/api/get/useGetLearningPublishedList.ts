import { useQuery } from "@tanstack/react-query";
import { LearningMaterialsService } from "../../../api/openapi";

export const GET_LEARNING_PUBLISHED_LIST = () =>
  "GET_LEARNING_PUBLISHED_LIST_KEY";
interface ApplicationsParams {
  search?: string;
  page?: string;
  perpage?: string;
}
export default function useGetLearningPublishedList(data: ApplicationsParams) {
  return useQuery({
    queryKey: [GET_LEARNING_PUBLISHED_LIST()],
    queryFn: async () => {
      const response =
        await LearningMaterialsService.getApiLearningPublished(data);

      return response;
    }
  });
}
