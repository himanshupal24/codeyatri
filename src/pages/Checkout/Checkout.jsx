import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../Firebase/Firebase.init";
import { doc, getDoc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const Checkout = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    transactionId: "",
  });
  const [orderedCourse, setOrderedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [agree, setAgree] = useState(false);
  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;
      try {
        const courseRef = doc(db, "courses", courseId);
        const courseSnap = await getDoc(courseRef);
        if (courseSnap.exists()) {
          setOrderedCourse(courseSnap.data());
        } else {
          toast.error("Course not found.");
          navigate("/courses");
        }
      } catch (error) {
        toast.error("Error fetching course details.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const joinCourse = async () => {
    if (!currentUser) {
      toast.error("You must be logged in to enroll.");
      return;
    }
    if (Object.values(formData).some((val) => !val.trim()) || !agree) {
      toast.error("Fill all fields and accept terms.");
      return;
    }
    try {
      const userRef = doc(db, "users", currentUser.uid);
      const orderRef = doc(db, "orders", `${currentUser.uid}_${courseId}`);

      await setDoc(orderRef, {
        ...formData,
        userId: currentUser.uid,
        courseId,
        courseTitle: orderedCourse?.title || "",
        timestamp: new Date(),
      });

      await setDoc(
        userRef,
        {
          enrolledCourses: {
            [courseId]: {
              courseTitle: orderedCourse?.title || "",
              timestamp: new Date(),
            },
          },
        },
        { merge: true }
      );

      toast.success(`Enrolled in ${orderedCourse?.title}!`);
      setTimeout(() => navigate("/my-courses"), 2000);
    } catch (error) {
      toast.error("Enrollment failed. Try again.");
      console.error(error);
    }
  };

  if (loading) {
    return <p className="text-center mt-5 text-gray-600">Loading course details...</p>;
  }

  return (
    <div className="flex justify-center px-6 my-12">
      <div className="w-full xl:w-3/4 lg:w-11/12 flex flex-col md:flex-row items-start bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full md:w-5/12 bg-gray-100 p-6">
          <img
            className="h-40 rounded w-full object-cover mb-6"
            src={orderedCourse?.thumbnail}
            alt={orderedCourse?.title || "Course"}
          />
          <h3 className="text-indigo-500 text-xs font-medium uppercase">
            {orderedCourse?.category}
          </h3>
          <h2 className="text-lg text-gray-900 font-semibold mb-2">
            {orderedCourse?.title}
          </h2>
          <p className="text-gray-700 text-sm mb-4">{orderedCourse?.shortDescription}</p>
          <p className="text-gray-700 text-sm mb-4 " dangerouslySetInnerHTML={{ __html: orderedCourse?.longDescription }}></p>

        </div>

        <div className="w-full md:w-7/12 p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800">Enroll Now</h2>
          {Object.keys(formData).map((field) => (
            <div key={field} className="mt-4">
              <label className="block text-gray-700 capitalize font-medium">
                {field.replace("Id", " ID")}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={`Enter your ${field}`}
                required
              />
            </div>
          ))}

          {orderedCourse?.qrCode && (
            <div className="mt-4 text-center">
              <h3 className="text-gray-700 text-sm font-medium">Scan QR Code to Join</h3>
              <img
                src={orderedCourse.qrCode}
                alt="Course QR Code"
                className="h-32 w-32 mx-auto mt-2 border border-gray-300 rounded"
              />
            </div>
          )}

          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
            />
            <label className="ml-2 text-gray-700 text-sm">Accept Terms & Conditions</label>
          </div>

          <button
            onClick={joinCourse}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 mt-4 rounded w-full transition duration-300"
          >
            Join Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
