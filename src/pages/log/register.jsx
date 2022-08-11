import { Link } from 'react-router-dom';
import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "./home-css101.css"

export default function Register()
{
    
    const [first_name,setfName]=useState("")
    const [second_name,setsName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [password_confirmation,setPasswordC]=useState("")
    const [phone_number,setPhone]=useState("")
    const [site_name,setSite_Name]=useState("")
    const [site_address,setSiteaddr]=useState("")
    const [country,setCountry]=useState("")
    const [government,setGovernment]=useState("")
    const [city,setCity]=useState("")
    const navigate=useNavigate();

    
    async function signUp(){

        let item ={city,first_name,second_name,government,password_confirmation,phone_number,site_address,site_name,country,email,password}
        
      console.log(item)
        let result= await fetch("http://websitebuild.herokuapp.com/api/auth-shop-owner/register",
        {
          method:'POST',
          body:JSON.stringify(item),
          headers:{
            "Content-Type":'application/json',
            "X-Requested-With":'XMLHttpRequest',
            "Accept":'application/json',
            mode:'no-cors'
          }
        })
       console.log(result)
        let status = result.status
        let response = result.clone()
        response = await response.json()
        result = await result.json()
        localStorage.setItem("status",status)
        if(status === 200){
          localStorage.setItem("user-info",result.data.token)
            navigate("/home");
        }
        else if(status === 400 ){
            let recievedError = response.msg.split(',')
            let errorString = ""
            
            for(var i = 0; i< recievedError.length; i++){
                errorString += recievedError[i] + "\n"
            }
            
            alert(errorString)
            
        }
      }
        return(
        <div>
             <section className="sub-header">
            <nav>
                <a href="home101.html"><img src="asstes/logo.png" alt=""/></a>
                <div className="nav-links" id="navLinks">
                    <i className="fa fa-times"  ></i>
                    <ul>
                    <li><a href="/homepage">Home</a></li>
                    <li><a href="/tutorial">Tutorial</a></li>
                    <li><a href="/price">Pricing</a></li>
                    <li><a href="/about">About</a></li>
                        
                    </ul>
                </div>
                <i className="fa fa-bars"  ></i>
            </nav>
            <h1>Login / Register</h1>
        </section>

        {/*<!------Reg--------->*/}
        <div className="form-box">
            <div className="button-box">
            <div id="btnn"></div>
                    <Link to="/"><button type="button" className="toggle-btn" >Log in</button></Link>
                    <button type="button" className="toggle-btn" >Register</button>
            </div>
            <div id="login"  className="input-group">
            <input type="text" className="inpit-feild" placeholder="First name"
                value={first_name} onChange={(e)=>setfName(e.target.value)} required maxLength={15}/>
                <input type="text" className="inpit-feild" placeholder="Second name"
                value={second_name} onChange={(e)=>setsName(e.target.value)} required maxLength={15}/>
                <input type="email" className="inpit-feild" placeholder="Email"
                value={email} onChange={(e)=>setEmail(e.target.value)} required pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"/>
                <input type="password" className="inpit-feild" placeholder="Password"
                value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                <input type="password" className="inpit-feild" placeholder="Confirm Password"
                value={password_confirmation} onChange={(e)=>setPasswordC(e.target.value)} required/>
                <input type="number" className="inpit-feild" placeholder="Phone Number"
                value={phone_number} onChange={(e)=>setPhone(e.target.value)} required min="01000000000" max="01999999999"/>
                <input  type="text" className="inpit-feild" placeholder="site name" 
                value={site_name} onChange={(e)=>setSite_Name(e.target.value)} required/>
                <input  type="text" className="inpit-feild" placeholder="site address" 
                value={site_address} onChange={(e)=>setSiteaddr(e.target.value)} required/>
                <input  type="text" className="inpit-feild" placeholder="country" 
                value={country} onChange={(e)=>setCountry(e.target.value)} required/>
                <input  type="text" className="inpit-feild" placeholder="government" 
                value={government} onChange={(e)=>setGovernment(e.target.value)} required/>
                <input  type="text" className="inpit-feild" placeholder="city" 
                value={city} onChange={(e)=>setCity(e.target.value)} required/>
                <button type="submit" className="submit-btn" onClick={signUp}>Sign Up</button>
            </div>
        </div>
    
        {/*<!-----Footer-------->*/}
        <section className="footer">
           <h4>
               About us 
           </h4>
           <p>We make it easy for everyone to create a beautiful,<br/> professional web presence.</p>
           <div className="icons">
              <i className="fa fa-facebook" ></i>
              <i className="fa fa-twitter" ></i>
              <i className="fa fa-instagram" ></i>
              <i className="fa fa-linkedin" ></i>
           </div>
           <p> <i className="fa fa-heart-o"></i> Deloped by swifter</p> 
        </section>
        </div>
        );
    }

