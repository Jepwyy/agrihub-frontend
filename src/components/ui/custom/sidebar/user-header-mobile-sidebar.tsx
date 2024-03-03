import React, { ComponentProps, useEffect, useState } from "react";
import { UserSidebarNavLink } from "@components/ui/custom";

import { BsTags } from "react-icons/bs";
import { TbMessageCircleQuestion } from "react-icons/tb";
import { IoBookmarkOutline } from "react-icons/io5";
import useAuth from "@hooks/useAuth";
import { useLocation } from "react-router-dom";
import { BsPeople } from "react-icons/bs";
import { RiLightbulbLine } from "react-icons/ri";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { BsExclamationCircle } from "react-icons/bs";
import { PiListMagnifyingGlass, PiNewspaper } from "react-icons/pi";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { CiSquareQuestion } from "react-icons/ci";

type UserHeaderMobileSidebarProps = ComponentProps<"div"> & {
  onLinkClick?: () => void;
};

const UserHeaderMobileSidebar = ({
  onLinkClick
}: UserHeaderMobileSidebarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = useLocation().pathname;
  const { isAuthenticated, data: userData } = useAuth();

  const handleEventClick = () => {
    onLinkClick && onLinkClick();
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="md:hidden">
        <button
          className="flex items-center text-xl opacity-75"
          onClick={() => setIsOpen(prev => !prev)}
        >
          {!isOpen ? (
            <HiMenuAlt2 className="text-2xl" />
          ) : (
            <IoMdClose className="text-2xl" />
          )}
        </button>

        {isOpen && (
          <div className="fixed inset-0 top-14 max-w-[20rem] bg-background border-r p-3 overflow-y-auto ">
            <UserSidebarNavLink
              to="/forum"
              title="Questions"
              logo={<TbMessageCircleQuestion size={20} />}
              end={pathname === "/forum/tags"}
              onClick={handleEventClick}
            />

            {isAuthenticated && (
              <UserSidebarNavLink
                to={`/users/${userData?.id}/${userData?.username}/saved`}
                title="Saved"
                logo={<IoBookmarkOutline size={20} />}
                end
                onClick={handleEventClick}
              />
            )}

            <UserSidebarNavLink
              to="/forum/tags"
              title="Tags"
              logo={<BsTags size={20} />}
              onClick={handleEventClick}
              end
            />

            <div className="mt-10">
              <h6 className="font-poppins-semibold pb-5">Groups</h6>

              <UserSidebarNavLink
                to="/community"
                title="Community"
                logo={<BsPeople size={20} />}
                onClick={handleEventClick}
                end={
                  pathname === "/community/explore" ||
                  pathname === `/community/reports/${userData?.farm_id}` ||
                  pathname === `/community/request/${userData?.farm_id}`
                }
              />

              <UserSidebarNavLink
                to="/community/explore"
                title="Explore"
                logo={<PiListMagnifyingGlass size={21} />}
                onClick={handleEventClick}
                end
              />

              {userData?.farm_id && userData.role === "farm_head" && (
                <UserSidebarNavLink
                  to={`/community/reports/${userData?.farm_id}`}
                  title="Reports"
                  logo={<PiNewspaper size={20} />}
                  end
                  onClick={handleEventClick}
                />
              )}
              {userData?.farm_id && userData.role === "farm_head" && (
                <UserSidebarNavLink
                  to={`/community/request/${userData?.farm_id}`}
                  title="Request"
                  logo={<CiSquareQuestion size={20} />}
                  end
                  onClick={handleEventClick}
                />
              )}
            </div>

            <div className="mt-10">
              <h6 className="font-poppins-semibold pb-5">Resources</h6>

              <UserSidebarNavLink
                to="/blogs"
                title="Blogs"
                logo={<RiLightbulbLine size={20} />}
                end
                onClick={handleEventClick}
              />

              <UserSidebarNavLink
                to="/events"
                title="Events"
                logo={<IoCalendarNumberOutline size={20} />}
                end
                onClick={handleEventClick}
              />

              <UserSidebarNavLink
                to="/about"
                title="About"
                logo={<BsExclamationCircle size={20} />}
                end
                onClick={handleEventClick}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserHeaderMobileSidebar;
