import React from 'react';

const Footer = () => {
   return (
      <footer className="text-gray-600 body-font">
         <div className="bg-gray-100">
            <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
               <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                  <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                  <span className="ml-3 text-xl">Code Yatri</span>
               </a>
               <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">
                  © 2025 Code-Yatri —
               </p>
               <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                  <a className="text-gray-500">
                     <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                     </svg>
                  </a>
                  <a className="ml-3 text-gray-500">
                     <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                     </svg>
                  </a>
                  <a className="ml-3 text-gray-500">
                     <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                     </svg>
                  </a>
                  <a className="ml-3 text-gray-500">
                     <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                        <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                        <circle cx="4" cy="4" r="2" stroke="none"></circle>
                     </svg>
                  </a>
               </span>
            </div>
         </div>
      </footer>
   );
};

export default Footer;




// import React, { useState } from "react";
// import { auth, db } from "../../Firebase/Firebase.init";
// import { doc, setDoc, getDoc } from "firebase/firestore";

// const Footer = () => {
//   const [isAffiliate, setIsAffiliate] = useState(false);
//   const [referralLink, setReferralLink] = useState("");

//   const registerAffiliate = async () => {
//     if (!auth.currentUser) {
//       alert("You need to be logged in!");
//       return;
//     }

//     const userRef = doc(db, "affiliates", auth.currentUser.uid);
//     const docSnap = await getDoc(userRef);

//     if (docSnap.exists()) {
//       alert("You're already an affiliate!");
//       setReferralLink(`http://localhost:3000/?ref=${auth.currentUser.uid}`);
//       setIsAffiliate(true);
//       return;
//     }

//     try {
//       await setDoc(userRef, {
//         userId: auth.currentUser.uid,
//         email: auth.currentUser.email,
//         referralCode: auth.currentUser.uid,
//         earnings: 0,
//       });

//       setReferralLink(`http://localhost:3000/?ref=${auth.currentUser.uid}`);
//       setIsAffiliate(true);
//       alert("Affiliate registration successful!");
//     } catch (error) {
//       console.error("Error registering affiliate:", error);
//       alert("Failed to register as an affiliate.");
//     }
//   };

//   return (
//     <footer className="text-gray-600 body-font">
//       <div className="bg-gray-100">
//         <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
//           <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
//             <img
//               src="https://flowbite.com/docs/images/logo.svg"
//               className="mr-3 h-6 sm:h-9"
//               alt="Flowbite Logo"
//             />
//             <span className="ml-3 text-xl">Code Yatri</span>
//           </a>
//           <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">
//             © 2025 Code-Yatri —
//           </p>
//           <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
//             <a className="text-gray-500">
//               <svg
//                 fill="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 className="w-5 h-5"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
//               </svg>
//             </a>
//             <a className="ml-3 text-gray-500">
//               <svg
//                 fill="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 className="w-5 h-5"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
//               </svg>
//             </a>
//           </span>
//         </div>

//         {/* Affiliate Registration Button */}
//         <div className="text-center mt-4">
//           {isAffiliate ? (
//             <div>
//               <p className="text-green-600 font-semibold">
//                 You're an affiliate! 🎉
//               </p>
//               <input
//                 type="text"
//                 className="border rounded px-2 py-1 w-full text-center"
//                 value={referralLink}
//                 readOnly
//               />
//             </div>
//           ) : (
//             <button
//               onClick={registerAffiliate}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Become an Affiliate
//             </button>
//           )}
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
