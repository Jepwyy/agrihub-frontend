import {
  UserAside,
  UserAsideTitle,
  UserAsideItem,
  UserAsideItemContent
} from "@components/ui/custom";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGetPopularTagsQuery from "@hooks/api/get/useGetPopularTagsQuery";
import LoadingSpinner from "@icons/LoadingSpinner";
import { FaAngleRight } from "react-icons/fa";

const QuestionsAside = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: tagsData, isLoading: isTagsLoading } = useGetPopularTagsQuery();

  return (
    <UserAside className="hidden xl:flex">
      <UserAsideTitle>Tags</UserAsideTitle>

      <UserAsideItemContent className="mt-5">
        {isTagsLoading ? (
          <LoadingSpinner className="mx-auto text-md text-green-700" />
        ) : (
          tagsData?.tags?.map(({ id, tag_name }) => (
            <div key={id}>
              <button
                className="w-full"
                onClick={() => {
                  if (searchParams.get("tag")) {
                    navigate(`/forum?tag=${tag_name}`, {
                      replace: true
                    });
                  } else {
                    navigate(`/forum?tag=${tag_name}`);
                  }
                }}
              >
                <UserAsideItem>
                  <p className="truncate">{tag_name}</p>
                  <span className="w-4 text-md">
                    <FaAngleRight />
                  </span>
                </UserAsideItem>
              </button>
            </div>
          ))
        )}
      </UserAsideItemContent>
    </UserAside>
  );
};

export default QuestionsAside;
