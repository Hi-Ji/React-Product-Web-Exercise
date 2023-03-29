import React from "react";
import { CSVLink } from "react-csv";

const tasks = [
  { id: 1, name: "qqq" },
  { id: 2, name: "www" },
  { id: 3, name: "eee" },
];

const headers = [
  { label: "ID", key: "id" },
  { label: "Name", key: "name" },
];

function ExportToExcel() {
  return (
    <CSVLink data={tasks} headers={headers}>
      Export to Excel
    </CSVLink>
  );
}

export default ExportToExcel;
