// import { useState } from "react";
// import { useRouter } from "next/router";
// import { Link } from "next/link";

// const Signup = () => {
//   const [userInfo, setUserInfo] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmpassword: "",
//   });
//   const router = useRouter();
//   const handleChange = (e) => {
//     setUserInfo((prev) => {
//       return {
//         ...prev,
//         [e.target.name]: e.target.value,
//       };
//     });
//   };

//   const handleSubmit = async (e) => {
//     const errors = {};
//     //validate information before submitting
//     e.preventDefault();
//     if (userInfo.password !== userInfo.confirmpassword) {
//       errors.password = "Passwords must be same";
//     }
//     if (!errors) {
//       return;
//     }

//     createUser();
//   };
//   const createUser = async () => {
//     try {
//       const res = await fetch("/api/UsersApi", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify(userInfo),
//       });
//       router.push(`/`);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div className="form-container">
//       <form className="form" onSubmit={handleSubmit}>
//         <h1>Sign Up</h1>
//         <div className="link--signup">
//           <p>Already have an account?</p>
//           <Link href="/auth/signin">Login</Link>
//         </div>
//         <input
//           className="form-username"
//           type="text"
//           placeholder="John Cena"
//           value={userInfo.username}
//           onChange={handleChange}
//           name="username"
//         />
//         <input
//           className="form-email"
//           type="email"
//           placeholder="john@email.com"
//           value={userInfo.email}
//           onChange={handleChange}
//           name="email"
//         />
//         <input
//           className="form-password"
//           type="password"
//           placeholder="*******"
//           value={userInfo.password}
//           onChange={handleChange}
//           name="password"
//         />
//         <input type="submit" value="Register" />
//       </form>
//     </div>
//   );
// };

// export default Signup;
