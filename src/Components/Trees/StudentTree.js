import FormHeaderTemplate from "../Forms/FormHeaderTemplate";
import TreeTableTemplate from "../Trees/TreeTableTemplate";
import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { NavLink,useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

const StudentTree = ()=> {
  let Columns = [
    {Header:'SN',accessor:'sn'},{Header:'ID',accessor:'id'},{Header:'Name',accessor:'name'},
    {Header:"Gender",accessor:'gender'},{Header:'Brith Date',accessor:'b_date'},{Header:'Live',accessor:'lives'}
  ]

  const [studentsData, setStudentsData] = useState([])
  const [message ,setMessage] = useState('')
  const [studentID ,setStudentID] = useState()
  const navigate = useNavigate()
  const [renderChecked ,setChecked] = useState(false)
  const [renderCheckedOne ,setCheckedOne] = useState(false)
  const [options,setOptions] = useState([])

  useEffect(()=>{
    getStudentsData();

    const parentRowData = async ()=>{
      const getStudentData = await axios.get("http://localhost:8080/api/school/Parent.php");
      setOptions(getStudentData.data)
  } 
  parentRowData();
  },[]);

  const getStudentsData = async ()=>{
    const reqData =  await axios.get("http://localhost:8080/api/school/student.php");
    // console.log("reqData => ",reqData.data)
    
    if (typeof(reqData.data) == 'string'){
      setStudentsData([])
    }else{
      let obj = []
      reqData.data.forEach(async (el,index)=>{
        obj.push(
          {"sn":index+1,"id": el.id,"name":el.name,"gender":el.gender,'b_date':el.b_date,'lives':el.lives}
        )
      })
      console.log("obj => ",obj)
      setStudentsData(obj)
    } 
  }


  const handelDelete = async (id)=>{
    // console.log("Delete ...",id)
    const res = await axios.delete("http://localhost:8080/api/school/student.php?"+id);

    if(res.data.Success){
      toast.success(res.data.Success)
    }else{
      toast.error("Foreign Key Constraint Fails")
    }
    getStudentsData();
  }

  const DeleteAll = async ()=> {
    const res = await axios.delete("http://localhost:8080/api/school/student.php");
    console.log("res => ",res)
    if(res.data.Success){
      toast.success(res.data.Success)
    }else{
      toast.error("Foreign Key Constraint Fails")
    }
    getStudentsData();
  }

  const CreateNew = (student)=> {
    navigate(student)
  }
  const EditData = (student)=> {
    navigate(student)
  }

  return (
    <div className='vh-100 overflow-auto'>
      <TreeTableTemplate title="Students" name="student" Columns={Columns} data={studentsData}
       getData={()=>getStudentsData()} delete={(e)=>handelDelete(e)}
       openForm={(e)=>CreateNew(e)} editForm={(e)=>EditData(e)} deleteAll={()=>DeleteAll()} />
    </div>
  )
}

export default StudentTree