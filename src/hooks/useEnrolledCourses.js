import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../Firebase/Firebase.init';

const useEnrolledCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
                setCourses([]); // Clear courses when user logs out
            }
        });

        return () => unsubscribeAuth();
    }, []);

    useEffect(() => {
        if (!user) return;

        const userRef = doc(db, 'users', user.uid);

        const unsubscribe = onSnapshot(
            userRef,
            (docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    if (userData.enrolledCourses) {
                        setCourses(Object.values(userData.enrolledCourses)); // Convert object to array
                    } else {
                        setCourses([]);
                    }
                }
                setLoading(false);
            },
            (error) => {
                console.error('Error fetching courses:', error);
                setLoading(false);
            }
        );

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [user]);
    return [courses, loading];
};

export default useEnrolledCourses;
