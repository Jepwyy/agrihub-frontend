import React from "react";
import AdminOutletContainer from "@components/admin/layout/container/AdminOutletContainer";
import BreadCrumb from "../../../components/ui/custom/breadcrumb/breadcrumb";
import withAuthGuard from "@higher-order/account/withAuthGuard";
const breadcrumbItems = [
  { title: "Admin Management", link: "/admin/record/admins" },
  { title: "Admin", link: "/admin/record/admins" }
];
import TableAdminList from "../../../components/admin/admins/table-admin-list/table-admin-list";
import DialogCreateAdmin from "../../../components/admin/admins/dialog-create-admin/dialog-create-admin";

const RecordAdmins: React.FC = () => {
  return (
    <AdminOutletContainer className="container mx-auto py-10 ">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Accounts</h2>
          <p className="text-sm text-muted-foreground">Manage all admins.</p>
        </div>

        {/* new admin */}
        <DialogCreateAdmin />
      </div>
      <hr className="my-4" />
      <TableAdminList />
    </AdminOutletContainer>
  );
};

export default withAuthGuard(RecordAdmins, ["admin", "asst_admin"], "admin");
