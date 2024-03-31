import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "@components/ui/button";
import useCmsLandingDetailsQuery from "@hooks/api/get/useCmsLandingDetailsQuery";
import { Link } from "react-router-dom";
import RegisterFarm from "@pages/user/community/buttons/RegisterFarm";
import LoadingSpinner from "@icons/LoadingSpinner";

const Carousels: React.FC = () => {
  const { data: cmsData } = useCmsLandingDetailsQuery();
  const { data: cmsDataLanding, isLoading: isImageLoading } =
    useCmsLandingDetailsQuery();
  const { cta_description, cta_header } = {
    ...cmsData
  };

  const CtaImage = cmsDataLanding?.images?.[0].image;

  return (
    <>
      <div className="relative max-w-7xl mx-auto w-full 2xl:h-[75vh] h-[52rem]">
        <div className="absolute inset-0">
          {isImageLoading ? (
            <div className="h-screen flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <img
              src={CtaImage}
              alt="Hero Image"
              className="w-full h-full object-cover object-top sm:block"
            />
          )}

          <div
            className="absolute inset-0 z-0 flex items-center text-white lg:hidden"
            style={{ background: "rgba(0, 0, 0, 0.6)" }}
          ></div>
          <div className="absolute inset-0 flex items-center mb-60 2xl:mb-40 text-white">
            <div className="px-4">
              <div style={{ fontFamily: "Arial Black" }} className="z-50">
                <div className="flex-1 max-w-lg py-5 sm:mx-auto lg:max-w-max lg:text-left">
                  <p className="text-green-400 lg:text-green-600 font-poppins-semibold">
                    Center for Urban Agriculture and Innovation
                  </p>
                  <h3 className="text-3xl text-slate-200 lg:text-gray-800 font-poppins-semibold md:text-4xl sm:max-w-md">
                    {cta_header}
                  </h3>
                  <p className="text-slate-200 lg:text-gray-800 font-poppins-medium leading-relaxed mt-3 max-w-lg">
                    {cta_description}
                  </p>

                  <div className="flex gap-4 mt-10">
                    <RegisterFarm />
                    <Link to="/community">
                      <Button
                        className="font-poppins-medium"
                        variant="secondary"
                      >
                        Community <FaArrowRightLong className="ms-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousels;
