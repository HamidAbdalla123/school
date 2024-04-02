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

const ParentTree = () => {
  let Columns = [
    {Header:'SN',accessor:'sn'},{Header:'ID',accessor:'id',className:'test'},{Header:'Name',accessor:'name'},
    {Header:"Student",accessor:'student'},{Header:'Realtive',accessor:'realtive'}
  ]
  const [parentsData, setParentsData] = useState([])
  const [parentID ,setParentID] = useState('')

  const navigate = useNavigate()
  const [options,setOptions] = useState([])

  useEffect(()=>{
    getParentsData();

    const studentRowData = async ()=>{
        const getStudentData = await axios.get("http://localhost:8080/api/school/student.php");
        console.log("getStudentData.data => ",getStudentData.data)
        setOptions(getStudentData.data)
    } 
    studentRowData();
  },[]);
  

  const getParentsData = async ()=>{ 
    const reqData =  await axios.get("http://localhost:8080/api/school/Parent.php");
    // if (typeof(reqData.data) == 'string'){
    //   setParentsData([])
    // }else{
    //   setParentsData(reqData.data)
    //   let obj = []
    //   reqData.data.forEach((el,index)=>{
    //     obj.push(
    //       {"sn": index+1,"id":el.id,"name":el.name,"student_id":el.student_id,'realtive':el.realtive}
    //     )
    //   })
    //   console.log("obj =>",obj)
    // }

    if (typeof(reqData.data) == 'string'){
      setParentsData([])
    }else{
      let obj = []
      // setTimeout(()=>{},5000)
      let x = reqData.data.forEach( async (el,index)=>{
        console.log("el.student_id => ",el.student_id)
        if (el.student_id != 'null'){
          let s  = await axios.get("http://localhost:8080/api/school/student.php/"+el.student_id)
          .then((res)=>{
            obj.push(
              {"sn": index+1,"id":el.id,"name":el.name,"student":res.data.name,
              'realtive':el.realtive,"student_id":el.student_id}
            )
            // console.log("then => ",res)
          })
          
          // console.log("nn> ",nn)
          setParentsData(obj)
        }else{ 
        obj.push(
          {"sn": index+1,"id":el.id,"name":el.name,"student":el.student_id,
          'realtive':el.realtive,"student_id":el.student_id}
        )

        
        setParentsData(obj)
      }
      })
      
      setParentsData(obj)
    }

  }

  const handelDelete = async (id)=>{
    const res = await axios.delete("http://localhost:8080/api/school/Parent.php?"+id);
    if(res.data.Success){
      toast.success("Parent Deleted Successfully !")
    }else{
      toast.error("Somthing Wrong !")
    }
    getParentsData();
  } 
  const DeleteAll = async ()=> {
    const res = await axios.delete("http://localhost:8080/api/school/Parent.php");
    console.log("res => ",res)
    if(res.data.Success){
      toast.success("Parent Deleted Successfully !")
    }else{
      toast.error("Somthing Wrong !")
    }
    getParentsData();
  }

  const CreateNew = (parent)=> {
    navigate(parent)
    // <navigate to="parent-form" />
  }
  const EditData = (parent)=> {
    navigate(parent)
  }
  
  return (
    
    <div className='vh-100 overflow-auto'>
      <TreeTableTemplate title="Parents" name="parent" Columns={Columns} data={parentsData}
        getData={()=>getParentsData()} delete={(e)=>handelDelete(e)}
        openForm={(e)=>CreateNew(e)} editForm={(e)=>EditData(e)} deleteAll={()=>DeleteAll()}
      />   
    </div> 
  )
}
export default ParentTree