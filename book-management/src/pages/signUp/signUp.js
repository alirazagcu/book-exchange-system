import React, {useState, useEffect} from 'react'
import Input from "../../components/input/input";
import google from "../../assets/images/google.png";
import fb from "../../assets/images/fb.png";
import { useDispatch, useSelector } from "react-redux";
import "./signUp.css";
import {
  BrowserRouter as Router,
  useHistory
} from "react-router-dom";
import * as Actions from "../../redux/actions"
import reducer from "../../redux/reducers";
import withReducer from "../../store/withReducer";
import Loader from "../../components/Loader/Loader";
import SnackBarMsg from "../../components/ErrorMessage/ErrorSnackBar";
import setAuthorizationToken from "../../utils/authorization/authorization";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { GoogleLogin } from 'react-google-login';
import RoleModel from "../../components/model/roleModel";

function Signup(props) {
  const dispatch = useDispatch();
  const history= useHistory();
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [isSnackbar, setIsSnackBar] = useState(false);
  const [snackBarMesssage, setSnackBarMessage] = useState("");
  const [snackBarSverity, setSnackBarSverity] = useState("error");
  const [socialMediaRole, setSocialMediaRole] = useState("")
  const [socialMediaObject, setSocialMediaObject] = useState({})
  const [inputValueState, setInputValueState] = React.useState({
      inputValues:{
        first_name : "",
        last_name : "",
        email : "",
        password : "",
        confirm_password:"",
        role :"buyer"
    }
  }
  )

  const add_confirmation = useSelector(
    ({ SignUpReducers }) => SignUpReducers.signUpReducers
  );

  const sign_in_confirmation = useSelector(
    ({ SignUpReducers }) => SignUpReducers.signInReducers
  )
  React.useEffect(()=> {
    if (props.location && props.location.state && props.location.state.from == "signOut") {
      localStorage.clear()
      add_confirmation.data = {};
      sign_in_confirmation.data = {};
      dispatch(Actions.signOut(true));
      dispatch(Actions.resetSignIn({}));
      setOpen(false)
    }
  }, [props.location.state])


  React.useEffect(() => {
    if (add_confirmation.data && add_confirmation.data.success === true) {
      setIsLoading(false)
      localStorage.setItem('token', add_confirmation.data.user.token);
      localStorage.setItem('userName', add_confirmation.data.user.userName);
      setAuthorizationToken(add_confirmation.data.user.token)
      history.push({
        pathname: "/books"
      })
      setOpen(false)
    }
    else if (add_confirmation.isLoading) {
      setIsLoading(true);
    }
    if (add_confirmation.errMsg) {
      setIsSnackBar(true)
      setSnackBarSverity("error")
      setSnackBarMessage(add_confirmation.errMsg)
      setIsLoading(false)
    }

  }, [add_confirmation, dispatch]);

  React.useEffect(() => {
    if (sign_in_confirmation.data && sign_in_confirmation.data.success === true) {
      setIsLoading(false)
      localStorage.setItem('token', sign_in_confirmation.data.user.token);
      localStorage.setItem('userName', sign_in_confirmation.data.user.userName);
      setAuthorizationToken(sign_in_confirmation.data.user.token)
      history.push({
        pathname: "/books"
      })
      setOpen(false)
    }
    if (sign_in_confirmation.errMsg) {
      setOpen(true)
    }

  }, [sign_in_confirmation, dispatch]);

  useEffect(()=>{
    if(socialMediaRole){
      const obj = { 
        ...socialMediaObject,
        role: socialMediaRole
      }
      dispatch(Actions.signUpService(obj))
      setOpen(false)
    }
  }, [socialMediaRole])

  const handleSubmit = (e) => {
    e.preventDefault();
    const {inputValues}   = inputValueState;
    const {password, confirm_password} = inputValues
    if(password.length >=8 && password === confirm_password && confirm_password.length >=8 ){
      setIsLoading(true)
      dispatch(Actions.signUpService(inputValues))
      // signUpService(inputValues)
    }
    else{
      setIsSnackBar(true)
      setSnackBarSverity("error")
      setSnackBarMessage("password did match or password should be greater than 8 length")
      setIsLoading(false)
      // alert("password did match or password should be greater than 8 length");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const {inputValues}   = inputValueState;
    setInputValueState({
        inputValues: {
            ...inputValues,
            [name]: value,
        }
    })
  }

  const responseFacebook = (response) => {
    const {status, name, userID} = response;
    if(!status && response){
      const loginVerifier = {
        email: `${userID}@gamil.com`,
        password: "12345678"
      }
      dispatch(Actions.signInService(loginVerifier))
      const socialMediaObject = {
        first_name : name,
        last_name : name,
        email : `${userID}@gamil.com`,
        password : "12345678",
        confirm_password:"12345678",
        role: "buyer"
      }
      setSocialMediaObject(socialMediaObject)
    }
  }

  const responseGoogle = (response) =>{
    const {error, profileObj}= response;
    if(!error && response){
      const loginVerifier = {
        email: profileObj.email,
        password: "12345678"
      }
      dispatch(Actions.signInService(loginVerifier))
      const socialMediaObject = {
        first_name : profileObj.name,
        last_name : profileObj.name,
        email : profileObj.email,
        password : "12345678",
        confirm_password:"12345678",
        role: "buyer"
      }
      setSocialMediaObject(socialMediaObject)
    }
  }

  const handleClose = () =>{
    setOpen(false)
  }
  return (
    <div>
    <RoleModel open={open} handleCloseCallBack={handleClose} setSocialMediaRole={setSocialMediaRole}/>
      {isSnackbar && <SnackBarMsg snackBarSverity={snackBarSverity} snackBarMesssage={snackBarMesssage} setIsSnackBar={setIsSnackBar}/>}
    {
      isLoading 
      ? <Loader />
      :
      <div className="flex">
      <div className="hidden lg:block xl:block 2xl:block sign-up w-3/5">
      </div>
      <div className=" w-full  lg:w-2/5 xl:w-2/5 2xl:w-2/5 h-screen bg-gray-900  flex flex-col justify-center items-center" required>
        <form onSubmit={handleSubmit} className="w-3/5">
          <div className="flex justify-center pb-2">
            <p className="text-2xl font-semibold text-white text-lg">Sign Up</p>
          </div>
          <div className="flex justify-center pb-4">
            <div className="rounded-full p-2  text-white">
            <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
            </div>
          </div>
          <div>
            <Input placeholder="First Name" type="text" name={"first_name"} onChange={handleChange}/>
          </div>
          <div className="pt-2">
            <Input placeholder="Last Name" type="text" name={"last_name"}  onChange={handleChange}/>
          </div>
          <div className="pt-2">
            <Input placeholder="Email" type="email" name={"email"}  onChange={handleChange}/>
          </div>
          <div className="pt-2">
            <Input placeholder="Password" type="password" name={"password"}  onChange={handleChange}/>
          </div>
          <div className="pt-2">
            <Input placeholder="Confirm Password" type="password" name={"confirm_password"}  onChange={handleChange}/>
          </div>
          <div className="pt-2">
            <select  onChange={handleChange} name="role" style={{background: "#111827"}} className="w-full border rounded border-gray-200 border-opacity-30 focus:outline-none focus:ring-1 focus:ring-blue-600  bg-transparent pt-2 pb-2 pl-2 outline-none text-white text-base">
              <option value="seller">Seller</option>
              <option value="buyer" selected>Buyer</option>
            </select>
          </div>
          <div className="flex justify-center pt-4">
            <button className="w-full bg-blue-600 rounded focus:outline-none pt-1 pb-1 pl-3 pr-3 text-white text-lg hover:bg-blue-500">
              Sign Up
            </button>
          </div>
        </form>
        <div className="pt-4">
          <p className="text-gray-700 text-sm">
            &#x23AF; &#x23AF; &#x23AF; &#x23AF; &#x23AF;Or Connect With&#x23AF;
            &#x23AF; &#x23AF; &#x23AF; &#x23AF;
          </p>
        </div>
        <div className="flex justify-center pt-4">
          <div>
          <GoogleLogin
            clientId="721068158804-q5kdp74uge5me0pe2lkd72nu5gui6lai.apps.googleusercontent.com"
            render={renderProps => (
              <button onClick={renderProps.onClick} 
                className="flex items-center mr-2 border-2 border-blue-600 border-opacity-40 focus:outline-none rounded pt-1 pb-1 pl-3 pr-3 text-white text-lg hover:bg-blue-500">
                <img src={google} className="mr-2" alt="google"/>Google
              </button>
              )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
            
          </div>
          <div>
            <FacebookLogin
              appId="2635221203443734"
              autoLoad
              callback={responseFacebook}
              render={renderProps => (
                <button onClick={renderProps.onClick}
                    className="flex items-center ml-2 border-2 border-blue-600 border-opacity-40 focus:outline-none rounded pt-1 pb-1 pl-3 pr-3 text-white text-lg hover:bg-blue-500">
                  <img src={fb} className="mr-2" alt="facebook"/>Facebook
                </button>
              )}
            />
            
          </div>
        </div>
        <div className="flex justify-center pt-4 text-gray-700 text-sm">
          <p>Already have an account? <span className="text-blue-600 cursor-pointer hover:text-blue-500" onClick={()=>{history.push('/sign-in')}}>Log In</span></p>
        </div>
      </div>
    </div>
    }
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     users: state.app.users,
//     userRecord: state.app.importProductRecord,
//     user: state.app.user,
//   };
// };
export default withReducer("SignUpReducers", reducer)(Signup);

// export default connect(null, mapDispatchToProps)(Signup);
