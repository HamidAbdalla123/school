import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import FormHeaderTemplate from './FormHeaderTemplate';
import "../Forms/student.css"

const initialValues = { name:'', b_date:'', subject:'' }

const validationSchema = Yup.object({
  name: Yup.string().required('Name is Required !'),
  b_date: Yup.date().required('You Must Select Date !'),
  subject: Yup.string().required('Subject is Required !'),
});

const Teacher = ()=> {
  let fields = [
    {"name":'name',"type":'text',"label":"Name","defaultValue":''},
    {"name":'b_date',"type":'date',"label":"Birth Date","defaultValue":''},
    {"name":'subject',"type":'select',"label":"Subject","defaultValue":''},
  ]
  const [options,setOptions] = useState([])

  const formik = useFormik({
    initialValues,
    onSubmit: async (values,{resetForm})=> {
      const formData = {
        name:values.name,
        b_date:values.b_date,
        subject_id:values.subject,
        user_id:localStorage.getItem("user_id"),
      }
      console.log('formData => ',formData)
      const res = await axios.post("http://localhost:8080/api/school/Teacher.php",formData)
      console.log('res => ',res.data)
      if(res.data.Success){
        toast.success("Teacher Add Successfully")
        resetForm(true)
      }else{
        toast.error("Plase Check the Teacher Data")
      }
    },
    validationSchema,
  })

  useEffect(() => {
      fetch("http://localhost:8080/api/school/Subject.php")
      .then(response => response.json())
      .then(data     => setOptions(data) )
      .catch(error   => console.log(error))
  }, []);


  return (
    <>
    <div className='container mt-5'>
      <FormHeaderTemplate fields={fields} title="Teachers" options={options} name="teacher"
      validationSchema={validationSchema} formik={formik} 
      />
    </div>
    </>
  )
}

export default Teacher;