import React from "react";
import "./uprefund.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import {  useNavigate } from "react-router-dom";


export default function UpRefund() {
  const Refund = useParams();
  const [status, setStatus] = useState("");
  const [details, setDetails] = useState("");
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    let result = await fetch(
      "http://websitebuild.herokuapp.com/api/shop-owner/show_refund",
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
  }, []);

  async function upRefund() {
    let item = {
      status,
      details,
    };
    await fetch(
      "http://websitebuild.herokuapp.com/api/shop-owner/refund_status/" +
        Refund.refundId,
      {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
          "auth-token": localStorage.getItem("user-info"),
        },
      }
    );
navigate("/refund");
  }
  let first = tableData.map((item) => item.refund_status);

  if (first[0] === "Pending") {
    return (
      <div className="uprefund">
        <h1 className="uprefundtitle">Refund</h1>
        <div className="newUserForm1">
          <div>
            <div className="newUserItem">
              <label>Refund Status</label>
              <select
                name="status"
                className="select_refund"
                onChange={(e) => setStatus(e.target.value)}
              >
                [<option key={1}>Select Category</option>,
                <option key={2} value="Reviewing">
                  Reviewing
                </option>
                ,
                <option key={3} value="Refunded">
                  Refunded
                </option>
                ,
                <option key={4} value="Declined">
                  Declined
                </option>
                ]
              </select>
            </div>
            <div className="newUserItem">
              <label>Refund Details</label>
              <input
                type="text"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>
            <div className="knm">
            <button className="noselect2" onClick={upRefund}>
              <span className="text">Update</span>
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z" />
                </svg>
              </span>
            </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (first[0] === "Reviewing") {
    return (
      <div className="uprefund">
        <h1 className="uprefundtitle">Refund</h1>
        <div className="newUserForm1">
          <div>
            <div className="newUserItem">
              <label>Refund Status</label>
              <select
                name="status"
                className="select_refund"
                onChange={(e) => setStatus(e.target.value)}
              >
                [<option key={1}>Select Category</option>,
                <option key={2} value="Refunded">
                  Refunded
                </option>
                ,
                <option key={3} value="Declined">
                  Declined
                </option>
                ]
              </select>
            </div>
            <div className="newUserItem">
              <label>Refund Details</label>
              <input
                type="text"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>
            <div className="knm">
            <button className="noselect2" onClick={upRefund}>
              <span className="text">Update</span>
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z" />
                </svg>
              </span>
            </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (first[0] === "Refunded") {
    return (
      <div className="uprefund">
        <h1 className="uprefundtitle">Refund</h1>
        <div className="newUserForm1">
          <div>
            <div className="newUserItem">
              <label>Refund Status</label>
              <select
                name="status"
                className="select_refund"
                onChange={(e) => setStatus(e.target.value)}
              >
                [<option key={1}>Select Category</option>,
                <option key={2} value="Refunded">
                  Refunded
                </option>
                ]
              </select>
            </div>
            <div className="newUserItem">
              <label>Refund Details</label>
              <input
                type="text"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>
            <div className="knm">
            <button className="noselect2" onClick={upRefund}>
              <span className="text">Update</span>
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z" />
                </svg>
              </span>
            </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="uprefund">
        <h1 className="uprefundtitle">Refund</h1>
        <div className="newUserForm1">
          <div>
            <div className="newUserItem">
              <label>Refund Status</label>
              <select
                name="status"
                className="select_refund"
                onChange={(e) => setStatus(e.target.value)}
              >
                [<option key={1}>Select Category</option>,
                <option key={2} value="Refunded">
                  Declined
                </option>
                ]
              </select>
            </div>
            <div className="newUserItem">
              <label>Refund Details</label>
              <input
                type="text"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>
            <div className="knm">
            <button className="noselect2" onClick={upRefund}>
              <span className="text">Update</span>
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z" />
                </svg>
              </span>
            </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
