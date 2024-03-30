import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../Store/AuthSlice"
import { useNavigate } from "react-router-dom";
import "./SignIn.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signInInfo = useSelector((state) => state.auth);

    useEffect(() => {

        if (signInInfo.isAuthenticated && signInInfo.accessToken) {

            setTimeout(() => {
                // navigate("/home");
                navigate("/SenderPosts");
            }, 2000);

            toast.success('You successfully logged in!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        }

        else if (signInInfo.Error) {
            toast.error("Invalid Email or Password!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        }

    }, [signInInfo]);


    const handleOnClick = async () => {

        debugger;

        const response = dispatch(signIn({ email: email, password: password }))
        console.log(response);


        if (signInInfo.error) {
            toast.error("Invalid Email or Password!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        }
    };

    return (
        <div className="divtemp">

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <section>
                {[...Array(130)].map((_, index) => (
                    <span key={index}></span>
                ))}

                <div class="signin">
                    <div class="content">

                        <h2>Sign In</h2>

                        <div class="form">

                            <div class="inputBox">

                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <i className="placeholder-in">Email</i>

                            </div>

                            <div class="inputBox">

                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <i className="placeholder-in">Password</i>

                            </div>


                            <div class="inputBox">
                                <input type="submit" value="Login" onClick={handleOnClick} />
                            </div>

                        </div>

                    </div>

                </div>

            </section>
        </div>

    );
}

export default SignIn;