import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import {} from "react-bootstrap";

export default function DataTable() {
  const [visible, setVisible] = React.useState(false);
  const [tableData, setTableData] = useState([]);

  return (
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
      let result = await fetch(
        "https://websitebuild.herokuapp.com/api/shop-owner/show-customer",
        {
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json",
            "auth-token": localStorage.getItem("user-info"),
          },
        }
      );
      result = await result.json();
      console.log(result.data);
      setTableData(result.data);
    }, []),
    (
      <div className="productList2">
        <div>
          <button onClick={() => setVisible(!visible)} className="btnHid">
            {visible ? "Hide Customers" : "Display Customers"}
          </button>
        </div>
        <div className="dataT">
          <DataGrid
            disableSelectiononClick
            rows={tableData}
            columns={[
              { field: "id", headerName: "ID", width: 120 },
              { field: "first_name", headerName: "Name", width: 200 },

              { field: "email", headerName: "Email", width: 200 },
              {
                field: "address",
                headerName: "Address",
                width: 170,
              },
              {
                field: "phone_number",
                headerName: "Phone_Number",
                width: 190,
              },
              {
                field: "balance",
                headerName: "Balance",
                width: 170,
              },
              {
                field: "city",
                headerName: "City",
                width: 160,
              },
            ]}
            pageSize={visible ? 9 : 0}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </div>
    )
  );
}
