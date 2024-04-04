import React, { useMemo, useState } from "react";
import { Input } from "@components/ui/input";
import { columns, data } from "./columns";
// import useDebounce from "@hooks/utils/useDebounce";
// import useGetRequestSeedlingListAll from "../../../../hooks/api/get/useGetRequestSeedlingListAll";
// import { useSearchParams } from "react-router-dom";
// import { Pagination } from "../../../ui/custom";
import { DataTable } from "@components/ui/custom/data-table/data-table";

const TableToolRejected = () => {
  //   const [searchParams, setSearchParams] = useSearchParams();
  //   const params = useMemo(() => {
  //     return {
  //       currentPage: Number(searchParams.get("page")) ?? 1,
  //       search: searchParams.get("search") ?? undefined
  //     };
  //   }, [searchParams]);
  //   const { data: SeedlingData, isLoading } = useGetRequestSeedlingListAll({
  //     perpage: "10",
  //     page: String(params.currentPage),
  //     search: params.search,
  //     filter: "rejected"
  //   });

  //   const debouncedSearch = useDebounce((value: string) => {
  //     searchParams.set("search", value);
  //     setSearchParams(searchParams);
  //   }, 100);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search crop..."
          className="max-w-sm"
          //   value={params.search}
          //   onChange={e => debouncedSearch(e.target.value)}
        />
      </div>
      <DataTable columns={columns} data={data} />
      {/* {SeedlingData?.pagination?.total_pages !== 1 && (
        <div className="mt-4">
          <Pagination
            totalPages={Number(SeedlingData?.pagination?.total_pages)}
            isLoading={isLoading}
          />
        </div>
      )} */}
    </div>
  );
};

export default TableToolRejected;
