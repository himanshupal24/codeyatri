import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Courses from './components/Courses/Courses';
import Checkout from './pages/Checkout/Checkout';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Contact from './pages/Contact/Contact';
import Header from './components/Header/Header';
// import RequiredAuth from './RequiredAuth';
import { Toaster } from 'react-hot-toast';
import CreateCourse from './pages/Admin/CreateCourse';
import Dashboard from './pages/Dashboard/Dashboard';
import MyCourse from './pages/Dashboard/MyCourse';

const App = () => {
   return (
      <>
         <Header />
         <Toaster />
         <main>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/courses" element={<Courses />} />
               <Route path="/checkout/:courseId" element={
                     <Checkout />
               }/>
               <Route path="/login" element={<LoginPage />} />
               <Route path="/register" element={<RegisterPage />} />
               <Route path="/contact" element={<Contact />} />
               <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes */}
               <Route path="/dashboard" element={<Dashboard/>}/>
               <Route path="/my-courses" element={<MyCourse />} />
               <Route path="/admin/create-course" element={<CreateCourse />} />

            </Routes>
         </main>
      </>
   );
};

export default App;
