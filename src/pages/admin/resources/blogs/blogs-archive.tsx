import React from "react";
import AdminOutletContainer from "@components/admin/layout/container/AdminOutletContainer";
import BreadCrumb from "@components/ui/custom/breadcrumb/breadcrumb";
import withAuthGuard from "@higher-order/account/withAuthGuard";
import TableBlogsArchive from "../../../../components/admin/blogs/table/table-blogs-archive/table-blogs-archive";

const breadcrumbItems = [
  { title: "Resource Management", link: "/admin/resources" },
  { title: "Blogs", link: "/admin/resource/blogs" },
  { title: "Archive", link: "/admin/resource/blogs-drafts" }
];
const BlogsArchive = () => {
  return (
    <AdminOutletContainer className="container mx-auto py-10 ">
      <BreadCrumb items={breadcrumbItems} />
      <h2 className="text-3xl font-bold tracking-tight">Blogs Archive</h2>
      <p className="text-sm text-muted-foreground">Manage blogs archive.</p>
      <hr className="my-4" />
      <TableBlogsArchive />
    </AdminOutletContainer>
  );
};

export default withAuthGuard(BlogsArchive, ["admin", "asst_admin"], "blog");
