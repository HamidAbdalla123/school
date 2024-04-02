import React,{useState} from 'react'
import { NavLink } from 'react-router-dom';
import {FA} from 'react-fontawesome'
import { FaBookOpen, FaBars, FaSignOutAlt, FaSe } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';

import './Header.css'
import { Nav } from 'react-bootstrap';

const Header = ()=> {
    const [showOffcanvas,setShowOffcanvas] = useState(false)

    const handelCloseOffcanvas = () =>{
        let sidebar = document.getElementById('sidebar') 
        let offcanvas_header = document.querySelector('.offcanvas-header') 
        sidebar.classList.remove('show')
        sidebar.classList.add('hide')
        sidebar.restoreFocus(false);
    }


    return (
        <>
        <div className='container-fulid'>
            <div className='row mx-3'>

                <div className='col-6 logo-section'>
                    <div className='logo-book'>
                        <FaBookOpen /> <span>&nbsp; SMS System </span>
                    </div>
                </div>

                <div className='col-3'>
                    
                </div>
                
                <div className='col-3 baras-section'>
                    <div className='text-end w-25 float-end'> 
                        <a href="#sidebar" className="d-block mt-3 text-decoration-none" 
                            role="button" data-bs-toggle="offcanvas"
                            aria-controls="sidebar">
                                MENU <FaBars /> 
                        </a>
                    </div>
                </div>

            </div>
        </div>



         {/* offcanvas Menu */}




            <div className="offcanvas offcanvas-end bg-dark" id="sidebar" aria-labelledby="sidebar-label">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title text-white" id="sidebar-label">Menu</h5>
                    <button type="button" className="btn-close bg-white"
                    data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>

                <div className="offcanvas-body">

                    <div className='off-div-nav-link'> <NavLink onClick={handelCloseOffcanvas} className="custom-nav-link" to="/home" >Home</NavLink> </div>
                    <div className='off-div-nav-link'> <NavLink onClick={handelCloseOffcanvas} className="custom-nav-link" to="/student" >student</NavLink> </div>
                    <div className='off-div-nav-link'> <NavLink onClick={handelCloseOffcanvas} className="custom-nav-link" to="/class" >class</NavLink> </div>
                    <div className='off-div-nav-link'> <NavLink onClick={handelCloseOffcanvas} className="custom-nav-link" to="/parent" >parent</NavLink> </div>
                    <div className='off-div-nav-link'> <NavLink onClick={handelCloseOffcanvas} className="custom-nav-link" to="/subject" >subject</NavLink> </div>
                    <div className='off-div-nav-link'> <NavLink onClick={handelCloseOffcanvas} className="custom-nav-link" to="/teacher" >teacher</NavLink> </div>
                    <div className='off-div-nav-link'> <NavLink onClick={handelCloseOffcanvas} className="custom-nav-link" to="/result" >result</NavLink> </div>
                    <div className='off-div-nav-link'> <NavLink onClick={handelCloseOffcanvas} className="custom-nav-link" to="/student-register" >register student</NavLink> </div>
                </div>
                
                <div className='offcanvas-footer'>
                    <div className='off-custom-footer'>
                        <div className='setting'> <NavLink to="/setting" onClick={handelCloseOffcanvas} className="custom-nav-link"> <FiSettings /> </NavLink> </div>
                        <div className='signOut' title='Logout'> <NavLink to="/logout" onClick={handelCloseOffcanvas} className="custom-nav-link"> <FaSignOutAlt/> </NavLink> </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;