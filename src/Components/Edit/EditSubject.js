import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { NavLink, useNavigate,useParams } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { FaArrowDown } from 'react-icons/fa';
import EditTemplate from './EditTemplate';
import "../Forms/student.css"



const initialValues = { name:'', full_degree:0, success_degree:0, teacher:'' }

const validationSchema = Yup.object({
  name: Yup.string().required('Name is Required !'),
  full_degree: Yup.number().integer('Full Degree Must Be Integer Number').min(0,'Full Degree Must Be Larg Than Zero !').required('Full Degree is Required !'),
  success_degree:Yup.number().integer('Success Degree Must Be Integer Number').min(0,'Success Degree Must Be Larg Than Zero !').max(Yup.ref("full_degree"),'Success Degree Must Be Less Than Full Dagree').integer('Success Degree Must Be Integer Number').required('Success Degree is Required !'),
  teacher: Yup.string().required('Teacher is Required !'),
});


const EditSubject = ()=> {
  let fieldsD = [
    {"name":'name',"type":'text',"label":"Name","defaultValue":''},
    {"name":'teacher_id',"type":'select',"label":"Teacher","defaultValue":''},
    {"name":'full_degree',"type":'number',"label":"Success Degree","defaultValue":0},
    {"name":'success_degree',"type":'number',"label":"Success Degree","defaultValue":0},
  ]

  let [teacherId, setTeacherId] = useState()
  const [formValue, setFormValue] = useState({ name:'', full_degree:'', success_degree:'', teacher_id:'' })
  const [message, setMessage] = useState('')
  const [createDate, setCreateDate] = useState()
  const [fields,setfields] = useState({name:'', full_degree:'', success_degree:'', teacher_id:''})
  const {id} = useParams()
  const naviget = useNavigate();
  const [options,setOptions] = useState([])
  const [fkId,setFkId] = useState('')


  const handleChange = (e) =>{
    setfields({ ...fields, [e.target.name]:true })
    setFormValue({ ...formValue, [e.target.name]:e.target.value })
    console.log("formValue => ",formValue)
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const formData = {
      id:id,
      name:formValue.name,
      full_degree:formValue.full_degree,
      success_degree:formValue.success_degree,
      teacher_id:Number(formValue.teacher_id),
      user_id:localStorage.getItem("user_id")
    }
    console.log("handleSubmit => ",formData)
    const res = await axios.put("http://localhost:8080/api/school/Subject.php",formData)
    console.log(res.data)
    console.log("formData => ",formData)
    if(res.data.Success){
      toast.success("Record Update Add Successfully")
    }else{
      toast.error("Plase Check the Subject Data")
    }
  }


  useEffect( ()=>{ 

    const subjectRowData = async ()=>{
        const getSubjectData = await axios.get("http://localhost:8080/api/school/Subject.php/"+id);
        if (getSubjectData.data.teacher_id === null){
          setTeacherId(1)
        }else{
          setTeacherId(getSubjectData.data.teacher_id)
        }        
        setCreateDate(getSubjectData.data[0])
        setFormValue(getSubjectData.data);
        setFkId(formValue.teacher_id)
        
    }
    subjectRowData();


    const teacherRowData = async ()=>{
        const getTeacherData = await axios.get("http://localhost:8080/api/school/Teacher.php");
        if (getTeacherData.data === 'string'){
            setOptions([]); 
        }else{
          setOptions(getTeacherData.data);
        }
    }
    teacherRowData();
    
},[])

    const handleReset = (e)=> {
      e.preventDefault();
      setFormValue('')
    }
    
  return (
    <>
      <div className='container mt-0'>
        <EditTemplate title="Subject" name="edit student" fields={fieldsD} id={id} fkId={formValue.teacher_id}
          handleReset={(e)=>handleReset(e)} handleSubmit={(e)=>handleSubmit(e)} options={options}
          handleChange={(e)=>handleChange(e)} formValue={formValue} createDate={createDate}/>
      </div>
      <ToastContainer />
    </>
  )
}

export default EditSubject