import React, { useMemo } from "react";
import AdminOutletContainer from "@components/admin/layout/container/AdminOutletContainer";
import BreadCrumb from "../../../components/ui/custom/breadcrumb/breadcrumb";
import withAuthGuard from "@higher-order/account/withAuthGuard";
import AdminFarmsRegistered from "./tabs/farms/farms-registered";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import AdminFarmsPending from "./tabs/farms/farms-pending";
import AdminFarmsRejected from "./tabs/farms/farms-rejected";
import { useSearchParams } from "react-router-dom";

const breadcrumbItems = [
  { title: "Farm Management", link: "/admin/community" },
  { title: "Farms", link: "/admin/community/farms" }
];
const FarmsAdmin = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useMemo(() => {
    return {
      tab: searchParams.get("tab") || "registered"
    };
  }, [searchParams]);

  const setTab = (value: string) => {
    searchParams.set("tab", value);
    searchParams.delete("page");
    setSearchParams(searchParams);
  };
  return (
    <AdminOutletContainer className="container mx-auto py-10 ">
      <BreadCrumb items={breadcrumbItems} />
      <h2 className="text-3xl font-bold tracking-tight">Farm Application</h2>
      <p className="text-sm text-muted-foreground w-11/12">
        Administer and manage farm applications to streamline the process of
        joining our agricultural community. Provide a platform for farmers to
        apply for participation, submit required documentation, and express
        their interest in farming opportunities. Facilitate efficient
        communication and decision-making throughout the application review and
        approval process.
      </p>
      <hr className="my-4" />
      <Tabs value={params.tab}>
        <TabsList>
          <TabsTrigger value="registered" onClick={() => setTab("registered")}>
            Farms
          </TabsTrigger>
          <TabsTrigger value="pending" onClick={() => setTab("pending")}>
            Pending
          </TabsTrigger>
          <TabsTrigger value="rejected" onClick={() => setTab("rejected")}>
            Rejected
          </TabsTrigger>
        </TabsList>
        <TabsContent value="registered">
          <AdminFarmsRegistered />
        </TabsContent>
        <TabsContent value="pending">
          <AdminFarmsPending />
        </TabsContent>
        <TabsContent value="rejected">
          <AdminFarmsRejected />
        </TabsContent>
      </Tabs>
    </AdminOutletContainer>
  );
};

export default withAuthGuard(FarmsAdmin, ["admin", "asst_admin"], "farms");
