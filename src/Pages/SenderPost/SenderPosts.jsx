import Navbar from "../../Components/Navbar";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSenderPosts } from "../../Store/AdminSlice"
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";
import { GiWeight } from "react-icons/gi";
import { FaDollarSign } from "react-icons/fa";

function SenderPosts() {
    const SenderPosts = useSelector(state => state.admin.allSenderPosts);
    const dispatch = useDispatch();


    const formatDate = (dateString) => {
        const dateTime = new Date(dateString);
        const day = dateTime.getDate();
        const month = dateTime.getMonth() + 1;
        const year = dateTime.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const renderSenderPosts = () => {
        return (
            <div className="profile-posts-div">
                {SenderPosts.length !== 0 ?
                    SenderPosts.map((post, index) => (
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
                                {/* 
                                <div className='d-flex align-content-center justify-content-center'>
                                    <button className="btn btn-warning m-3 f_size_20" onClick={() => handleUpdate(post, 'sender')}>Edit</button>
                                    <button className="btn btn-danger m-3 f_size_20" onClick={() => handleDeletePost(post.id, 'sender')}>Delete</button>
                                </div> */}
                            </div>
                        </div>
                    )) : <h1 className='profile-h1-tag m-5'>No posts yet.</h1>
                }
            </div >
        );
    };

    useEffect(() => {
        console.log('Sender posts');
        dispatch(getAllSenderPosts());
        console.log('sender x');
    }, [dispatch]);

    return (
        <div>
            <Navbar />



            {/* {SenderPosts === 'sender' && renderSenderPosts()} */}

            SenderPosts
        </div>
    );
}

export default SenderPosts;