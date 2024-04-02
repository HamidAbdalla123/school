import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { NavLink, useNavigate,useParams } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaArrowDown } from 'react-icons/fa';
import EditTemplate from './EditTemplate';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

import "../Forms/student.css"



function EditParents() {
  let fieldsD = [
    {"name":'name',"type":'text',"label":"Name","defaultValue":''},
    {"name":'student_id',"type":'select',"label":"Student","defaultValue":''},
    {"name":'realtive',"type":'text',"label":"Realtive","defaultValue":''},
  ]
  let [stId, setStId] = useState()
  const [options,setOptions] = useState([])
  const [fkId,setFkId] = useState('')
  const [formValue, setFormValue] = useState( { name:'', student_id:'', realtive:'' } )
  const [message, setMessage] = useState('')
  const [createDate, setCreateDate] = useState()

  const [fields,setfields] = useState( { name:'', student_id:'', realtive:'' } )
  const {id} = useParams()
  const naviget = useNavigate();

  const handleChange = (e) =>{
    setfields({ ...fields, [e.target.name]:true })
    setFormValue({ ...formValue, [e.target.name]:e.target.value })

  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const formData = {
      id:Number(id),
      name:formValue.name,
      student:Number(formValue.student_id),
      realtive:formValue.realtive,
      user_id:localStorage.getItem("user_id")
    }
    const res = await axios.put("http://localhost:8080/api/school/Parent.php",formData)
    if(res.data.Success){
      toast.success("Record Update Add Successfully")
    }else{
      toast.error("Plase Check the Parent Data")
    }
  }


    useEffect( ()=>{

        const parentRowData = async ()=>{
            const getParentData = await axios.get("http://localhost:8080/api/school/Parent.php/"+id);
            // const resStudentData = await getStudentData.json();
            setStId(getParentData.data.student_id)
            setCreateDate(getParentData.data[0])
            setFormValue(getParentData.data);
            setFkId(formValue.student_id)
        }
        parentRowData();


        const studentRowData = async ()=>{
            const getStudentData = await axios.get("http://localhost:8080/api/school/student.php/");
            // const resStudentData = await getStudentData.json();
            setOptions(getStudentData.data); 
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
          <EditTemplate title="Parent" name="edit parent" fields={fieldsD} id={id} fkId={formValue.student_id}
            handleReset={(e)=>handleReset(e)} handleSubmit={(e)=>handleSubmit(e)} options={options}
            handleChange={(e)=>handleChange(e)} formValue={formValue} createDate={createDate}/>
        </div>
        <ToastContainer />
      </>
    )
}

export default EditParents