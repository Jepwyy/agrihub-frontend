import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Pagination } from "@components/ui/custom";
import useGetBlogsPublishList from "@hooks/api/get/useGetBlogsPublishListQuery";
import parse from "html-react-parser";
import { formatDate } from "@components/lib/utils";
import SkeletonCard from "@components/ui/custom/skeleton/skeleton-card";
import { IoIosArrowForward } from "react-icons/io";
import { Button } from "@components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@components/ui/carousel";

const Blogs = () => {
  const [searchParams] = useSearchParams();
  const params = String(searchParams.get("page")) ?? "1";

  const { data: blogData, isLoading } = useGetBlogsPublishList(
    "",
    params,
    "10"
  );

  let headerContent = null;
  if (!isLoading && (blogData?.data?.length ?? 0) > 0) {
    const [firstItem] = blogData?.data ?? [];

    headerContent = (
      <div className="relative w-full h-[100vh] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 flex justify-end mx-4 items-center text-white ">
            <div className="w-ful py-10 rounded-lg">
              <div>
                <img
                  src={firstItem?.thumbnail}
                  className="w-full h-full object-cover"
                  alt="Blog Thumbnail"
                />
                <h5 className="text-gray-600 pt-1 text-sm">
                  {formatDate(firstItem?.createdat || "")}
                </h5>
                <h5 className="font-bold mt-1 flex items-center text-black">
                  {firstItem?.category}
                  <span className="text-green-700 ml-2">
                    <IoIosArrowForward />
                  </span>
                </h5>
                <h1 className="text-gray-800 duration-150 group-hover:text-green-700 font-semibold text-lg">
                  {firstItem?.title}
                </h1>

                <p className="text-sm me-8 text-justify line-clamp-3 text-black">
                  {parse(firstItem?.content || "")}
                </p>
                <div className="flex py-3">
                  <div className="flex-wrap flex justify-start">
                    {firstItem?.tags?.map(tags => (
                      <span className="text-base text-primary rounded-md mb-2 border border-[#BBE3AD] bg-secondary px-2 mr-2 py-1 text-center w-auto">
                        {tags.tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* <Link to={`/blogs/view/${firstItem?.id}`} key={firstItem?.id}>
                  <Button>View Blog</Button>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="text-left">
        <h1 className="text-3xl text-gray-800 font-semibold ml-4 mt-4">
          Recent Blogs
        </h1>
      </div>

      {isLoading && (
        <div>
          <SkeletonCard count={9} className="md:w-1/3 w-full" />
        </div>
      )}
      <div className="flex gap-2">
        {/* header */}

        <div className="relative w-full h-[100vh] overflow-hidden">
          {headerContent}
        </div>
        <div className="mx-4 overflow-hidden w-full">
          <Carousel
            orientation="vertical"
            className="flex flex-wrap justify-center gap-2"
          >
            <CarouselContent className="h-screen">
              {blogData?.data?.map((item, index) => {
                if (index === 0) {
                  return null;
                }
                return (
                  <CarouselItem className="basis-1/3">
                    <Link to={`/blogs/view/${item.id}`} key={index}>
                      <div className="group flex items-center">
                        <div className="aspect-video w-full overflow-hidden ">
                          <img
                            src={item?.thumbnail}
                            alt={item.title}
                            className="w-full rounded-lg  object-cover group-hover:scale-110 duration-300"
                          />
                        </div>

                        <div className="mt-3 w-full p-4">
                          <h5 className="text-gray-600 pt-1 text-sm">
                            {formatDate(item.createdat || "")}
                          </h5>
                          <h5 className="font-bold mt-1 flex items-center">
                            {item.category}
                            <span className="text-green-700 ml-2">
                              <IoIosArrowForward />
                            </span>
                          </h5>
                          <h1 className="text-gray-800 duration-150 group-hover:text-green-700 font-semibold text-lg line-clamp-1">
                            {item?.title}
                          </h1>

                          <p className="text-sm me-8 text-justify line-clamp-3">
                            {parse(item.content || "")}
                          </p>
                          <div className="flex py-3">
                            <div className="flex-wrap flex justify-start">
                              {item?.tags?.map(tags => (
                                <span className="text-base text-primary rounded-md mb-2 border border-[#BBE3AD] bg-secondary px-2 mr-2 py-1 text-center w-auto">
                                  {tags.tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            {/* <CarouselPrevious />
            <CarouselNext /> */}
          </Carousel>
          <div className="mt-auto py-4">
            <Pagination
              totalPages={blogData?.pagination?.total_pages ?? 1}
              isLoading={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
