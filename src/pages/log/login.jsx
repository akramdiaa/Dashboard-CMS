import React ,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom';

export default function Login(){
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate = useNavigate();

   async function signUp(){

        let item ={email,password}
        let result= await fetch("http://websitebuild.herokuapp.com/api/auth-shop-owner/login",
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

      async function reset(){
        let item ={email}
        let result= await fetch("http://websitebuild.herokuapp.com/api/send-email",
        {
          method:'POST',
          body:JSON.stringify(item),
          headers:{
            "Content-Type":'application/json',
            "X-Requested-With":'XMLHttpRequest',
            "Accept":'application/json',
          }
        })
        result = await result.json()
        if(result.message === "The given data was invalid.")
        {
          alert("Enter the email");
          
        }else{
          navigate("/forgot");
          alert(result.message);
        }
        
      }
        return(
        <div>
             <section className="sub-header">
            <nav>
                <a href="home101.html"><img src="asstes/logo.png" alt=""/></a>
                <div className="nav-links" id="navLinks">
                    <i className="fa fa-times" ></i>
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

        {/*<!------Login--------->*/}
        <div className="form-boxx">
            <div className="button-box">
                    <div id="btn"></div>
                    <button type="button" className="toggle-btn" >Log in</button>
                    <Link to="/reg"> <button type="button" className="toggle-btn">Register</button></Link>
                   
                
            </div> 
            <div className="social-icons">
                <img src="fb.png" alt=""/>
                <img src="tw.png" alt=""/>
                <img src="gp.png" alt=""/>
            </div>
            <div id="login"  className="input-group">
                <input type="email" className="inpit-feild" placeholder="Email"
                value={email} onChange={(e)=>setEmail(e.target.value)}  required pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"/>
                <input type="password" className="inpit-feild" placeholder=" Password"
                value={password} onChange={(e)=>setPassword(e.target.value)}  required/>
                <button  className="btn-forg" onClick={reset}>Forgot Password?</button>
                <button className="submit-btn" onClick={signUp} >Log In</button>
    
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
        <button></button>
        </div>
        
        
        );
    }
