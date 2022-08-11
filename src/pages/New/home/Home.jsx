import "./home.css";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();

  function start(){
    navigate('/store');
  }
  return (
    <div className="home">
      {/*<!------about us content--------->*/}
      <img className="img_center" src="asstes/4207.jpg" alt="" width="650" height="450" />
      <h1 className="title-home">Welcome to Swifter create a website you are proud of</h1>
      
      <div className="activate-btn102">
        <button className="activate-btn2" onClick={start}>
        Let's Start!
        </button>
      </div>
    </div>
  );
}