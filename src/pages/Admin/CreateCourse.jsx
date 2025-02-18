import React, { useState, useEffect } from 'react';
import { db, auth } from '../../Firebase/Firebase.init';
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const CreateCourse = () => {
    const [course, setCourse] = useState({
        title: '',
        shortDescription: '',
        longDescription: '',
        thumbnail: '',
        category: '',
        price: '',
        startDate: '',
        endDate: '',
        lectureLength: '',
        qrCode: '',
        perksbenefits: '',
    });

    const [isAdmin, setIsAdmin] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdminStatus = async (user) => {
            if (!user) {
                navigate('/');
                return;
            }
            try {
                const userRef = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists() && userSnap.data().isAdmin === true) {
                    setIsAdmin(true);
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error('Error checking admin status:', error);
                navigate('/');
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            checkAdminStatus(user);
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse((prev) => ({ ...prev, [name]: value }));
    };

    const handleLongDescriptionChange = (value) => {
        setCourse((prev) => ({ ...prev, longDescription: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (Object.values(course).some((field) => field.trim() === '')) {
            setError('All fields are required!');
            return;
        }

        const courseData = {
            ...course,
            price: parseFloat(course.price),
            createdAt: new Date(),
        };

        try {
            await addDoc(collection(db, 'courses'), courseData);
            alert('Course added successfully!');
            setCourse({
                title: '',
                shortDescription: '',
                longDescription: '',
                thumbnail: '',
                category: '',
                price: '',
                startDate: '',
                endDate: '',
                lectureLength: '',
                qrCode: '',
                perksbenefits: '',
            });
        } catch (error) {
            console.error('Error adding course:', error);
            setError('Failed to add course. Please try again.');
        }
    };

    if (isAdmin === null) return <p>Loading...</p>;

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Create New Course</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                {[
                    { label: 'Course Title', name: 'title', type: 'text' },
                    {
                        label: 'Short Description',
                        name: 'shortDescription',
                        type: 'text',
                    },
                    {
                        label: 'Perks & Benefits',
                        name: 'perksbenefits',
                        type: 'textarea',
                    },
                    {
                        label: 'Thumbnail Image URL',
                        name: 'thumbnail',
                        type: 'text',
                    },
                    { label: 'Category', name: 'category', type: 'text' },
                    { label: 'Price', name: 'price', type: 'number' },
                    { label: 'Start Date', name: 'startDate', type: 'date' },
                    { label: 'End Date', name: 'endDate', type: 'date' },
                    {
                        label: 'Lecture Length (e.g., 1 week, 2 weeks)',
                        name: 'lectureLength',
                        type: 'text',
                    },
                ].map(({ label, name, type }) => (
                    <div key={name}>
                        <label>{label}</label>
                        {type === 'textarea' ? (
                            <textarea
                                name={name}
                                value={course[name]}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        ) : (
                            <input
                                type={type}
                                name={name}
                                value={course[name]}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        )}
                    </div>
                ))}

                <div>
                    <label>QR Image URL</label>
                    <input
                        type="file"
                        name="qrCode"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                setCourse({ ...course, qrCode: reader.result });
                            };
                            reader.readAsDataURL(file);
                        }}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />

                    {course.qrCode && (
                        <>
                            <img
                                src={course.qrCode}
                                alt="QR Code"
                                className="w-44"
                            />
                            <a
                                href={course.qrCode}
                                target="_blank"
                                rel="noreferrer"
                            >
                                View in seperate tab
                            </a>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded block"
                                onClick={() => {
                                    setCourse({ ...course, qrCode: '' });
                                }}
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>

                {/* Rich Text Editor for Long Description */}
                <div>
                    <label>Long Description</label>
                    <ReactQuill
                        theme="snow"
                        value={course.longDescription}
                        onChange={handleLongDescriptionChange}
                        className="bg-white"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-indigo-500 text-white px-4 py-2 rounded"
                >
                    Create Course
                </button>
            </form>
        </div>
    );
};

export default CreateCourse;
