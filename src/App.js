import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';
import { NavLink,Routes,Route } from 'react-router-dom';
import Home from './Components/Menu/Home';
import Login from './Components/Login';
import { useState } from 'react';

import Student from './Components/Forms/Student';
import Class from './Components/Forms/Class';
import Parent from './Components/Forms/Parent';
import Subject from './Components/Forms/Subject';
import Result from './Components/Forms/Result';
import Teacher from './Components/Forms/Teacher';
import StudentRegister from './Components/Forms/StudentRegister';
import Logout from './Components/Logout';

import StudentTree from './Components/Trees/StudentTree';
import SubjectTree from './Components/Trees/SubjectTree';
import TeacherTree from './Components/Trees/TeacherTree';
import StudentRegisterTree from './Components/Trees/StudentRegisterTree';

import EditStudents from './Components/Edit/EditStudents';
import EditSubject from './Components/Edit/EditSubject';
import ParentTree from './Components/Trees/ParentTree';
import EditParents from './Components/Edit/EditParents';
import EditTeacher from './Components/Edit/EditTeacher';
import NoMatch from './NoMatch'
import { BrowserRouter,HashRouter } from 'react-router-dom';

const App = () => {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"))
  const [user, setUser] = useState(localStorage.getItem("user"))
  const [userId, setUserId] = useState(localStorage.getItem("user_id"))
  

  return (
    <div>

      {
        !isLogin && !userId && !user  ? <Login login={isLogin} setUser={setUser} setIsLogin={setIsLogin}/> :
        <>
          <Header />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />

            <Route path="/student" element={<StudentTree />} />
            <Route path="/class" element={<Class />} />
            
            <Route path="/subject" element={<SubjectTree />} />
            <Route path="/result" element={<Result />} />
            <Route path="/teacher" element={<TeacherTree />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/student-register" element={<StudentRegisterTree />} />

            
            {/* <Route path="/view-students" element={<StudentTree />} />
            <Route path="/view-teachers" element={<TeacherTree />} />
            <Route path="/view-student-register" element={<StudentRegisterTree />} /> */}

            <Route path="/parent" element={<ParentTree />} />
            <Route path="/view-subjects" element={<SubjectTree />} />

            <Route path="/edit-student/:id" element={<EditStudents />} />
            <Route path="/edit-subject/:id" element={<EditSubject />} />


            <Route path="/student-form" element={<Student />} />
            <Route path="/parent-form" element={<Parent />} />
            <Route path="/subject-form" element={<Subject />} />
            <Route path="/teacher-form" element={<Teacher />} />
            <Route path="/class-form" element={<Class />} />
            <Route path="/student-register-form" element={<StudentRegister />} />

            <Route path="/view-parent" element={<ParentTree />} />
            <Route path="/edit-parent/:id" element={<EditParents />} />
            <Route path="/edit-teacher/:id" element={<EditTeacher />} />
            
            <Route path='*' element={<NoMatch />} />

          </Routes> 
        </HashRouter>

          <Footer />
        </>
      }
      

    </div>
  )
}

export default App;
