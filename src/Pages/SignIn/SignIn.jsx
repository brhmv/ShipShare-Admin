import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signOut } from "../../Store/AuthSlice"
import { useNavigate } from "react-router-dom";
import "./SignIn.css"

function SignIn() {
    const navigate = useNavigate();


    const handleSignOut = () => {
        dispatch(signOut());
        navigate("/");
    };

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signInInfo = useSelector((state) => state.auth);

    useEffect(() => {
        if (signInInfo.isAuthenticated) {
            // toast.success(`You successfully logged in`);

            setTimeout(() => {
                // setIsLoading(false);
                navigate("/home");
            }, 2000);

            alert("You successfully logged in");
        } else {
            if (signInInfo.error != null) {
                // toast.error(`${signInInfo.error}`);
                // setIsLoading(false);
            }
        }
    }, [signInInfo]);


    const handleOnClick = async () => {
        // setIsLoading(true);
        debugger;
        dispatch(signIn({ email: email, password: password }));
    };

    return (
        // <div>
        //     <p>
        //         Sign in
        //     </p>


        //     <form action="/#" className="login-form sign-in-form">
        //         <div className="form-group text_box">
        //             <label className="f_p text_c f_400">Email</label>
        //             <input
        //                 type="text"
        //                 placeholder="shipshare@gmail.com"
        //                 value={email}
        //                 onChange={(e) => setEmail(e.target.value)}
        //             />
        //         </div>

        //         <div className="form-group text_box">
        //             <label className="f_p text_c f_400">Password</label>
        //             <input
        //                 type="password"
        //                 placeholder="**********"
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //             />
        //         </div>

        //         <button type="button" className="btn_three fs" onClick={handleOnClick}>Sign in</button>
        //     </form>

        //     <button type="button" className="btn_three fs" onClick={handleSignOut}>Sign out</button>

        // </div>

        <div className="divtemp">

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

                            <div class="links">
                                {/* <a href="#">Forgot Password</a> <a href="#">Signup</a> */}

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