import Navbar from "../../Components/Navbar";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSenderPosts } from "../../Store/AdminSlice"
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";
import { GiWeight } from "react-icons/gi";
import { FaDollarSign } from "react-icons/fa";
import "./SenderPosts.css"

import { setSenderStatus } from "../../Store/AdminSlice"

import { deletePostAsync } from "../../Store/SenderPostSlice"


function SenderPosts() {
    const confirmedSenderPosts = useSelector(state => state.admin.allSenderPosts.filter(post => post.isConfirmed));
    const UnConfirmedSenderPosts = useSelector(state => state.admin.allSenderPosts.filter(post => !post.isConfirmed));
    const allSenderPosts = useSelector(state => state.admin.allSenderPosts);


    const [trigger, setTrigger] = useState(false);

    const dispatch = useDispatch();

    const formatDate = (dateString) => {
        const dateTime = new Date(dateString);
        const day = dateTime.getDate();
        const month = dateTime.getMonth() + 1;
        const year = dateTime.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleConfirm = (postId) => {
        try {
            const status = true;
            const response = dispatch(setSenderStatus({ postId, status }));
            setTrigger(prevTrigger => !prevTrigger);
            console.log(response);
        } catch (error) {
            console.error('Error confirming post:', error);
        }
    };

    const handleDelete = async (postId) => {
        dispatch(deletePostAsync(postId));
        setTrigger(prevTrigger => !prevTrigger);
    };


    const renderSenderPosts = (Posts) => {
        return (
            <div className="profile-posts-div">
                {Posts.map((post, index) => (
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

            <div className="info-div">
                <h1>
                    SenderPosts
                </h1>
            </div>

            {/* <div className="confirmed-div ">
                {confirmedSenderPosts ? renderSenderPosts(confirmedSenderPosts) : <h1>No post yet</h1>}
            </div> */}

            <div className="unconfirmed-div">
                {allSenderPosts ? renderSenderPosts(allSenderPosts) : <h1>No post yet</h1>}
            </div>

        </div>
    );
}

export default SenderPosts;