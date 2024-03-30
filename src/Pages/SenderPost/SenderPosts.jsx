import Navbar from "../../Components/Navbar";
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSenderPosts } from "../../Store/AdminSlice"
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";
import { GiWeight } from "react-icons/gi";
import { FaDollarSign } from "react-icons/fa";
import "./SenderPosts.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { setSenderStatus } from "../../Store/AdminSlice"

import { deletePostAsync } from "../../Store/SenderPostSlice"


function SenderPosts() {
    const confirmedSenderPosts = useSelector(state => state.admin.allSenderPosts.filter(post => post.isConfirmed)) ?? <h1>No Post Yet!</h1>;
    const unConfirmedSenderPosts = useSelector(state => state.admin.allSenderPosts.filter(post => !post.isConfirmed)) ?? <h1>No Post Yet!</h1>;

    const [postType, setPostType] = useState('confirmed');

    const senderPostInfo = useSelector((state) => state.senderPost);

    const [trigger, setTrigger] = useState(false);

    const dispatch = useDispatch();



    const handleConfirm = (postId) => {
        try {
            const status = true;
            const response = dispatch(setSenderStatus({ postId, status }));


            if (response.error) {
                toast.error('Failed to Confirm Traveler Post!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
            } else {
                toast.success('Traveler Post Confirmed Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
                ActivateTrigger();
            }
        }
        catch (error) {
            console.error('Error confirming post:', error);
        }
    };

    const ActivateTrigger = useCallback(() => {
        setTrigger(prevTrigger => !prevTrigger);
    }, []);

    const handleDelete = async (postId) => {
        const response = dispatch(deletePostAsync(postId));

        ActivateTrigger();

        const error = senderPostInfo.error ?? true

        if (error) {
            toast.success('Sender Post deleted Succesfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });

            // ActivateTrigger();
        }
        else {
            toast.error('Failed to delete Sender Post!', {
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

    const formatDate = (dateString) => {
        const dateTime = new Date(dateString);
        const day = dateTime.getDate();
        const month = dateTime.getMonth() + 1;
        const year = dateTime.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handlePostTypeChange = (type) => {
        setPostType(type);
    };

    const renderSenderPosts = (Posts) => {
        return (
            <div className="profile-posts-div">
                {Posts.length !== 0 ?
                    Posts.map((post, index) => (
                        <div key={index} className="profile-post-item">
                            <div className="post-image">
                                <img src={post.itemPhotos ? post.itemPhotos["$values"][0] : "null"} alt={post.id} />
                            </div>

                            <div className="profile-post-details">
                                <p className="p-detail"><span className="span-detail">Title:</span> <span className='p-span-2'>{post.title}</span></p>
                                <p className="p-detail"><span className="span-detail">Description:</span> <span className='p-span-2'>{post.description}</span> </p>
                                <p className="p-detail"><span className="span-detail">Start Destination:</span> <span className='p-span-2'>{post.startDestination} <FaLocationDot /></span></p>
                                <p className="p-detail"><span className="span-detail">End Destination:</span> <span className='p-span-2'>{post.endDestination} <FaLocationDot /></span></p>
                                <p className="p-detail"><span className="span-detail">Deadline Date:</span> {formatDate(post.deadlineDate)} <FaCalendarAlt /></p>
                                <p className="p-detail"><span className="span-detail">Item Category: </span>{post.itemType}</p>
                                <p className="p-detail"><span className="span-detail">Price:</span> {post.price} <FaDollarSign /></p>
                                <p className="p-detail"><span className="span-detail">Weight:</span> {post.itemWeight} <GiWeight /></p>
                                <p className="p-detail"><span className="span-detail">Views:</span> {post.views} <AiFillEye /></p>

                                <p className="p-detail"><span className="span-detail">Is Confirmed:</span>
                                    {post.isConfirmed ? <span className="greenColor">
                                        Confirmed
                                    </span> : <span className="redColor">
                                        Not Confirmed
                                    </span>}
                                </p>


                                {!post.isConfirmed ?
                                    <div className='d-flex align-content-center justify-content-center'>
                                        <button type="button" className="btn btn-success btn-lg mg-5 " onClick={() => handleConfirm(post.id)}>
                                            Confirm
                                        </button>

                                        <button className="btn btn-danger btn-lg mg-5" onClick={() => handleDelete(post.id)}>
                                            Delete
                                        </button>
                                    </div>
                                    :
                                    <div className='d-flex align-content-center justify-content-center'>
                                        <button className="btn btn-danger btn-lg" onClick={() => handleDelete(post.id)}>Delete</button>
                                    </div>
                                }

                            </div>
                        </div>
                    ))
                    : <h1 className='mg-5 npy'>No Post Yet!</h1>
                }
            </div >
        );
    };

    useEffect(() => {
        dispatch(getAllSenderPosts());
    }, [dispatch, trigger]);

    return (
        <div>
            <Navbar />

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


            <div className="profile-button-div">
                <button
                    className={`btn ${postType === 'confirmed' ? 'btn-success' : 'btn-secondary'}`}
                    onClick={() => handlePostTypeChange('confirmed')}
                >
                    Confirmed Sender Posts
                </button>

                <button
                    className={`btn ${postType === 'unconfirmed' ? 'btn-danger' : 'btn-secondary'}`}
                    onClick={() => handlePostTypeChange('unconfirmed')}
                >
                    UnConfirmed Sender Posts
                </button>
            </div>

            <br />


            {(postType === 'confirmed' && confirmedSenderPosts) && renderSenderPosts(confirmedSenderPosts)}
            {(postType === 'unconfirmed' && unConfirmedSenderPosts) && renderSenderPosts(unConfirmedSenderPosts)}



        </div>
    );
}

export default SenderPosts;