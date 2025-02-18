import React, { useState } from 'react';

const MyCourses = ({ courses, loading }) => {
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
                            <CourseCard key={index} course={course} />
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

const CourseCard = ({ course }) => {
    const [isScheduleOpen, setIsScheduleOpen] = useState(false);

    return (
        <li className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow">
            {/* Course Title */}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {course.courseTitle}
            </h3>

            {/* Transaction ID */}
            <p className="text-gray-700 dark:text-gray-300">
                <strong>Transaction ID:</strong> {course.transactionId}
            </p>

            {/* Date */}
            <p className="text-gray-700 dark:text-gray-300">
                <strong>Date:</strong>{' '}
                {course.timestamp?.seconds
                    ? new Date(
                          course.timestamp.seconds * 1000
                      ).toLocaleDateString()
                    : 'N/A'}
            </p>

            {/* Schedule Section (Collapsible) */}
            {course.schedule?.length > 0 && (
                <div className="mt-4">
                    <button
                        onClick={() => setIsScheduleOpen(!isScheduleOpen)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
                    >
                        {isScheduleOpen ? 'Hide Schedule' : 'View Schedule'}
                    </button>

                    {isScheduleOpen && (
                        <div className="mt-3 p-4 bg-gray-300 dark:bg-gray-600 rounded-md">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Upcoming Meetings:
                            </h4>
                            <ul className="space-y-2">
                                {course.schedule.map((meeting, index) => (
                                    <li
                                        key={index}
                                        className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md"
                                    >
                                        <p>
                                            <strong>Date:</strong>{' '}
                                            {meeting.date || 'N/A'}
                                        </p>
                                        {meeting.meetingLink ? (
                                            <p>
                                                <strong>Meeting Link:</strong>{' '}
                                                <a
                                                    href={meeting.meetingLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 underline"
                                                >
                                                    Join Meeting
                                                </a>
                                            </p>
                                        ) : (
                                            <p className="text-gray-500">
                                                No meeting link available.
                                            </p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </li>
    );
};

export default MyCourses;
