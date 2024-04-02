import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { NavLink, useNavigate,useParams } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import EditTemplate from './EditTemplate';
import "../Forms/student.css"



function Student() {
  let fieldsD = [
    {"name":'name',"type":'text',"label":"Name","defaultValue":''},
    {"name":'gender',"type":'select',"label":"Gender","defaultValue":''},
    {"name":'b_date',"type":'date',"label":"Brith Date","defaultValue":''},
    {"name":'lives',"type":'text',"label":"lives","defaultValue":''},
  ]

  const [formValue, setFormValue] = useState({ name:'', gender:'', b_date:'', lives:'' })
  const [message, setMessage] = useState('')
  const [createDate, setCreateDate] = useState()
  const [fields,setfields] = useState({name:'', gender:'', b_date:'', lives:''})
  const {id} = useParams()
  const naviget = useNavigate();
  const [options,setOptions] = useState([])


  const handleChange = (e) =>{
    setfields({ ...fields, [e.target.name]:true })
    setFormValue({ ...formValue, [e.target.name]:e.target.value })

  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const formData = {
      id:id,
      name:formValue.name,
      gender:formValue.gender,
      b_date:formValue.b_date,
      lives:formValue.lives,
      user_id:localStorage.getItem("user_id")
    }
    
    const res = await axios.put("http://localhost:8080/api/school/student.php",formData)
    if(res.data.Success){
      toast.success("Record Update Add Successfully")
    }else{
      toast.error("Plase Check the Student Data")
    }
  }


    useEffect( ()=>{
        const studentRowData = async ()=>{
            const getStudentData = await axios.get("http://localhost:8080/api/school/student.php/"+id);
            // const resStudentData = await getStudentData.json();
            // console.log("getStudentData : ",getStudentData.data[0])
            setCreateDate(getStudentData.data[0])

            setFormValue(getStudentData.data);
        }
        studentRowData();
    },[])

    const handleReset = (e)=> {
      e.preventDefault();
      setFormValue('')
    }
    
  return (
    <>
      <div className='container mt-0'>
        <EditTemplate title="Student" name="edit student" fields={fieldsD} id={id} fkId={formValue.gender}
        handleReset={(e)=>handleReset(e)} handleSubmit={(e)=>handleSubmit(e)} options={[]}
        handleChange={(e)=>handleChange(e)} formValue={formValue} createDate={createDate}/>
      </div>
      <ToastContainer />
    </>
  )
}

export default Student