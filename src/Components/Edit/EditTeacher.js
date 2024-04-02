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


// { name:'', b_date:'', subject:'' }
const initialValues = { name:'', b_date:'',subject_id:'' }

const validationSchema = Yup.object({
  name: Yup.string().required('Name is Required !'),
  b_date: Yup.number().integer('Full Degree Must Be Integer Number').min(0,'Full Degree Must Be Larg Than Zero !').required('Full Degree is Required !'),
  subject_id: Yup.string().required('Teacher is Required !'),
});


const EditTeacher = ()=> {
  let fieldsD = [
    {"name":'name',"type":'text',"label":"Name","defaultValue":''},
    {"name":'subject_id',"type":'select',"label":"Subject","defaultValue":''},
    {"name":'b_date',"type":'date',"label":"Briht Date","defaultValue":0},
  ]

  let [subjectId, setsubjectId] = useState()
  const [formValue, setFormValue] = useState({ name:'', b_date:'', subject_id:'' })
  const [message, setMessage] = useState('')
  const [createDate, setCreateDate] = useState()
  const [fields,setfields] = useState({name:'', b_date:'', subject_id:''})
  const {id} = useParams()
  const naviget = useNavigate();
  const [options,setOptions] = useState([])
  const [fkId,setFkId] = useState('')


  const handleChange = (e) =>{
    setfields({ ...fields, [e.target.name]:true })
    setFormValue({ ...formValue, [e.target.name]:e.target.value })

  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const formData = {
      id:id,
      name:formValue.name,
      b_date:formValue.b_date,
      subject_id:Number(formValue.subject_id),
      user_id:localStorage.getItem("user_id")
    }
    const res = await axios.put("http://localhost:8080/api/school/Teacher.php",formData)
    console.log(res.data)
    console.log("formData => ",formData)
    if(res.data.Success){
      toast.success("Record Update Add Successfully")
    }else{
      toast.error("Plase Check the Teacher Data")
    }
  }


  useEffect( ()=>{ 

    const subjectRowData = async ()=>{
        const getTeacherData = await axios.get("http://localhost:8080/api/school/Teacher.php/"+id);
        // const resStudentData = await getStudentData.json();
        if (getTeacherData.data.subject_id === null){
          setsubjectId(1)
        }else{
          setsubjectId(getTeacherData.data.subject_id)
        }        
        setCreateDate(getTeacherData.data[0])
        setFormValue(getTeacherData.data);
        setFkId(formValue.subject_id)
        
    }
    subjectRowData();


    const teacherRowData = async ()=>{
        const getSubjectData = await axios.get("http://localhost:8080/api/school/Subject.php");
        if (getSubjectData.data === 'string'){
            setOptions([]); 
        }else{
          setOptions(getSubjectData.data);
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
      <EditTemplate title="Teacher" name="edit teacher" fields={fieldsD} id={id} fkId={formValue.subject_id}
        handleReset={(e)=>handleReset(e)} handleSubmit={(e)=>handleSubmit(e)} options={options}
        handleChange={(e)=>handleChange(e)} formValue={formValue} createDate={createDate}/>
    </div>
    <ToastContainer />
    </>
  )
}

export default EditTeacher