import axios from 'axios'
import React,{useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
// import FormHeaderTemplate from './FormHeaderTemplate';
// import "./student.css"

let initialValues = {}

const EditTemplate = (props)=> {
    console.log("FormHeaderTemplate = >",props)
    let formValue = props.formValue
    props.fields.forEach(element => {
      initialValues[`${element.name}`] = element.defaultValue
    });


    const formik = props.formik
    return (
      <>
      <div class="container mt-3">
          <div class="row">
              <div class="col-12">
                  <div className="view"> <NavLink exact to={`/${props.name}`}>View {props.title} </NavLink> </div>
                  
                  <form onSubmit={(e)=> props.handleSubmit(e) }  onReset={(e)=>props.handleReset(e)}>
                    <div className='form-header'>
                      <h3> Edit {props.title} Data </h3>
                    </div>

                    <div className='text-start mb-1 custom-temp-buttom'>
                      <button type='submit'  className='btn btn-primary buttons'>Save</button>
                      <button type='reset'  className='btn btn-outline-danger buttons ms-3'>Discard</button>
                      <ToastContainer />
                    </div>

                    <div class="custom-d-flex mb-3">
                      { 
                        props.fields.map((el,index)=>{
                          return(
                              <div class="inputs">
                                {el.type === 'select' ? 
                                <>
                                <label htmlFor={el.name} className="form-label"> {el.label} </label> 
                                <select class="form-select custom-input" onChange={(e)=>props.handleChange(e)} type={el.type} name={el.name} id={el.name} >
                                    {/* <option value={props.fkId}> {} </option> */}
                                    {
                                      el.name === 'gender' ? <>
                                      <option name={el.name} selected={props.fkId === 'male'} value="male">Male</option>
                                      <option name={el.name} selected={props.fkId === 'female'} value="fmale">Female</option> </> :
                                      
                                        props.options.map((opt,i)=> <option selected={opt.id == props.fkId}
                                        key={i} value={opt.id}> {opt.name} </option> )
                                      
                                    }
                                </select>
                                </>
                                :
                                <>
                                  <label for="Name"> {el.label} </label> 
                                  <input class="form-control custom-input"
                                    onChange={(e)=>props.handleChange(e)} 
                                    value={props.formValue[`${el.name}`]}
                                    type={el.type} name={el.name} id={el.name} />
                                  
                                </>  
                                }
                              </div>
                          )
                        })
                    }
                    </div>
  
                  </form>

                    <div className='user-lago d-flex justify-content-center' > 
                        <div className='mt-0 ms-3 fs-3'>
                        User Created Record : <NavLink className="text-decoration-none">{localStorage.getItem("user")}</NavLink> <br/>
                        <div className='text-center mb-5'> Date : {props.createDate} </div>
                        </div>
                    </div>
              </div>
          </div>
      </div>
      </>
  )
}

export default EditTemplate