import axios from 'axios'
import React,{useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

import "./student.css"
// import { ToastContainer } from 'react-bootstrap';

const initialValues = { name:'', gender:'', b_date:'', lives:'' }



const validationSchema = Yup.object({
    name: Yup.string().required('Name is Required !'),
    gender: Yup.string().required('Gender is Required !'),
    b_date: Yup.date().required('Birth Date is Required !'),
    lives: Yup.string().required('Lives is Required !'),
});

function Class() {

  const [message, setMessage] = useState('')

  const formik = useFormik({initialValues: initialValues,
    onSubmit: async (values,{resetForm})=> {
      // console.log('From Submit : ',values)
      const formData = {
        name:values.name,
        gender:values.gender,
        b_date:values.b_date,
        lives:values.lives,
        lives:values.lives,
        user_id:localStorage.getItem("user_id"),
      }
    
      const res = await axios.post("http://localhost:8080/api/school/Class.php",formData)
      if(res.data.Success){
        setMessage(res.data.Success)
        toast.success("Class Add Successfully",{autoClose:8000})
        resetForm(true)
      }else{
        setMessage(res.data.Wrong)
        toast.error("Plase Check the Class Data")
      }},
    validationSchema })

  return (
    <>
    <div className='container mt-5'>
        <div className='row'>
          <div className='col-12'>
            <div className="view"> <NavLink to="/view-Classs">View Classs</NavLink> </div>
            <form className='mt-5' onSubmit={formik.handleSubmit}  onReset={formik.handleReset}>
                
              <div className='container py-5'>
                <div className='row text-center ms-5'>
                  <div className='text-center mb-3'>
                    <div className='form-header'>
                      <h3>Class Data</h3>
                    </div>
                  </div>
                   
                    <div className='text-start mb-5'>
                      <button type='submit'  className='btn btn-primary buttons'>Save</button>
                      <button type='reset'  className='btn btn-outline-danger buttons ms-3'>Discard</button>
                      <ToastContainer />
                    </div>


                    <div className='col-5 group'>
                      <div className='text-start mx-1'>
                        <label htmlFor='name' className='form-label'>Class Name : </label>
                        <input type="text" id="name" className='form-control' name="name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name}  />
                          {
                            formik.errors.name && formik.touched.name ?
                            <div className='text-danger mt-1'> {formik.errors.name} </div>
                             : null
                          }
                      </div>

                      <div className='text-start mx-1 mt-3'>
                        <label htmlFor='lives' className='form-label'>Lives : </label>
                        <input type="text" id="lives" className='form-control' name="lives" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.lives}  />
                          {
                            formik.errors.lives && formik.touched.lives ?
                            <div className='text-danger mt-1'> {formik.errors.lives} </div>
                             : null
                          }
                        
                      </div>
                    </div>

                    <div className='col-1 sparetor'></div>

                    <div className='col-5 group me-3'>
                      <div className='text-start mx-1'>
                        <label htmlFor='gender' className='form-label'>Gender : </label>
                        <select className='form-control' id="gender"  name="gender" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.gender}  >
                          <option value="">--Select Status--</option>
                          <option value="male"> Male </option>
                          <option value="female"> Female </option>
                        </select>
                          {
                            formik.errors.gender && formik.touched.gender ?
                            <div className='text-danger mt-1'> {formik.errors.gender} </div>
                             : null
                          }
                      </div>

                      <div className='text-start mx-1 mt-3'>
                        <label htmlFor='b_date' className='form-label'>Brith Date : </label>
                        <input type="date" id="b_date" required className='form-control' name="b_date" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.b_date} />
                          {
                            formik.errors.b_date && formik.touched.b_date ?
                            <div className='text-danger mt-1'> {formik.errors.b_date} </div>
                             : null
                          }
                        
                      </div>

                    </div>
                  </div>
                </div>
            </form>

        </div>
      </div>
    </div>
    </>
  )
}

export default Class;