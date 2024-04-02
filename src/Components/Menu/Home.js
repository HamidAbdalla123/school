import FormHeaderTemplate from "../Forms/FormHeaderTemplate";
import TreeTableTemplate from "../Trees/TreeTableTemplate";
import axios from 'axios';
import React,{useState,useEffect,useRef} from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { NavLink,useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
// import FormHeaderTemplate from "../Forms/FormHeaderTemplate";
import { Chart} from "react-chartjs-2";
import { Line,Bar,getElementAtEvent } from "react-chartjs-2";
import {Chart as Chartjs,LineElement,PointElement,CategoryScale,LinearScale,Tooltip,Legend,BarElement} from "chart.js"

import Dashboard from "../Dashboard/Dashboard";

Chartjs.register(LineElement,PointElement,CategoryScale,LinearScale,Tooltip,Legend,BarElement)

const Home = ()=> {
  const myRef = useRef()
  let data = {
    labels:['MON','TUE','WED'],
    datasets:[ {
      label:'Week Days',
      data:[10,20,30],
      bg:'red',
      borderColor:'red',
    }]
  }

  let dataBar = {
    labels:['MON','TUE','WED','FAR','WEN'],
    datasets:[ {
      label:'Week Days',
      data:[10,20,30,-10,24],
      bg:'black',
      bg:'bule',
    }]
  }

  let fields = [
    
    // {"name":'id',    "type":'number',"label":"Id","defaultValue":0},
    {"name":'name',  "type":'text',"label":"Name","defaultValue":''},
    {"name":'name',  "type":'text',"label":"Name","defaultValue":''},
    {"name":"gender","type":'select',"label":"Name","defaultValue":'male',"options":[]},
    {"name":'b_date',"type":'date',"label":"Brith Date","defaultValue":''},
    {"name":'live',  "type":'text',"label":"Live","defaultValue":''},
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
      reqData.data.forEach((el,index)=>{
        obj.push(
          // {"id":index+1,"name":el.name,"gender":el.gender, "b_date":el.b_date},
          {"sn": index+1,"id":el.id,"name":el.name,"gender":el.gender,'b_date':el.b_date}
          // {"id": 1,"name":'Hamid',"gender":'Male','b_date':"01-02-1999"}
        )
      })
      console.log("obj => ",obj)
      setStudentsData(obj)
    } 
  }


  const handelDelete =  (student)=>{
    console.log("Delete ...",student)
    // const res = await axios.delete("http://localhost:8080/api/school/student.php?"+student);

    // if(res.data.Success){
    //   toast.success(res.data.Success)
    // }else{
    //   toast.error("Foreign Key Constraint Fails")
    // }
    // getStudentsData();
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
    // console.log(id)
  }

  const CreateNew = (student)=> {
    navigate(student)
  }
  const EditData = (student)=> {
    navigate(student)
  }
  const clickChart = (e)=> {
    console.log("clickChart",getElementAtEvent(myRef.current,e))
  }

  return (
    <div>
    {/* <div className='container mt-3 vh-100 overflow-auto bg-muted'> */}
      <Dashboard />
      {/* <div className="row shadow shadow-sm border m-2 p-4 bg-white">
        <div className="d-flex custom-dashbord">
          <div className="col-6" style={{"font-weight":'bold'}}>School Dashbord</div>
            <div className="col-6">
              <select className="form-controll" style={{"float":'right'}}>
                <option value=''>Select Year</option>
                <option value='2022'>2022</option>
                <option value='2023'>2023</option>
                <option value='2024'>2024</option>
                <option value='2025'>2025</option>
              </select>
            </div>
          </div>
      </div>

      <div className="row">
        <div className="col-6">
          <Line data={data} options={options} ref={myRef} onClick={(e)=>clickChart(e)}/> 
        </div>
        <div className="col-6">
          <Bar data={dataBar} options={options} ref={myRef} onClick={(e)=>clickChart(e)}/> 
        </div>
      </div> */}
      {/* Home */}
      {/* <Line data={data} options={options} ></Line> */}
      {/* <FormHeaderTemplate fields={fields} title="Students" options={options}/> */}
      {/* <TreeTableTemplate title="Teachers" name="teacher" Columns={Columns} data={studentsData}
            getData={()=>getStudentsData()} delete={(id)=>handelDelete(id)}
            openForm={(e)=>CreateNew(e)} editForm={(e)=>EditData(e)} deleteAll={()=>DeleteAll()} /> */}
    </div>
  )
}

export default Home;