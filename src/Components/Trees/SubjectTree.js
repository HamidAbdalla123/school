import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import TreeTemplate from './TreeTemplate';
import TreeTableTemplate from './TreeTableTemplate';

import "./StudentTree.css"
import { string } from 'yup';
const SubjectTree = ()=> {
  let Columns = [
    {Header:'SN',accessor:'sn'},{Header:'ID',accessor:'id'},{Header:'Name',accessor:'name'},
    {Header:"Teacher",accessor:'teacher'},{Header:'Full Degree',accessor:'full_degree'},
    {Header:'Success Degree',accessor:'success_degree'}
  ]

    let names = []
    const headings = ['full_degree','teacher_id','success_degree']
    const [subjectsData, setSubjectData] = useState([])
    const [subjectID ,setSubjectID] = useState('')
  
    const navigate = useNavigate()
    const [options,setOptions] = useState([])
  
    useEffect(()=>{
      getSubjectsData();
  
      const tracherRowData = async ()=>{
          const getSubjectData = await axios.get("http://localhost:8080/api/school/Teacher.php");
          setOptions(getSubjectData.data);
      }
     tracherRowData();
    },[]); 
    
  
    const getSubjectsData = async ()=>{ 
      const reqData =  await axios.get("http://localhost:8080/api/school/Subject.php");
      if (typeof(reqData.data) == 'string'){
        setSubjectData([])
      }else{
        let obj = []
        // setTimeout(()=>{},5000)
        let x = reqData.data.forEach( async (el,index)=>{
          console.log("el.teacher_id => ",el.teacher_id)
          if (el.teacher_id != 'null'){
            let s  = await axios.get("http://localhost:8080/api/school/Teacher.php/"+el.teacher_id)
            .then((res)=>{
              obj.push(
                {"sn":index+1,"id": el.id,"name":el.name,"teacher":res.data.name,
                'full_degree':el.full_degree,'success_degree':el.success_degree,"teacher_id":el.teacher_id
                }
              )
              // console.log("then => ",res)
            })
            let nn = obj.sort((a,b)=> a.sn<b.sn)
            // console.log("nn => ",nn)
            setSubjectData(nn)
          }else{ 
          obj.push(
            {"sn":index+1,"id": el.id,"name":el.name,"teacher_id":el.teacher_id,
            'full_degree':el.full_degree,'success_degree':el.success_degree
            }
          )

          let nn = obj.sort((a,b)=> a.sn<b.sn)
          setSubjectData(nn)
        }
        })
        let nn = obj.sort((a,b)=> a.sn<b.sn)
        setSubjectData(nn)
      }
    }
  
    const handelDelete = async (id)=>{
      const res = await axios.delete("http://localhost:8080/api/school/Subject.php?"+id);
      if(res.data.Success){
        toast.success("Subject Deleted Successfully !")
      }else{
        toast.error("Somthing Wrong !")
      }
      getSubjectsData();
    } 

    const DeleteAll = async ()=> {
      const res = await axios.delete("http://localhost:8080/api/school/Subject.php");
      console.log("res => ",res)
      if(res.data.Success){
        toast.success("Subject Deleted Successfully !")
      }else{
        toast.error("Somthing Wrong !")
      }
      getSubjectsData();
    }
  
    const CreateNew = (subject)=> {
      navigate(subject)
    }
    const EditData = (subject)=> {
      navigate(subject)
    }
    
    return (
      
      <div className='vh-100 overflow-auto'>
        <TreeTableTemplate title="Subjects" name="subject" Columns={Columns} data={subjectsData}
          getData={()=>getSubjectsData()} delete={(e)=>handelDelete(e)} 
          openForm={(e)=>CreateNew(e)} editForm={(e)=>EditData(e)} deleteAll={()=>DeleteAll()}
        />   
      </div>  
    )
  }
export default SubjectTree