import React from 'react';

import useEnrolledCourses from '../../hooks/useEnrolledCourses';

const MyCourse = () => {
    const [courses, loading] = useEnrolledCourses();
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                    My Courses
                </h2>
                {loading ? (
                    <p className="text-gray-600 dark:text-gray-300">
                        Loading courses...
                    </p>
                ) : courses.length > 0 ? (
                    <ul className="space-y-4">
                        {courses.map((course, index) => (
                            <li
                                key={index}
                                className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow"
                            >
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {course.courseTitle}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Transaction ID:</strong>{' '}
                                    {course.transactionId}
                                </p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Date:</strong>{' '}
                                    {course.timestamp?.seconds
                                        ? new Date(
                                              course.timestamp.seconds * 1000
                                          ).toLocaleDateString()
                                        : 'N/A'}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600 dark:text-gray-300">
                        No enrolled courses found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default MyCourse;
