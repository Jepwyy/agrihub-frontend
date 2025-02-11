import React from "react";
import { TfiEmail } from "react-icons/tfi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { HiOutlinePhone } from "react-icons/hi";
import { IoHomeOutline } from "react-icons/io5";
import { MONTHS } from "@pages/user/planting-calendar/planting-calendar";
import { Skeleton } from "@components/ui/skeleton";
import useGetFarmViewQuery from "@hooks/api/get/useGetFarmViewQuery";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";

interface ProfilePersonalInformationListProps {
  isOwn?: boolean;
  email?: string;
  birthDate?: string;
  phone?: string | null;
  address?: string;
  farmId?: string | null;
  isLoading?: boolean;
}

const ProfilePersonalInformationList = ({
  isOwn,
  email,
  birthDate: bday,
  phone,
  address,
  farmId,
  isLoading
}: ProfilePersonalInformationListProps) => {
  const d = new Date(bday ?? "");
  const birthDate = `${
    MONTHS[d.getMonth()]
  } ${d.getDate()}, ${d.getFullYear()}`;

  const { data: farmData } = useGetFarmViewQuery(farmId ?? "");

  return (
    <div className="lg:block max-w-[25rem] h-max w-full mt-10 p-3 rounded-md bg-foreground/5 border">
      {isOwn && (
        <div className="mb-7">
          <h5 className="font-poppins-semibold tracking-tight">
            Personal information
          </h5>

          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-2">
              <TfiEmail size={16} className="w-5" />
              {!isLoading ? (
                <span>{email ? email : "No email"}</span>
              ) : (
                <Skeleton className="h-5 w-full" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <LiaBirthdayCakeSolid size={20} className="w-5" />
              {!isLoading ? (
                <span>{birthDate}</span>
              ) : (
                <Skeleton className="h-5 w-full" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <HiOutlinePhone size={18} className="w-5" />
              {!isLoading ? (
                <span>{phone ? phone : "No contact number"}</span>
              ) : (
                <Skeleton className="h-5 w-full" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <IoHomeOutline size={18} className="w-5" />
              {!isLoading ? (
                <span className="line-clamp-3">{address}</span>
              ) : (
                <Skeleton className="h-5 w-full" />
              )}
            </div>
          </div>
        </div>
      )}

      <div>
        <h5 className="font-poppins-semibold tracking-tight">
          Community involved to
        </h5>

        {farmData?.id ? (
          <>
            <div className="py-3">
              <Link
                to={`/community/my-community/${farmData?.id}/`}
                className="flex justify-between items-center text-foreground/80 hover:text-primary duration-100"
              >
                <h6>{farmData?.farm_name}</h6>
                <FaAngleRight />
              </Link>
            </div>
          </>
        ) : isOwn ? (
          <>
            <h5 className="mt-2">You haven't joined in a community yet.</h5>
            <h6 className="mt-2">
              <Link to="/community">
                <span className="text-primary">Find community here</span>
              </Link>
            </h6>
          </>
        ) : (
          <>
            <h5 className="mt-2">This user haven't joined in any community</h5>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePersonalInformationList;
