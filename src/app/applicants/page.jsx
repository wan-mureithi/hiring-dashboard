import React from "react";
import { DataTable } from "@/components/data-table";
import data from "./data.json";
function Page() {
  return (
    <div>
      <DataTable data={data} />
    </div>
  );
}

export default Page;
