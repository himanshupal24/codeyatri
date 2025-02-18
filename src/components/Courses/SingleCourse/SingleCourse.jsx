import React from "react";
import { useNavigate } from "react-router-dom";

const SingleCourse = ({ course }) => {
   const navigate = useNavigate();

   const buyCourse = (id) => {
      navigate(`/checkout/${id}`);
   };

   // Format price
   const formattedPrice = course?.price
      ? new Intl.NumberFormat("en-IN", {
           style: "currency",
           currency: "INR",
        }).format(course.price)
      : "Free";

   return (
      <div className="p-4 md:w-1/3">
         <div className="h-full border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
            {/* Handle missing image by using a placeholder */}
            <img
               className="lg:h-48 md:h-36 w-full object-cover object-center"
               src={course?.thumbnail || "/placeholder-course.jpg"} // Fallback image
               alt={course?.title || "Course"}
               loading="lazy" // Improves performance
            />
            <div className="p-6">
               <h2 className="tracking-widest text-xs font-medium text-gray-400 mb-1 uppercase">
                  {course?.category || "General"}
               </h2>
               <h1 className="text-lg font-semibold text-gray-900 mb-3">
                  {course?.title || "Untitled Course"}
               </h1>
               <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
                  {course?.shortDescription || "No description available."}
               </p>
               <div className="flex justify-between items-center">
                  <button
                     onClick={() => buyCourse(course?.id)}
                     className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition"
                  >
                     Join Now
                  </button>
                  <span className="bg-gray-100 text-gray-900 font-semibold px-4 py-2 rounded-md">
                     {formattedPrice}
                  </span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SingleCourse;
