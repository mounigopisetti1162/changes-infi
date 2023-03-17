import * as Yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "./global";
import {  toast } from 'react-toastify';
import FileBase64 from 'react-file-base64';
import { Formik, Form, Field, ErrorMessage} from "formik";
import './signup.css'
import axios from "axios";
import Resizer from "./Resizer";


const Profilepage = () => {
  const [status,setstatus]=useState('Submit')
  const navigate=useNavigate()
  const [iteam,setiteam]=useState()
// validations of the form
const {id}=useParams()
  console.log(id)
  const [user,setuser]=useState("")

  // const [iteam,setiteam]=useState({image:''})
  // context.getpeople(id.id)
  useEffect(()=>{
    console.log("the secong")
  const getpeople=async()=>{
    console.log("first")
    const user=await axios.get(`${API}/user/users/${id}`)
    setuser(user.data)
    console.log(user.data)

 }
 
  getpeople()
 },[])
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("name is mandatary"),
    email: Yup.string().email().required(),
    lastname: Yup.string().required(),
    city: Yup.string(),
    discription: Yup.string(),
    profile: Yup
      .string()
      .min(10),
  });
//intial values
const [image,setimage]=useState({myfile:""})




  const initialValues = {

    profile:{ },
    firstname: user.firstname,
    lastname:"",
    email: "",
    city:"",
    discription:""
  };


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

    console.log("submited")
      setstatus('loding..') 
      console.log(values)
      console.log(image)

      
      
      const data={  firstname:values.firstname,email:values.email,lastname:values.lastname,password:values.password,confrimpassword:values.confrimpassword,profile:image
      }
      console.log(data)
      
      axios.post(`${API}/user/signup`,data)
     
      .then((datas)=>
      {
        console.log(datas)
    if(datas.status===401)
    {
      toast("email alredy exists")
      setstatus("error")
    throw new Error(datas.statusText)
    }
    setstatus("submited");
    navigate("/user/login")
    console.log(data.profile.myfile.Promise)

    toast("verify- Mail has been sent")    
    //adding token to the local storage
    // localStorage.setItem('token',data.token);
    })
    .catch((err)=>{
      toast("username alredy exist")
    })
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
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={values => {
       onSubmit(values);
      // console.log(values)
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
                   {/* <Field
                name="profile"
                type="text"
                className="input"
                placeholder="profile"
                values={iteam}
              /> */}
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
            <label className="label" htmlFor="password">
              Password
            </label>
            <div className="control">
              <Field
                name="password"
                type="password"
                className="input"
                placeholder="Password"
              />
              <ErrorMessage name="password" render={renderError} />
            </div>
          </div>


          <div className="field">
            <label className="label" htmlFor="confrimpassword">
             Confrim Password
            </label>
            <div className="control">
              <Field
                name="Confrim Password"
                type="password"
                className="input"
                placeholder="confrimpassword"
              />
              <ErrorMessage name="confrimpassword" render={renderError} />
            </div>
          </div>

          
          


          <button type="submit" className="btn btn-primary">
           {status}
          </button>
<br></br>
        <Link to='/user/login'>Alredy had an account</Link>
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

export default Profilepage;



// import React, { useContext, useEffect, useState } from 'react'
// import FileBase64 from 'react-file-base64';
// import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API } from '../loginandsignup/global';

// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// function Profile() {
//   const {id}=useParams()
//   console.log(id)
//   const [user,setuser]=useState("")

//   // const [iteam,setiteam]=useState({image:''})
//   // context.getpeople(id.id)
//   useEffect(()=>{
//     console.log("the secong")
//   const getpeople=async()=>{
//     console.log("first")
//     const user=await axios.get(`${API}/user/users/${id}`)
//     setuser(user.data)
//     console.log(user.data)

//  }
 
//   getpeople()
//  },[])
//   // console.log(user)
//   return (
//     // <div className='profile-page'>
//     //   this is the page
//     //   <div className='profile'>
//     //     <div className='profile-center'>
//     //       <div className="propic">
   
//       <>
//       <TableContainer component={Paper}>
// <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//           <TableCell className='heading'>Profile Page</TableCell>
//           </TableRow>
//           </TableHead>
//           <TableBody>
//           <TableRow
//               // key={row.name}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//       <img clasName='pro-pic' src={user.profile? user.profile.myfile:'/images/person/2.jpg'} alt='name' />
//               </TableCell>
//             </TableRow>
//             <TableRow
//               // key={row.name}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
// {user.firstname}
//             </TableRow>
//             <TableRow>
// {user.lastname}

//             </TableRow>
//             <TableRow>
// {user.email}
//             </TableRow>
//             <TableRow>
// {user.city}
//             </TableRow>
//             <TableRow>
// {user.discription}
//             </TableRow>
            
//       </TableBody>
//       </Table>
//     </TableContainer>
//     </>

          
//   )
// }

// export default Profile