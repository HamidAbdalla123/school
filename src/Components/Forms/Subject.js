import React,{useState,useEffect} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';
import FormHeaderTemplate from './FormHeaderTemplate';

const initialValues = { name:'', full_degree:0, success_degree:0, teacher:'' }

const validationSchema = Yup.object({
  name: Yup.string().required('Name is Required !'),
  full_degree: Yup.number().integer('Full Degree Must Be Integer Number').min(0,'Full Degree Must Be Larg Than Zero !').required('Full Degree is Required !'),
  success_degree:Yup.number().integer('Success Degree Must Be Integer Number').min(0,'Success Degree Must Be Larg Than Zero !').max(Yup.ref("full_degree"),'Success Degree Must Be Less Than Full Dagree').integer('Success Degree Must Be Integer Number').required('Success Degree is Required !'),
  teacher: Yup.string().required('Teacher is Required !'),
});



const Subject = ()=> {
  let fields = [
    {"name":'name',"type":'text',"label":"Name","defaultValue":''},
    {"name":'full_degree',"type":'number',"label":"Full Degree","defaultValue":0},
    {"name":'success_degree',"type":'number',"label":"Success Degree","defaultValue":0},
    {"name":'teacher',"type":'select',"label":"Teacher","defaultValue":''},
  ]
  const [message, setMessage] = useState('')
  const [options,setOptions] = useState([])

  const formik = useFormik({initialValues: initialValues,
    onSubmit: async (values,{resetForm})=> {
      // console.log('From Submit : ',values)
      const formData = {
        name:values.name,
        full_degree:values.full_degree,
        success_degree:values.success_degree,
        teacher:values.teacher,
        user_id:localStorage.getItem("user_id"),
      }
      console.log(formData)
      const res = await axios.post("http://localhost:8080/api/school/Subject.php",formData)
      if(res.data.Success){
        setMessage(res.data.Success)
        toast.success("Subject Add Successfully")
        resetForm(true)
      }else{

        setMessage(res.data.Wrong)
        toast.error("Plase Check the Subject Data")
      }},
    validationSchema })


  useEffect(() => {
    fetch("http://localhost:8080/api/school/Teacher.php")
    .then(response => response.json())
    .then(data     => setOptions(data) )
    .catch(error   => console.log(error)) 
  }, []);


  return (
    <>
    <div className='container mt-3'>
      <FormHeaderTemplate fields={fields} title="Teachers" options={options} name="teacher"
      validationSchema={validationSchema} formik={formik} 
      />
    </div>
    </>
  )
}

export default Subject