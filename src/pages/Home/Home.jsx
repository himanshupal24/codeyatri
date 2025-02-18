import React from 'react';
import Banner from '../../components/Banner/Banner';
import Courses from '../../components/Courses/Courses';
import Footer from '../../components/Footer/Footer';
import Contact from '../Contact/Contact';

const Home = () => {
   return (
      <>
         <div className="container mx-auto w-full md:w-10/12">
            <Banner />
            <Courses />
            <Contact />
            <Footer />
         </div>
      </>
   );
};

export default Home;
