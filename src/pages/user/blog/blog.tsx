import React, { useEffect, useState } from "react";
import imageagri from "@assets/images/Ellipse-agrilogo.png";
import { Link, useParams } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@components/ui/carousel";
import useGetBlogsPublishyIdQuery from "@hooks/api/get/useGetBlogsPublishyIdQuery";
import parse from "html-react-parser";
import LoadingSpinner from "@icons/LoadingSpinner";
import useGetBlogsPublishList from "@hooks/api/get/useGetBlogsPublishListQuery";
import Autoplay from "embla-carousel-autoplay";
import SkeletonCard from "@components/ui/custom/skeleton/skeleton-card";
import { formatDate } from "@components/lib/utils";
import SkeletonBlogView from "@components/user/blogs/skeleton/skeleton-blog-view";
import useGetClientDetails from "@hooks/api/get/useGetClientDetails";
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";

export const ellipsis = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength).trim() + "...";
  }
};

const Blog = () => {
  const blogId = useParams().blogId;

  const { data, isLoading } = useGetBlogsPublishyIdQuery(blogId ?? "");

  const { data: cmsClientDetails, isLoading: cmsIsLoading } =
    useGetClientDetails();

  const thumbnail = data?.images.filter(d => d.thumbnail)[0].image;

  const [mainImage, setMainImage] = useState<string | undefined>(
    thumbnail ?? ""
  );

  useEffect(() => {
    setMainImage(thumbnail);
  }, [thumbnail]);

  const { data: blogData, isLoading: isLoadingSuggested } =
    useGetBlogsPublishList();

  return (
    <>
      <div>
        <div className="mt-2">
          <div className="my-4 sm:mx-8">
            <Link to="/blogs">
              <span className="flex items-center gap-x-2 text-foreground font-poppins-semibold hover:underline hover:underline-offset-2 py-2.5 px-1.5 rounded-lg duration-200">
                <FaArrowLeftLong /> Back
              </span>
            </Link>
          </div>
          {mainImage && (
            <img
              src={mainImage}
              className="w-full mx-auto max-w-5xl object-contain object-center hidden sm:block h-[35rem]"
            />
          )}

          {isLoading && <SkeletonBlogView />}

          <Carousel
            className="mx-auto max-w-5xl"
            opts={{
              align: "start",
              loop: true
            }}
            plugins={[
              Autoplay({
                delay: 5000
              })
            ]}
          >
            <CarouselContent className="-ml-1">
              {data?.images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/5 cursor-pointer"
                  onClick={() => setMainImage(image.image)}
                >
                  <div className="flex items-center justify-center">
                    <img
                      src={image.image}
                      alt={`Image ${index}`}
                      className="aspect-video object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {!cmsIsLoading && (
            <div className="flex items-center justify-center gap-2 py-5">
              <img src={cmsClientDetails?.logo} className="w-6" alt="logo" />
              <h5 className="text-sm sm:text-md">
                {cmsClientDetails?.name} &nbsp;| &nbsp;{" "}
                {formatDate(data?.createdat || "")}
              </h5>
            </div>
          )}

          <h1 className="text-gray-800 text-xl sm:text-2xl duration-150 font-semibold text-center">
            {data?.title}
          </h1>

          <div className="flex justify-center py-10">
            {data?.tags.map(({ tag }) => (
              <p className="text-base text-primary rounded-md w-auto border border-[#BBE3AD] bg-secondary px-2 mr-2 py-1">
                {tag}
              </p>
            ))}
          </div>

          <p className="pt-4 text-justify max-w-5xl mx-auto text-wrap">
            {parse(data?.content || "")}
          </p>
        </div>
      </div>

      <h3 className="mt-20 mb-5 max-w-5xl mx-auto font-poppins-medium">
        {" "}
        Suggested Blogs{" "}
      </h3>
      <div className="mb-16 mx-auto max-w-5xl">
        {isLoadingSuggested && <SkeletonCard count={3} className="md:w-1/3" />}
        <Carousel
          className="m-4"
          opts={{
            align: "start",
            loop: true
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {blogData?.data?.map((item, index) => {
              return (
                <CarouselItem className="pl-2 md:pl-4 max-w-sm" key={index}>
                  <Link to={`/blogs/view/${item.id}`}>
                    <div className="group flex flex-col">
                      <div className="max-h-370px max-w-750px">
                        <img
                          src={item?.thumbnail}
                          alt={item.title}
                          className="w-full rounded-lg max-h-64 min-h-64 object-cover"
                        />
                      </div>

                      <div className="mt-3">
                        <h5 className="text-gray-600 pt-1 text-sm">
                          {formatDate(item.createdat || "")}
                        </h5>
                        <h5 className="font-bold mt-1 flex items-center">
                          {item.category}
                          <span className="text-green-700 ml-2">
                            <IoIosArrowForward />
                          </span>
                        </h5>
                        <h1 className="text-gray-800 duration-150 group-hover:text-green-700 font-semibold text-lg">
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
        </Carousel>
      </div>
    </>
  );
};

export default Blog;
