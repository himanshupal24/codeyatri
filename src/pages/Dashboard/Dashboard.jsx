import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { auth } from '../../Firebase/Firebase.init';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import useEnrolledCourses from '../../hooks/useEnrolledCourses';
import MyCourse from './MyCourse';
import MyCourses from '../../components/Admin/MyCourses';

function RenderSection({ query, currentUser }) {
    const [courses, loading] = useEnrolledCourses();
    switch (query) {
        case 'courses':
            return <MyCourses courses={courses} loading={loading} />;
        case 'profile':
            return (
                <div className="m-6 flex flex-col p-8 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg">
                    {/* Profile Header */}
                    <div className="flex items-center space-x-6">
                        <img
                            src={
                                currentUser?.photoURL ||
                                'https://via.placeholder.com/150'
                            }
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-indigo-500"
                        />
                        <div>
                            <h1 className="text-3xl font-bold">
                                {currentUser?.displayName || 'User'}
                            </h1>
                            <p className="text-gray-500 dark:text-gray-300">
                                {currentUser?.email}
                            </p>
                            <p className="text-sm text-gray-400">
                                Logged in via:{' '}
                                {currentUser?.providerData?.[0]?.providerId ||
                                    'Unknown'}
                            </p>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold">
                            Account Information
                        </h2>
                        <div className="mt-4 space-y-2">
                            <p>
                                <strong>UID:</strong> {currentUser?.uid}
                            </p>
                            <p>
                                <strong>Email Verified:</strong>{' '}
                                {currentUser?.emailVerified
                                    ? 'Yes ✅'
                                    : 'No ❌'}
                            </p>
                            <p>
                                <strong>Anonymous:</strong>{' '}
                                {currentUser?.isAnonymous ? 'Yes' : 'No'}
                            </p>
                            <p>
                                <strong>Total cources:</strong> {courses.length}
                            </p>
                            <p>
                                <strong>Last Login:</strong>{' '}
                                {new Date(
                                    parseInt(currentUser?.lastLoginAt)
                                ).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* Profile Actions */}
                    <div className="mt-6 flex space-x-4">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition">
                            Edit Profile
                        </button>
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition"
                            onClick={() => signOut(auth)}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            );

        default:
            return <MyCourse />;
    }
}

const Dashboard = () => {
    const [searchParams] = useSearchParams();
    const section = searchParams.get('section') || 'courses';
    const navigate = useNavigate();
    const currentUser = auth.currentUser;
    // Handle Logout
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                toast.success('Logged out successfully');
                navigate('/');
            })
            .catch((error) => {
                console.error('Logout Error:', error);
            });
    };

    return (
        <div className="h-screen bg-gray-100 dark:bg-gray-900 flex">
            <aside className="w-1/5 h-full items-center space-y-4 p-4 bg-gray-100 dark:bg-gray-800">
                <div className="flex flex-col items-center space-y-4">
                    <img
                        src={
                            currentUser?.photoURL ||
                            'https://via.placeholder.com/100'
                        }
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-gray-300 dark:border-gray-600"
                    />
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                        {currentUser?.displayName || 'User'} 🎉
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        {currentUser?.email}
                    </p>
                </div>
                {/* Dashboard Links */}
                <div className="mt-6 space-y-4">
                    <button
                        onClick={() => navigate('/dashboard?section=courses')}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition"
                    >
                        My Courses
                    </button>

                    <button
                        onClick={() => navigate('/dashboard?section=profile')}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition"
                    >
                        My Profile
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition"
                    >
                        Logout
                    </button>
                </div>
            </aside>
            <main>
                <RenderSection query={section} currentUser={currentUser} />
            </main>
        </div>
    );
};

export default Dashboard;
