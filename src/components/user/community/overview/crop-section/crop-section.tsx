import React from "react";
import { useParams } from "react-router-dom";
import useGetFarmCropsQuery from "../../../../../hooks/api/get/useGetFarmCropsQuery";
import CropCard from "../../crop/crop-card/crop-card";
import { IoChevronForward } from "react-icons/io5";

const CropSection = () => {
  const { id } = useParams();
  const { data: farmCrops } = useGetFarmCropsQuery(id || "");
  return (
    <div>
      <h4 className="font-poppins-semibold mb-4">Crops Available</h4>
      <div className="grid grid-cols-12 gap-3">
        {farmCrops
          ?.slice(0, 3)
          .map((crop, i) => <CropCard crop={crop} key={i} />)}
      </div>
      <div className="flex justify-end mt-2">
        <button className="flex flex-row  items-center text-green-700 leading-none hover:underline">
          See more <IoChevronForward size={18} />
        </button>
      </div>
    </div>
  );
};

export default CropSection;
