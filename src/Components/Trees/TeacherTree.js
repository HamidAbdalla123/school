import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import TreeTemplate from './TreeTemplate';
import "./StudentTree.css"
import { string } from 'yup';
import TreeTableTemplate from './TreeTableTemplate';

const TeacherTree = ()=> {
    let Columns = [
      {Header:'SN',accessor:'sn'},{Header:'ID',accessor:'id',hide:false},{Header:'Name',accessor:'name'},
      {Header:"Subject",accessor:'subject'},{Header:'Brith Date',accessor:'b_date'}
    ]
    const headings = ['b_date','subject_id']
    const [teachersData, setTeacherData] = useState([])
    const [teacherID ,setTeacherID] = useState('')
  
    const navigate = useNavigate()
    const [options,setOptions] = useState([])
  
    useEffect(()=>{
      getTeachersData();
  
      const subjectRowData = async ()=>{
          const getSubjectData = await axios.get("http://localhost:8080/api/school/Subject.php");
          setOptions(getSubjectData.data);
      }
     subjectRowData();
    },[]); 
    
  
    const getTeachersData = async ()=>{ 
      const reqData =  await axios.get("http://localhost:8080/api/school/Teacher.php");

      if (typeof(reqData.data) == 'string'){
        setTeacherData([])
      }else{
        let obj = []
        // setTimeout(()=>{},5000)
        let x = reqData.data.forEach( async (el,index)=>{
          console.log("el.teacher_id => ",el.teacher_id)
          if (el.teacher_id != 'null'){
            let s  = await axios.get("http://localhost:8080/api/school/Subject.php/"+el.subject_id)
            .then((res)=>{
              obj.push(
                {"sn":index+1,"id": el.id,"name":el.name,"subject":res.data.name,
                'b_date':el.b_date,"subject_id":el.subject_id
                }
              )
            })
            // let nn = obj.sort()
            setTeacherData(obj)
          }else{ 
          obj.push(
            { "sn":index+1,"id": el.id,"name":el.name,
              'b_date':el.b_date,"subject_id":el.subject_id
            }
          )

          // let nn = obj.sort()
          setTeacherData(obj)
        }
        })
        // let nn = obj.sort()
        setTeacherData(obj)
      }
    }
  
  
    const handelDelete = async (id)=>{
      const res = await axios.delete("http://localhost:8080/api/school/Teacher.php?"+id);
      if(res.data.Success){
        toast.success("Teacher Deleted Successfully !")
      }else{
        toast.error("Somthing Wrong !")
      }
      getTeachersData();
    } 
    const DeleteAll = async ()=> {
      const res = await axios.delete("http://localhost:8080/api/school/Teacher.php");
      console.log("res => ",res)
      if(res.data.Success){
        toast.success("Teacher Deleted Successfully !")
      }else{
        toast.error("Somthing Wrong !")
      }
      getTeachersData();
    }
  
    const CreateNew = (teacher)=> {
      navigate(teacher)
    }
    const EditData = (teacher)=> {
      navigate(teacher)
    }
    
    return (
        <>
          <div className='vh-100 overflow-auto'>
            <TreeTableTemplate title="Teachers" name="teacher" Columns={Columns} data={teachersData}
              getData={()=>getTeachersData()} delete={(e)=>handelDelete(e)}
              openForm={(e)=>CreateNew(e)} editForm={(e)=>EditData(e)} deleteAll={()=>DeleteAll()} />
          </div> 
        </>
    )
}

export default TeacherTree