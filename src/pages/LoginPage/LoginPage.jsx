import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../Firebase/Firebase.init';

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = location?.state?.pathname || '/';

    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });

    // Google Authentication
    const googleAuth = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    uid: user.uid,
                    name: user.displayName || '',
                    email: user.email || '',
                    photoURL: user.photoURL || '',
                    createdAt: new Date(),
                });
                toast.success('Account created successfully!');
            } else {
                toast.success('Signed in successfully!');
            }

            navigate(redirect, { replace: true });
        } catch (error) {
            console.log(error);
            toast.error(
                error.message || 'Google sign-in failed. Please try again.'
            );
        }
    };

    // Handle email input
    const handleEmail = (event) => {
        const emailInput = event.target.value;
        setEmail({
            value: emailInput,
            error: /\S+@\S+\.\S+/.test(emailInput)
                ? ''
                : 'Please enter a valid email.',
        });
    };

    // Handle password input
    const handlePassword = (event) => {
        setPassword({ value: event.target.value, error: '' });
    };

    // Handle Login
    const handleLogin = async (event) => {
        event.preventDefault();
        if (!email.value || !password.value) {
            setEmail((prev) => ({
                ...prev,
                error: email.value ? '' : 'Email is required.',
            }));
            setPassword((prev) => ({
                ...prev,
                error: password.value ? '' : 'Password is required.',
            }));
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email.value, password.value);
            toast.success('Signed in successfully!');
            navigate(redirect, { replace: true });
        } catch (error) {
            const errorMessages = {
                'auth/wrong-password': 'Incorrect password. Please try again.',
                'auth/user-not-found': 'No account found with this email.',
                'auth/too-many-requests':
                    'Too many attempts. Please try again later.',
            };
            toast.error(
                errorMessages[error.code] || 'Login failed. Please try again.'
            );
        }
    };

    // Handle Password Reset
    const handleResetPass = async () => {
        if (!email.value) {
            toast.error('Please enter your email first.');
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email.value);
            toast.success('Password reset email sent!');
        } catch (error) {
            toast.error(
                error.code === 'auth/user-not-found'
                    ? 'No account found with this email.'
                    : 'Failed to send reset email. Try again.'
            );
        }
    };
    return (
        <div className="flex min-h-screen items-center justify-center p-5">
            <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-lg overflow-hidden w-full max-w-4xl">
                {/* Left Side - Image */}
                <div
                    className="hidden md:flex md:w-1/2 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://w0.peakpx.com/wallpaper/503/347/HD-wallpaper-abstract-mountains-929-minimal-mountain-nature-peak-pretty-sky-trista-hogue.jpg')",
                    }}
                ></div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 p-8">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Login to Your Account
                    </h1>
                    <p className="text-gray-500 mb-5">
                        Welcome back! Please enter your credentials.
                    </p>

                    <form className="space-y-4" onSubmit={handleLogin}>
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-600">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email.value}
                                onChange={handleEmail}
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 rounded-md focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700 py-2 px-3 transition"
                                aria-label="Email"
                            />
                            {email.error && (
                                <span className="text-red-500 text-sm">
                                    {email.error}
                                </span>
                            )}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-600">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password.value}
                                onChange={handlePassword}
                                placeholder="********"
                                className="w-full border border-gray-300 rounded-md focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700 py-2 px-3 transition"
                                aria-label="Password"
                            />
                            {password.error && (
                                <span className="text-red-500 text-sm">
                                    {password.error}
                                </span>
                            )}
                        </div>

                        {/* Forgot Password */}
                        <button
                            type="button"
                            onClick={handleResetPass}
                            className="text-sm font-semibold text-purple-700 hover:underline transition"
                        >
                            Forgot Password?
                        </button>

                        {/* Sign In Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full text-white bg-purple-700 hover:bg-purple-900 px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>

                    {/* Google Sign In */}
                    <button
                        onClick={googleAuth}
                        className="mt-4 flex items-center justify-center w-full border border-gray-300 hover:border-gray-500 px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105"
                    >
                        <img
                            className="w-5 mr-2"
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google Logo"
                        />
                        Sign in with Google
                    </button>

                    {/* Sign Up Link */}
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-500">
                            Don't have an account?{' '}
                            <button
                                onClick={() => navigate('/register')}
                                className="text-purple-700 font-semibold hover:underline transition"
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
