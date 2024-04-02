import React,{useState,useEffect} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';
import "./FormHeaderTemplate.css"

let initialValues = {}

// const validationSchema = Yup.object({
//   name: Yup.string().('Name is Required !'),
//   full_degree: Yup.number().integer('Full Degree Must Be Integer Number').min(0,'Full Degree Must Be Larg Than Zero !').('Full Degree is Required !'),
//   success_degree:Yup.number().integer('Success Degree Must Be Integer Number').min(0,'Success Degree Must Be Larg Than Zero !').max(Yup.ref("full_degree"),'Success Degree Must Be Less Than Full Dagree').integer('Success Degree Must Be Integer Number').('Success Degree is Required !'),
//   teacher: Yup.string().('Teacher is Required !'),
// });


const FormHeaderTemplate = (props)=> {
      console.log("FormHeaderTemplate = >",props)
      props.fields.forEach(element => {
        initialValues[`${element.name}`] = element.defaultValue
      });


      const formik = props.formik
      return (
        <>
        <div class="container mt-3">
            <div class="row">
                <div class="col-12">
                    <div className="view"> <NavLink to={`/${props.name}`}>View {props.title} </NavLink> </div>
                    
                    <form onSubmit={formik.handleSubmit}  onReset={formik.handleReset}>
                      <div className='form-header'>
                        <h3> {props.title} Data </h3>
                      </div>

                      <div className='text-start mb-1 custom-temp-buttom'>
                        <button type='submit'  className='btn btn-primary buttons'>Save</button>
                        <button type='reset' onClick={formik.handleReset}  className='btn btn-outline-danger buttons ms-3'>Discard</button>
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
                                  <select class="form-select custom-input"  type={el.type} name={el.name} id={el.name}
                                    onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values[`${el.name}`]}  >
                                      <option value="">--Select Value--</option>
                                      {
                                        el.name === 'gender' ? <>
                                          <option value="male">Male</option>
                                          <option value="female">Female</option> </> 
                                        :
                                          props.options.map((opt,i)=> <option key={i} value={opt.id}> {opt.name} </option> )
                                        
                                      }
                                  </select>
                                  {
                                    el.name in props.validationSchema.fields ?
                                    <div className='text-danger mt-1'> {formik.errors[`${el.name}`]} </div>
                                    : null
                                  }
                                  </>
                                  :
                                  <>
                                    <label htmlFor={el.name}> {el.label} </label> 
                                    <input class="form-control custom-input"  type={el.type} name={el.name} id={el.name}
                                    onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values[`${el.name}`]}  />
                                    {
                                      el.name in props.validationSchema.fields ?
                                      <div className='text-danger mt-1'> {formik.errors[`${el.name}`]} </div>
                                      : null
                                    }
                                  </> 
                                  }
                                </div>
                            )
                          })
                      }
                      </div>
    
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default FormHeaderTemplate