import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { NavLink,useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Student from '../Forms/Student';
import App from '../../App';

const TreeTemplate = (props)=> {
  console.log(props)
  let ids = []
  const [ID ,setID] = useState()
  const navigate = useNavigate()
  const [renderChecked ,setChecked] = useState(false)
  const [replaceID,setreplaceID] = useState([])
  
//   useEffect( ()=>{
//     const nameRowData = async ()=>{
//       let names = props.data.map((item)=>{
//         return item.student_id
//       })
//       console.log("names => ",names)
      
//         const getNameData = await axios.get("http://localhost:8080/api/school/student.php/"+ID);
//         // let x= await axios.getName('')
//         // const resStudentData = await getNameData.json();
//         console.log("getNameData : ",getNameData.data[0])
//         // setCreateDate(getNameData.data[0])
//         // setFormValue(getNameData.data);
//     }
//     nameRowData();
// },[])

  const selectAll = (e)=> {
    let checkbox = document.querySelectorAll("input[type='checkbox']")
    if (renderChecked) {
      setChecked(false)
    }else{
      setChecked(true)
    }

  }


    return (
        <>
          <div className='container mb-5'>
            <div className='row mb-5'>
              <div className='col-md-10'>
                <h3 className='mb-4 mt-3 table-header'>{props.title}</h3>
                    <button style={{"marginLeft":'8%',"width":'10%'}} className='mb-2 btn btn-primary'
                    onClick={()=>props.openForm(`/${props.name}-form`)}>New</button>
                    {
                      renderChecked ?<>
                                    <button 
                                      style={{"marginLeft":'1.5%',"width":'8%','border':'.5px solid','background':'aliceblue'}}
                                      className='mb-2 btn my-custom-cls-btn'
                                      onClick={selectAll}
                                      hidden={!renderChecked}>X</button>

                                    <button 
                                      style={{"marginLeft":'1.5%',"width":'8%','border':'.5px solid','background':'#db2828'}}
                                      className='mb-2 btn my-custom-cls-btn-danger'
                                      onClick={()=>props.deleteAll()}
                                      hidden={!renderChecked}>Delete</button> 
                                    </>
                                    :
                                    <button 
                                      style={{"marginLeft":'1.5%',"width":'auto','border':'.5px solid','background':'aliceblue'}}
                                      className='mb-2 btn my-custom-cls-btn'
                                      onClick={selectAll}
                                      hidden={renderChecked}>Select All</button>
                                    
                                       
                    }
                    
                    <table className='tabe-container w-100 mb-5 table table-striped table-hover table-bordered border-2'>
                      <thead className='text-center'>
                        <tr>
                          <th> <sapn>All </sapn> </th>
                          <th>SN</th>
                          <th>Name</th>
                          { props.headings.map((head,index)=> { 
                            return (
                            <th key={index}>
                              { head.startsWith('b_') ?
                              'Brith Date' :
                              head.replace(head.charAt(0),head.charAt(0).toUpperCase()).split('_')[0] 
                              
                              }
                            </th>) })
                          }
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody className=''>
    
                        { 
                          props.data.map((item,index)=>{
                            return( 
                                <tr key={item.id} onClick={()=>props.editForm(`/edit-${props.name}/`+item.id)}>
                                  <td> <input onChange={()=>setChecked(!renderChecked)} type={'checkbox'} id={"checkbox"+item.id} checked={renderChecked} onClick={(e)=>e.stopPropagation()} /> </td>
                                  <td> {index+1} </td>
                                  <td> {item.name} </td>                                  
                                  <td> {item[props.headings[0]]} </td>                                  
                                  {/* <td> {item[props.headings[2]]} </td>                                   */}
                                  
                                  <td>
                                    {
                                      // props.options.filter((el) => {
                                      //   item[props.headings[1]] === el.id ? ' '+el.name : ' '+item[props.headings[1]]+' '
                                      // } ) 
                                      props.options.map((el,index)=>{
                                        console.log('item =>',item)
                                        console.log('el =>',el)
                                        let r = /[^0-9]/g
                                        let arr = el.name.match(r)
                                        arr = arr.toString().replaceAll(',','')
                                        console.log("arr => ",arr)
                                        return (
                                          // el.name.substr(0,el.name.search('[0-9]',el.name))
                                          item[props.headings[1]] === el.id  ? 
                                          arr : item[props.headings[1]].split(' ')[0]
                                        )
                                      }) 
                                      } 
                                  </td>
                                  { item[props.headings[2]] ?
                                    <td> {item[props.headings[2]]} </td> : ''
                                  }
                                                                    
                                  {/* <td> <NavLink to={"/edit-item/"+item.id} > {<FaEdit className='text-success fa-custom' />} </NavLink> </td>  */}
                                  {/* <td> <button className='cutsom-btn' onClick={(e)=> handelDelete(e,item.id)} > {<FaTrash className='text-danger fa-custom' />} </button> </td> */}
                                  <td>
                                    <button onClick={(e)=> { e.stopPropagation(); setID(item.id) }} className="cutsom-btn" data-bs-toggle="modal" data-bs-target="#student-confirm">
                                      <FaTrash className='text-danger fa-custom' />
                                    </button>
                                  </td>
                                </tr>
                            )
                          }) 
                        }
                      </tbody>
                    </table>
                    
                </div>
            </div>
          </div>
          <ToastContainer />
    
          
        <div className="modal fade" id="student-confirm" tabIndex="-1" aria-labelledby="modal-title" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header mt-3">
                        <h5 className="modal-title" id="modal-title">Complate Delete </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
    
                    <div className="modal-body">
                        <div className="mb-4">
                          <div>Are You Suir Want To Delete This Record ?</div>
                        </div>
                    </div>
    
                    <div className="modal-footer me-3">
                        <button onClick={()=> props.delete({ID})} 
                          className="btn btn-outline-primary" id="modal-submit"  data-bs-dismiss="modal" >Okay</button>
                        <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" id="modal-cancel">Cancel</button>
                    </div>
    
                </div>
            </div>
        </div>
    
    
        </>
      )
}

export default TreeTemplate