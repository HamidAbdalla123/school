import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import FormHeaderTemplate from './FormHeaderTemplate';
import "./student.css"

const initialValues = { name:'', student:'', realtive:'' }

const validationSchema = Yup.object({
  name: Yup.string().required('Name is Required !'),
  student: Yup.number().required('You Must Select Student !'),
  realtive: Yup.string().required('Realtive is Required !'),
});

const Parent = ()=> {
  let fields = [
    {"name":'name',"type":'text',"label":"Name","defaultValue":''},
    {"name":'student',"type":'select',"label":"Student","defaultValue":''},
    {"name":'realtive',"type":'text',"label":"Realtive","defaultValue":''},
  ]
  const [options,setOptions] = useState([])

  const formik = useFormik({
    initialValues,
    onSubmit: async (values,{resetForm})=> {
      const formData = {
        name:values.name,
        student:values.student,
        realtive:values.realtive,
        user_id:localStorage.getItem("user_id"),
      }
      const res = await axios.post("http://localhost:8080/api/school/Parent.php",formData)
      if(res.data.Success){
        toast.success("Parent Add Successfully")
        resetForm(true)
      }else{
        toast.error("Plase Check the Student Data")
      }
    },
    validationSchema,
  })


  useEffect(() => {
      fetch("http://localhost:8080/api/school/student.php")
      .then(response => response.json())
      .then(data     => setOptions(data) )
      .catch(error   => console.log(error))
  }, []);


  return (
    <>
      <div className='container mt-5'>
        <FormHeaderTemplate fields={fields} title="Students" options={options} name="parent"
        validationSchema={validationSchema} formik={formik} onSubmit={formik.onSubmit}
        />
      </div>
    </>
  )
}

export default Parent;