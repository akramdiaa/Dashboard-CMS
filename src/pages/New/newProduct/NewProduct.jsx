import "./newProduct.css";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function NewProduct() {
  const [category_id, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setdes] = useState("");
  const [price, setPrice] = useState("");
  const [show_c, setSC] = useState([]);
  const [brand, setBrand] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const [userInfo, setuserInfo] = useState({
    file: [],
  });

  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file: event.target.files,
    })
  };
  
  const submit = async () => {
    setOpen(!open);
    const formData = new FormData();
    for (let i = 0; i < userInfo.file.length; i++)
    {
      formData.append("images[]", userInfo.file[i]);
    }
    formData.append("name", name);
    formData.append("category_id", category_id);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("brand", brand);
    axios
      .post(
        "https://websitebuild.herokuapp.com/api/shop-owner/add-product",
        formData,
        {
          headers: {
            "auth-token": localStorage.getItem("user-info"),
            "Content-Type": "multipart/form-data"
          },
        }
      )
      .then((res) => {
        localStorage.setItem("Product_id", res.data.data);
        navigate("/noption")
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(
      "http://websitebuild.herokuapp.com/api/shop-owner/show-category",
      {
        headers: {
          "auth-token": localStorage.getItem("user-info"),
        },
      }
    );
    const result = await data.json();
    setSC(result.data);
   
  };
  const handleSelect = (e) => {
    const value = e?.target?.value;
    setCategory(
      {
        [e.target.name]: value,
      }.category_id
    );
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle2">New Product</h1>
      <h2 className="addProductTitle3">Lets Start A New Product !..</h2>
      <div className="addProductForm2">
        <div className="add-prod">
          <div className="cont-pro">
            <p className="txt-for">Image</p>
            <div className="cont-cho">
              <PhotoCamera
                color="primary"
                sx={{
                  width: 35,
                  height: 35,
                  paddingRight: 1,
                  paddingBottom: 0,
                }}
              />
              <input
                type="file"
                name="images[]"
                onChange={handleInputChange}
                multiple
              />
            </div>
          </div>
          <div className="cont-pro">
            <p className="txt-for">Category</p>
            <select
              name="category_id"
              className="select"
              onChange={handleSelect}
            >
            <option>Select Category</option>
              {show_c.map((item) => (
                <option value={item?.id}>{item?.name}</option>
              ))}
            </select>
          </div>
          <div className="cont-pro">
            <p className="txt-for">Product Name</p>
            <input
              type="text"
              placeholder="Name .."
              className="txt-ed"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={50}
            />
          </div>
          <div className="cont-pro">
            <p className="txt-for">Description</p>
            <input
              type="text"
              placeholder="Descripe"
              className="txt-ed"
              value={description}
              onChange={(e) => setdes(e.target.value)}
              required
              maxLength={255}
              
            />
          </div>
          <div className="cont-pro">
            <p className="txt-for">Price</p>
            <input
              type="number"
              placeholder="500$"
              className="txt-ed"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0" max="100000"
            />
          </div>
          <div className="cont-pro">
            <p className="txt-for">Brand</p>
            <input
              type="text"
              placeholder="Apple Airpods"
              className="txt-ed"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
              maxLength={30}
            />
          </div>
        </div>
      </div>
      <div className="apb2">
        <button className="vbn6" onClick={() => submit()}>
          Next Step ..
        </button>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      </div>
    </div>
  );
}
