import React, { useState, useEffect } from "react";
import SingleCourse from "./SingleCourse/SingleCourse";
import { db } from "../../Firebase/Firebase.init";
import { collection, onSnapshot } from "firebase/firestore";
import { useLocation } from "react-router-dom";

const Courses = () => {
   const [courses, setCourses] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const isTruePath = useLocation().pathname === "/courses";

   useEffect(() => {
      const unsubscribe = onSnapshot(
         collection(db, "courses"),
         (snapshot) => {
            const courseList = snapshot.docs.map((doc) => ({
               id: doc.id,
               ...doc.data(),
            }));
            setCourses(courseList);
            setLoading(false);
         },
         (err) => {
            console.error("Error fetching courses:", err);
            setError("Failed to load courses");
            setLoading(false);
         }
      );

      return () => unsubscribe(); // Cleanup listener on unmount
   }, []);

   return (
      <section className="text-gray-600 body-font">
         <div className={isTruePath ? "py-24 container m-auto lg:w-10/12 w-full" : "py-24"}>
            <div className="flex flex-wrap w-full mb-20 px-4">
               <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                     Our Courses
                  </h1>
                  <div className="h-1 w-20 bg-indigo-500 rounded"></div>
               </div>
            </div>

            {loading ? (
               <div className="flex justify-center">
                  {/* Add a skeleton loader component here */}
                  <p className="text-gray-500">Loading courses...</p>
               </div>
            ) : error ? (
               <div className="text-center text-red-500">
                  <p>{error}</p>
                  <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded" onClick={() => window.location.reload()}>
                     Retry
                  </button>
               </div>
            ) : courses.length > 0 ? (
               <div className="flex flex-wrap">
                  {courses.map((course) => (
                     <SingleCourse key={course.id} course={course} />
                  ))}
               </div>
            ) : (
               <p className="text-center text-gray-500">No courses available.</p>
            )}
         </div>
      </section>
   );
};

export default Courses;
