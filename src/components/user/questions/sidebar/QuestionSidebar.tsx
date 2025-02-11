import React, { ComponentProps } from "react";
import { UserSidebar, UserSidebarNavLink } from "@components/ui/custom";

import { BsTags } from "react-icons/bs";
import { TbMessageCircleQuestion } from "react-icons/tb";
import { IoBookmarkOutline } from "react-icons/io5";
import useAuth from "@hooks/useAuth";
import { useLocation } from "react-router-dom";

type QuestionSidebarProps = ComponentProps<"div">;

const QuestionSidebar = ({ className, ...props }: QuestionSidebarProps) => {
  const pathname = useLocation().pathname;
  const { data, isAuthenticated } = useAuth();

  return (
    <UserSidebar className={`hidden lg:block ${className}`} {...props}>
      <UserSidebarNavLink
        to="/forum"
        title="Questions"
        logo={<TbMessageCircleQuestion size={20} />}
        end={pathname === "/forum/tags" || pathname === "/forum/users"}
      />

      <UserSidebarNavLink
        to="/forum/tags"
        title="Tags"
        logo={<BsTags size={20} />}
        end
      />

      {isAuthenticated && (
        <UserSidebarNavLink
          to={`/users/${data?.id}/${data?.username}/saved`}
          title="Saved"
          logo={<IoBookmarkOutline size={20} />}
          end
        />
      )}
    </UserSidebar>
  );
};

export default QuestionSidebar;
