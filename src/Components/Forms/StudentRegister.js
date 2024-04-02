import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import FormHeaderTemplate from './FormHeaderTemplate';
import "./student.css"

const initialValues = { name:'', student:'', level:'' ,year:'',date:''}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is Required !'),
  student: Yup.number().required('You Must Select Student !'),
  level: Yup.string().required('Realtive is Required !'),
  year: Yup.string().required('Academic Year is Required !'),
  date: Yup.date().required('Date is Required !'),
});

const StudentRegister = ()=> {
  let fields = [
    {"name":'student',"type":'select',"label":"Student","defaultValue":''},
    {"name":'level',"type":'text',"label":"Level","defaultValue":''},
    {"name":'year',"type":'text',"label":"Academic Year","defaultValue":''},
    {"name":'date',"type":'date',"label":"Date","defaultValue":''},
  ]
  const [options,setOptions] = useState([])

  const formik = useFormik({
    initialValues,
    onSubmit: async (values,{resetForm})=> {
      const formData = {
        student:values.student,
        level:values.level,
        year:values.year,
        date:values.date,
        user_id:localStorage.getItem("user_id"),
      }
      const res = await axios.post("http://localhost:8080/api/school/StudentRegister.php",formData)
      if(res.data.Success){
        toast.success("Student Registered Successfully")
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
        <FormHeaderTemplate fields={fields} title="Student Register" name="student-register"
        options={options} validationSchema={validationSchema} formik={formik}
        />
      </div>
    </>
  )
}


export default StudentRegister