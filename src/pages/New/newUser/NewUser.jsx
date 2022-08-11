import "./newUser.css";
import React ,{useState} from 'react'
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "../../../components/button/button"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



export default function NewUser() {


  const [first_name,setfName]=useState("")
  const [second_name,setsName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [password_confirmation,setCPassword]=useState("")
  const [phone_number,setPhone]=useState("")
  const [address,setAddress]=useState("")
  const [city,setCity]=useState("")
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");
  const [requestSuccess, setRequestSuccess] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  
 async function newUser(){
  let item ={city,password_confirmation,address,first_name,second_name,phone_number,email,password}


  let result= await fetch("https://websitebuild.herokuapp.com/api/shop-owner/add-customer",
  {
    method:'POST',
    body:JSON.stringify(item),
    headers:{
      "Content-Type":'application/json',
      "X-Requested-With":'XMLHttpRequest',
      "Accept":'application/json',
      "auth-token": localStorage.getItem("user-info")
    }
  })
  result = await result.json();
  setRequestSuccess(true)
    if(result.msg.includes("required")){
      setRequestSuccess(false)
    }
    else if(result.msg.includes("been taken"))
    {
      setRequestSuccess(false)
    }
    else if(result.msg.includes("greater than"))
    {
      setRequestSuccess(false)
    }
    else if(result.msg.includes("password"))
    {
      setRequestSuccess(false)
    }
  setOpen(true);
  setMsg(result);
}
  return (

    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <div className="btn-lft">
      <Button link="/plan" text={"Go To Plan"} />
      </div>
      <div className="newUserForm2">
        <div className="newUserItem">
          <h1 className="usernm">First Name</h1>
          <input type="text" placeholder="john" value={first_name} 
          onChange={(e)=>setfName(e.target.value)} required/>
        </div>
        <div className="newUserItem">
          <h1 className="usernm">Last Name</h1>
          <input type="text" placeholder="John Smith" value={second_name} 
          onChange={(e)=>setsName(e.target.value)} required/>
        </div>
        <div className="newUserItem">
          <h1 className="usernm">Email</h1>
          <input type="email" placeholder="john@gmail.com" value={email} 
          onChange={(e)=>setEmail(e.target.value)} required/>
        </div>
        <div className="newUserItem">
          <h1 className="usernm">Password</h1>
          <input type="password" placeholder="password" value={password} 
          onChange={(e)=>setPassword(e.target.value)} required/>
        </div>
        <div className="newUserItem">
          <h1 className="usernm">Password Confirmation</h1>
          <input type="password" placeholder="password confirm" value={password_confirmation} 
          onChange={(e)=>setCPassword(e.target.value)} required/>
        </div>
        <div className="newUserItem">
          <h1 className="usernm">Phone</h1>
          <input type="number" placeholder="+1 123 456 78" value={phone_number} 
          onChange={(e)=>setPhone(e.target.value)} required maxLength={20} />
        </div>
        <div className="newUserItem">
          <h1 className="usernm">Address</h1>
          <input type="text" placeholder="New York | USA" value={address} 
          onChange={(e)=>setAddress(e.target.value)} required/>
        </div>
        <div className="newUserItem">
          <h1 className="usernm">City</h1>
          <input type="text" placeholder="New York | USA" value={city} 
          onChange={(e)=>setCity(e.target.value)} required/>
        </div>
        <button className="newUserButton3"  onClick={newUser}>Create</button>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} >
        <Alert severity={requestSuccess?'success': 'error'} onClose={handleClose} sx={{ width: "100%" }}>
            {msg.msg}
          </Alert>
      </Snackbar>
      </div>
    </div>
  );
}
