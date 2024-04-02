import axios from 'axios'
import React,{useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import FormHeaderTemplate from './FormHeaderTemplate';
import "./student.css"
// import { ToastContainer } from 'react-bootstrap';

const initialValues = { name:'', gender:'', b_date:'', lives:'' }



const validationSchema = Yup.object({
    name: Yup.string().required('Name is Required !'),
    gender: Yup.string().required('Gender is Required !'),
    b_date: Yup.date().required('Birth Date is Required !'),
    lives: Yup.string().required('Lives is Required !'),
});

function Student() {
  let fields = [
    {"name":'name',"type":'text',"label":"Name","defaultValue":''},
    {"name":'gender',"type":'select',"label":"Gender","defaultValue":''},
    {"name":'b_date',"type":'date',"label":"Brith Date","defaultValue":''},
    {"name":'lives',"type":'text',"label":"lives","defaultValue":''},
  ]

  const [message, setMessage] = useState('')

  const formik = useFormik({initialValues: initialValues,
    onSubmit: async (values,{resetForm})=> {
      // console.log('From Submit : ',values)
      const formData = {
        name:values.name,
        gender:values.gender,
        b_date:values.b_date,
        lives:values.lives,
        lives:values.lives,
        user_id:localStorage.getItem("user_id"),
      }
    
      const res = await axios.post("http://localhost:8080/api/school/student.php",formData)
      if(res.data.Success){
        setMessage(res.data.Success)
        toast.success("Student Add Successfully")
        resetForm(true)
      }else{
        setMessage(res.data.Wrong)
        toast.error("Plase Check the Student Data")
      }},
    validationSchema })


  return (
    <>
      <div className='container mt-3'>
        <FormHeaderTemplate fields={fields} title="Students" options={[]} name="student"
        validationSchema={validationSchema} formik={formik} onSubmit={formik.onSubmit}/>
      </div>
    </>
  )
}

export default Student