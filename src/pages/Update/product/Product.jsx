import "./product.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import Spinner from "../../../components/spinner/spinner";
import { Slide } from "react-slideshow-image";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Product() {
  const [product, setProduct] = useState("");
  const [options, setOption] = useState([]);
  const [images, setImages] = useState([]);
  const [variant, setVariant] = useState([]);
  const [name, setName] = useState("");
  const [option_name, setOname] = useState("");
  const [quantityget, setgQuantity] = useState("");
  const [valueget, setgValue] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [select, setSel] = useState("");
  const [value, setValue] = useState("");
  const [quantity, setQuantity] = useState("");
  const [select2, setSel2] = useState("");
  const [select3, setSel3] = useState("");
  const upPro = useParams();
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");
  const [requestSuccess, setRequestSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [userInfo, setuserInfo] = useState({
    file: [],
  });

  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file: event.target.files,
    });
  };

  function optiongo() {
    localStorage.setItem("Product_id", upPro.productId);
    navigate("/upoption");
  }

  function variantgo() {
    localStorage.setItem("Product_id", upPro.productId);
    navigate("/upvariant");
  }
  useEffect(() => {
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, []);
  const fetchData = async () => {
    const data = await fetch(
      "https://websitebuild.herokuapp.com/api/shop-owner/show-product/" +
        upPro.productId,
      {
        headers: {
          "auth-token": localStorage.getItem("user-info"),
        },
      }
    );

    const result = await data.json();
    setRequestSuccess(true);
    if (result.msg.includes("not found")) {
      setRequestSuccess(false);
    }
    setProduct(result.data.product);
    setImages(result.data.image);
    setOption(result.data.options);
    for (let i = 0; i < result.data.options.length; i++) {
      setOname(result.data.options[i].name);
    }
    for (let i = 0; i < result.data.variants.length; i++) {
      setQuantity(result.data.variants[i].quantity);
      setValue(result.data.variants[i].value);
    }
    setVariant(result.data.variants);
    setName(result.data.product.name);
    setPrice(result.data.product.price);
    setDescription(result.data.product.description);
    setBrand(result.data.product.brand);
  };

  if (isLoading) {
    return <Spinner />;
  }

  const upProduct = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("brand", brand);
    axios
      .post(
        "https://websitebuild.herokuapp.com/api/shop-owner/update-product/" +
          upPro.productId,
        formData,
        {
          headers: {
            "auth-token": localStorage.getItem("user-info"),
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setOpen(true);
        setMsg(res.data);
      });
  };

  async function delProduct() {
    let result = await fetch(
      "https://websitebuild.herokuapp.com/api/shop-owner/delete-product/" +
        upPro.productId,
      {
        method: "POST",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
          "auth-token": localStorage.getItem("user-info"),
        },
      }
    );
    result = await result.json();
    setRequestSuccess(true);
    if (result.msg.includes("not found")) {
      setRequestSuccess(false);
    }
    setOpen(true);
    setMsg(result);
    navigate("/products");
  }

  async function upOption() {
    let item = { option_name };
    let result = await fetch(
      "https://websitebuild.herokuapp.com/api/shop-owner/update-option/" +
        select,
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
    result = await result.json();
    setRequestSuccess(true);
    if (result.msg.includes("not found")) {
      setRequestSuccess(false);
    }
    setOpen(true);
    setMsg(result);
  }

  async function delOption() {
    let result = await fetch(
      "https://websitebuild.herokuapp.com/api/shop-owner/delete-option/" +
        select,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
          "auth-token": localStorage.getItem("user-info"),
        },
      }
    );
    result = await result.json();
    setRequestSuccess(true);
    if (result.msg.includes("not found")) {
      setRequestSuccess(false);
    }
    setOpen(true);
    setMsg(result);
  }

  async function upVariant() {
    let item = { value, quantity };
    let result = await fetch(
      "https://websitebuild.herokuapp.com/api/shop-owner/update-variant/" +
        select2,
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
    result = await result.json();
    if (result.msg.includes("not found")) {
      setRequestSuccess(false);
    }
    setOpen(true);
    setMsg(result);
  }

  async function delVariant() {
    let result = await fetch(
      "https://websitebuild.herokuapp.com/api/shop-owner/delete-variant/" +
        select2,
      {
        method: "POST",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
          "auth-token": localStorage.getItem("user-info"),
        },
      }
    );
    result = await result.json();
    setRequestSuccess(true);
    if (result.msg.includes("not found")) {
      setRequestSuccess(false);
    }
    setOpen(true);
    setMsg(result);
  }
  const handleSelect = (e) => {
    const value = e.target.value;
    setSel(
      {
        [e.target.name]: value,
      }.name
    );
  };

  async function deleteImg(id) {
    let result = await fetch(
      "https://websitebuild.herokuapp.com/api/shop-owner/delete-product-img/" +
        id,
      {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("user-info"),
        },
      }
    );
    result = await result.json();
    setRequestSuccess(true);
    if (result.msg.includes("not found")) {
      setRequestSuccess(false);
    }
    setOpen(true);
    setMsg(result);
  }
  const handleSelect2 = (e) => {
    const value = e.target.value;
    setSel2(
      {
        [e.target.name]: value,
      }.name
    );
  };

  const upload = async () => {
    setRequestSuccess(true);
    setOpen(!open);
    const formData = new FormData();
    for (let i = 0; i < userInfo.file.length; i++) {
      formData.append("images[]", userInfo.file[i]);
    }
    axios
      .post(
        "https://websitebuild.herokuapp.com/api/shop-owner/add-product-img/" +
          upPro.productId,
        formData,
        {
          headers: {
            "auth-token": localStorage.getItem("user-info"),
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setOpen(true);
        setMsg(res.data);
      });
  };
  return (
    <div className="product">
      <h1 className="productTitle">Product Edit</h1>
      <div className="dvF">
        <div>
          <div className="tstig">
            <Slide>
              {images.map((item) => (
                <div className="each-slide-effect">
                  {console.log(item)}
                  <div style={{ backgroundImage: `url(${item.image})` }}>
                    <button
                      value={item.id}
                      onClick={() => deleteImg(item?.id)}
                      className="btn-del"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </Slide>
          </div>
          <input
            type="file"
            name="images"
            onChange={handleInputChange}
            multiple
          />{" "}
          <button onClick={upload} value={setSel3} className="btn-up">
            Upload Another Image
          </button>
        </div>
        <div>
          <div className="divi">
            <div className="upP">
              <h1 className="txtProp">Information</h1>
              <div>
                <p>Name</p>
                <input
                  type="text"
                  placeholder={product.name + " " + "..."}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="tst"
                  required
                />
              </div>
              <div>
                <p>Description</p>
                <input
                  type="text"
                  placeholder={product.description + " " + "..."}
                  className="tst"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  multiple
                />
              </div>
              <div>
                <p>Brand</p>
                <input
                  type="text"
                  placeholder={product.brand + " " + "..."}
                  className="tst"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
              </div>
              <div>
                <p>Price</p>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder={product.price + " " + "..."}
                  className="tst"
                  required
                />
              </div>
            </div>
            <div className="btnUP">
              <button className="deBtn2" onClick={upProduct}>
                ✓
              </button>
              <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
              >
                <Alert
                  severity={requestSuccess ? "success" : "error"}
                  onClose={handleClose}
                  sx={{ width: "100%" }}
                >
                  {msg.msg}
                </Alert>
              </Snackbar>
              <button className="deBtn" onClick={delProduct}>
                X
              </button>
              <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
              >
                <Alert
                  severity={requestSuccess ? "success" : "error"}
                  onClose={handleClose}
                  sx={{ width: "100%" }}
                >
                  {msg.msg}
                </Alert>
              </Snackbar>
            </div>
          </div>
          <div className="divi">
            <div className="upP">
              <div className="flex36">
                <h1 className="txtProp">Options</h1>
                <button onClick={optiongo}>+</button>
              </div>
              {options.map((item) => (
                <div>
                  <button
                    name="name"
                    value={item?.id}
                    onClick={handleSelect}
                    className="bnmb"
                  >
                    Select
                  </button>
                  <input
                    type="text"
                    onChange={(e) => setOname(e.target.value)}
                    placeholder={item?.name}
                    className="tst"
                    required
                  />
                </div>
              ))}
            </div>
            <div className="btnUP2">
              <button className="deBtn2" onClick={upOption}>
                ✓
              </button>
              <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
              >
                <Alert
                  severity={requestSuccess ? "success" : "error"}
                  onClose={handleClose}
                  sx={{ width: "100%" }}
                >
                  {msg.msg}
                </Alert>
              </Snackbar>
              <button className="deBtn" onClick={delOption}>
                X
              </button>
              <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
              >
                <Alert
                  severity={requestSuccess ? "success" : "error"}
                  onClose={handleClose}
                  sx={{ width: "100%" }}
                >
                  {msg.msg}
                </Alert>
              </Snackbar>
            </div>
          </div>
          <div className="divi">
            <div className="upP2">
              <div className="flex36">
                <h1 className="txtProp">Variants Value</h1>
                <button onClick={variantgo}>+</button>
              </div>
              <div className="divi">
                <div>
                  {variant.map((item) => (
                    <div className="dva">
                      <button
                        name="name"
                        value={item?.id}
                        onClick={handleSelect2}
                        className="bnmb active"
                      >
                        Select
                      </button>

                      <input
                        type="text"
                        placeholder={item?.value}
                        onChange={(e) => setValue(e.target.value)}
                        className="tst"
                        required
                      />
                    </div>
                  ))}
                </div>
                <div className="value2">
                  {variant.map((item) => (
                    <input
                      type="number"
                      placeholder={item?.quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="tst2"
                      required
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="btnUP3">
              <button className="deBtn2" onClick={upVariant}>
                ✓
              </button>
              <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
              >
                <Alert
                  severity={requestSuccess ? "success" : "error"}
                  onClose={handleClose}
                  sx={{ width: "100%" }}
                >
                  {msg.msg}
                </Alert>
              </Snackbar>
              <button className="deBtn4" onClick={delVariant}>
                X
              </button>
              <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
              >
                <Alert
                  severity={requestSuccess ? "success" : "error"}
                  onClose={handleClose}
                  sx={{ width: "100%" }}
                >
                  {msg.msg}
                </Alert>
              </Snackbar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
