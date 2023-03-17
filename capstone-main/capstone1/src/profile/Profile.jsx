import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../loginandsignup/global";
import {  toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage} from "formik";
import Resizer from '../loginandsignup/Resizer';

const Profile = () => {
  const [status,setstatus]=useState('Submit')
  const navigate=useNavigate()
// validations of the form
const {id}=useParams()
  console.log(id)
  const [user,setuser]=useState("")

  useEffect(()=>{
    console.log("the secong")
  const getpeople=async()=>{
    console.log("first")
    const user=await axios.get(`${API}/user/users/${id}`)
    setuser(user.data)
    setpersondata({...initialValues,...user.data})
    console.log(user.data)

 }
 
  getpeople()
 },[])
 console.log(user)
  const validationSchema = Yup.object().shape({
    firstname: Yup.string(),
    email: Yup.string().email(),
    lastname: Yup.string(),
    city: Yup.string(),
    discription: Yup.string(),
    profile: Yup,
  });
//intial values
const [image,setimage]=useState({myfile:""})




  const initialValues = {
    profile:"",
    firstname: "",
    lastname:"",
    email: "",
    city:"",
    discription:""
  };
  const [persondata,setpersondata]=useState(initialValues)

  console.log(user)


  console.log("image")



const handelfileupload= async (e)=>{

  try {
    const file = e.target.files[0];
    const image = resizeFile(file);
    image.then((data)=>data).then(data=>setimage({myfile:data}))
    //   function (value) {myimage(value)}
    // )
    // setimage({myfile:image})
    console.log(image);
  } catch (err) {
    console.log(err);
  }
}
console.log(image)
// console.log(image.myfile[0])


const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
  const onSubmit = (values) => {
    
      
      const data={  firstname:values.firstname,email:values.email,lastname:values.lastname,city:values.city,profile:image,discription:values.discription
      }
      console.log(data)
      axios.post(`${API}/profile/${id}`,data).then((datas)=>console.log(datas))
    
    }
  //change the color
    const renderError = (message) => <p className="help is-danger">{message}</p>;
  // console.log(iteam)
  

// console.log(image)

  return (
    <>
    {/* <h1>sign up page</h1> */}
    <div className="sign">
    <div className="signup">
      <div className="signwrapper">
<div className="signup-1">
<h3 className="loginLogo">InFiChat</h3>
<img className="loginimage" src='https://cdn.dribbble.com/users/1894420/screenshots/11700268/online-video-chat.gif' alt='name'/>
      </div>
      <div className="signup-2">
      <Formik
    initialValues={persondata}
    enableReinitialize={persondata}
    validationSchema={validationSchema}
    onSubmit={values => {
       onSubmit(values);
      console.log(values)
    }}>

    <div className="form">
      <Form className="form-0">
        <div
          className="container"
          style={{
            width: "60%",
          }}
        >
<div className="form-1">
  <div className="form-2">

  <div className="field">
            <label className="label" htmlFor="confrimpassword">
             Profile Picture
            </label>
            <div className="control">
              <img src={user.profile?user.profile.myfile:"/images/person/no-avatar.png"} alt='' className="signup-img"/>
             <input
             name="profile"
             type="file"
            //  type="text"
             className="input-file"
             id='file-upload'
             accept=".jpeg,.png,.jpg"
             placeholder="profile"
             onChange={(e)=>handelfileupload(e)}/>
                
              <ErrorMessage name="profile" render={renderError} />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="firstname">
              First Name
            </label>
            <div className="control">
              <Field
                name="firstname"
                type="text"
                className="input"
                placeholder="Name"
               
              />
              <ErrorMessage name="firstname" render={renderError} />
            </div>
          </div>
          

          <div className="field">
            <label className="label" htmlFor="email">
              Email Address
            </label>
            <div className="control">
              <Field
                name="email"
                type="text"
                className="input"
                placeholder="Email address"
                default
              />
              <ErrorMessage name="email" render={renderError} />
            </div>
          </div>


          <div className="field">
            <label className="label" htmlFor="lastname">
            Last Name
            </label>
            <div className="control">
              <Field
                name="lastname"
                type="text"
                className="input"
                placeholder="Last Name"
              />
              <ErrorMessage name="lastname" render={renderError} />
            </div>
          </div>
      

          <div className="field">
            <label className="label" htmlFor="City">
              City
            </label>
            <div className="control">
              <Field
                name="city"
                type="text"
                className="input"
                placeholder="City"
               
              />
              <ErrorMessage name="city" render={renderError} />
            </div>
          </div>


          <div className="field">
            <label className="label" htmlFor="Discription">
              Discription
            </label>
            <div className="control">
              <Field
                name="Discription"
                type="text"
                className="input"
                placeholder="Name"
               
              />
              <ErrorMessage name="Discription" render={renderError} />
            </div>
          </div>
          
          


          <button type="submit" className="btn btn-primary">
           {status}
          </button>
<br></br>
        
 </div>
</div>
        </div>
      </Form>
      </div>
     

      </Formik>
      </div>
    </div>
    </div>
    </div>
      </>
  )
};

export default Profile;



