import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../Firebase/Firebase.init";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase/Firebase.init";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save user to Firestore
  const saveUserToFirestore = async (user) => {
    if (!user) return;
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
          createdAt: new Date().toISOString(),
          isAdmin: false,
        });
      }
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error("Failed to save user data.");
    }
  };

  // Check if user is an admin
  const checkIfAdmin = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnapshot = await getDoc(userRef);
      return userSnapshot.exists() ? userSnapshot.data().isAdmin : false;
    } catch (error) {
      console.error("Error checking admin status:", error);
      toast.error("Error checking admin privileges.");
      return false;
    }
  };

  // Google Auth Sign-up
  const googleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      await saveUserToFirestore(result.user);
      const isAdmin = await checkIfAdmin(result.user.uid);

      toast.success("Account created successfully");
      navigate(isAdmin ? "/admin-dashboard" : "/");
    } catch (error) {
      console.error("Google Auth Error:", error);
      toast.error(error.message);
    }
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {};
    const { email, password, confirmPassword } = formData;

    if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Please enter a valid email";
    if (password.length < 7)
      newErrors.password = "Password must be at least 7 characters long";
    if (!/(?=.*[A-Z])/.test(password))
      newErrors.password = "Password must contain at least one uppercase letter";
    if (!/(?=.*\d)/.test(password))
      newErrors.password = "Password must contain at least one number";
    if (!/(?=.*[@$!%*?&])/.test(password))
      newErrors.password = "Password must contain at least one special character";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Sign-up
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const { email, password } = formData;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await saveUserToFirestore(user);
      await sendEmailVerification(user);

      const isAdmin = await checkIfAdmin(user.uid);
      toast.success("Account created! Please verify your email.");

      navigate(isAdmin ? "/admin-dashboard" : "/");
    } catch (error) {
      console.error("Sign-up Error:", error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use");
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full content-center justify-center bg-gray-100 py-10">
      <div className="flex shadow-lg rounded-lg overflow-hidden">
        <div className="w-96 hidden md:block">
          <img
            className="w-full h-full object-cover"
            src="/images/login-1.svg"
            alt="Register"
          />
        </div>

        <div className="w-96 bg-white p-6 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-gray-800">Register Account</h1>
          <p className="text-sm text-gray-500">Sign up to explore courses</p>

          <form className="mt-4" onSubmit={handleSignUp}>
            <div className="mb-3">
              <label className="mb-2 block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-200"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="text-red-500 text-xs">{errors.email}</span>
              )}
            </div>

            <div className="mb-3">
              <label className="mb-2 block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                placeholder="******"
                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-200"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className="text-red-500 text-xs">{errors.password}</span>
              )}
            </div>

            <div className="mb-3">
              <label className="mb-2 block text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="******"
                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-200"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
            >
              Register
            </button>
          </form>

          <button
            onClick={googleAuth}
            className="mt-3 w-full flex items-center justify-center border px-3 py-2 rounded-md"
          >
            <img
              className="w-5 h-5 mr-2"
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
            />
            Sign up with Google
          </button>

          <div className="text-center mt-3">
            <span className="text-sm text-gray-500">
              Already have an account?{" "}
            </span>
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-semibold text-indigo-600"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
