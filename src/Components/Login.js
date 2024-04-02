import React,{useState} from 'react'
import { PiEnvelopeSimpleOpenFill , PiEyeSlashFill,PiEyeFill } from 'react-icons/pi'
import axios from 'axios'
import user from './user.jpg'
import './Login.css'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {

  const [formValue ,setFormValue] = useState({ email:'', pass:''})
  const [message ,setMessage] = useState('')
  const navigate = useNavigate()

  const handelInput = (e)=> {
      setFormValue({ ...formValue, [e.target.name]:e.target.value })
  }

  const [renderEye ,setRenderEye] = useState(true)

  const handelClick = (e)=> {  
    let pass = document.getElementById("pass")
    if( pass.getAttribute("type") == "password"){
      pass.setAttribute("type","text")
      setRenderEye(false)
    }else{
      pass.setAttribute("type","password")
      setRenderEye(true)

    }  
    console.log(props)
  }
  
  const handelSubmit = async (e)=> {
    e.preventDefault();
    // console.log(formValue)
    const formData = {
      email: formValue.email, 
      pass: formValue.pass 
    }
    
    const getUserData = await axios.get("http://localhost:8080/api/school/user.php?email="+formData.email+"&pass="+formData.pass);

    if(getUserData.data.Success){
      console.log(getUserData.data.Success)
      props.setIsLogin(true)
      props.setUser(getUserData.data.user)
      props.setUser(getUserData.data.id)

      localStorage.setItem("user_id",getUserData.data.id)
      localStorage.setItem("isLogin",true)
      localStorage.setItem("user",getUserData.data.user)
      navigate("/home")
    }else{
      setMessage(getUserData.data.Wrong)
    }

  }
  
  return (
    <> 
      <div className='container'>
        <div className='row login-section '>
          <div className='col-12 cutsom-sm login-page'>
          <div className='login-header'> <h2> Plase Login </h2> </div>
            <div className='user-img-div'>
              <img src={user} className="user-img"/>
            </div>
    
            <div className='login-div mt-3'>
              <form className='mt-2 w-70' onSubmit={handelSubmit}>

                    <label className="form-label" htmlFor="email">Email Address : </label>
                    <div className="mb-4 input-group">
                        <input className="form-control custom-input" type="text" name="email" placeholder="e.g example@gmail.com" value={formValue.email} onChange={handelInput}  />
                        <span className="input-group-text custom-icon"> <PiEnvelopeSimpleOpenFill /> </span>
                   </div>


                    <label className="form-label" htmlFor="pass">Password : </label>
                    <div className="mb-4 input-group">
                        <input className="form-control custom-input" type="password" id="pass" name="pass" placeholder="e.g example@gmail.com" value={formValue.pass} onChange={handelInput}  />
                        <span className="input-group-text eye custom-icon"  onClick={handelClick} >
                          {renderEye ? <PiEyeSlashFill /> : <PiEyeFill /> }
                        </span>
                    </div> 

                    <div className="mb-4 text-center">
                        <button type='submit' className="btn btn-secondary">Submit</button>
                    </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;