import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/Firebase.init';

const RequireAuth = ({ children }) => {
   const [currentUser, setCurrentUser] = useState(null);
   const navigate = useNavigate();
   const location = useLocation();

   // Track authentication state
   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         setCurrentUser(user); // Null if no user
      });

      return () => unsubscribe(); // Properly clean up
   }, []);

   // Redirect to login if not authenticated
   useEffect(() => {
      if (currentUser === null) {
         navigate('/login', { state: { from: location } });
      }
   }, [currentUser, navigate, location]);

   if (!currentUser) {
      return null; // Prevents rendering protected content before auth state is determined
   }

   return children;
};

export default RequireAuth;
