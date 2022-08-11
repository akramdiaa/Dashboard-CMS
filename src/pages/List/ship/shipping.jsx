import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";

import { Link } from "react-router-dom";
import {} from "react-bootstrap";

export default function DataTable() {
  const [tableData, setTableData] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [select, setSelect] = useState([]);

  const handleSele = (e) => {
    setSelect(e.target.value);
  };
  return (
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
      let result = await fetch(
        "https://websitebuild.herokuapp.com/api/shop-owner/shipping-show",
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
      setTableData(result.data);
    }, []),
    (
      <div className="productList2">
        <div className="">
          <Link to="/newShipping">
            <button className="al" href="">
              <span>New Shipping</span>
              <div className="wave"></div>
            </button>
          </Link>
          <button onClick={() => setVisible(!visible)} className="btnHid">
            {visible ? "Hide Shippings" : "Display Shippings"}
          </button>
        </div>
        <div className="dataT">
          <DataGrid
            disableSelectiononClick
            rows={tableData}
            columns={[
              { field: "id", headerName: "ID", width: 150 },
              { field: "government", headerName: "Government", width: 180 },
              { field: "duration", headerName: "Shipping Days", width: 200 },
              {
                field: "price",
                headerName: "Price",
                type: "number",
                width: 150,
                margin: 60,
              },
              {
                field: "action",
                headerName: "Action",
                width: 130,
                renderCell: (params) => {
                  localStorage.setItem("shipment", params.row.id);
                  return (
                    <>
                      <Link to={"/ship/" + params.row.id}>
                        <button className="productListEdit" onClick={handleSele}>
                          Edit
                        </button>
                      </Link>
                    </>
                  );
                },
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
