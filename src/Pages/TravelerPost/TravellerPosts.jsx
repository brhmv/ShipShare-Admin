import Navbar from "../../Components/Navbar";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";
// import { GiWeight } from "react-icons/gi";
import { FaDollarSign } from "react-icons/fa";

import { getAllTravellerPosts } from "../../Store/AdminSlice"
import { setTravellerStatus } from "../../Store/AdminSlice"

import { deletePostAsync } from "../../Store/TravelPostSlice"

function TravellerPosts() {
    const dispatch = useDispatch();

    // const confirmedTravellerPosts = useSelector(state => state.admin.allTravellerPosts.filter(post => post.isConfirmed));
    const allTravellerPosts = useSelector(state => state.admin.allTravellerPosts);

    const [trigger, setTrigger] = useState(false);

    const handleConfirm = (postId) => {
        try {
            debugger;
            const status = true;
            const response = dispatch(setTravellerStatus({ postId, status }));
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

    const renderTravelerPosts = (posts) => {
        return (
            <div className="profile-posts-div">
                {posts.length !== 0 ?
                    posts.map((post, index) => (
                        <div key={index} className="profile-post-item">
                            <div className="profile-post-details">
                                <p className="p-detail"><span className="span-detail">Title:</span> <span className='p-span-2'>{post.title}</span></p>
                                <p className="p-detail"><span className="span-detail">Description:</span> <span className='p-span-2'>{post.description}</span></p>
                                <p className="p-detail"><span className="span-detail">Start Destination:</span> <span className='p-span-2'>{post.startDestination} <FaLocationDot /></span></p>
                                <p className="p-detail"><span className="span-detail">End Destination:</span> <span className='p-span-2'>{post.endDestination} <FaLocationDot /></span></p>
                                <p className="p-detail"><span className="span-detail">Deadline Date:</span> {formatDate(post.deadlineDate)} <FaCalendarAlt /></p>
                                <p className="p-detail"><span className="span-detail">Price:</span> {post.price} <FaDollarSign /></p>
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
                    )) : <h1 className='profile-h1-tag m-5'>No posts yet.</h1>
                }
            </div>
        );
    };

    useEffect(() => {
        dispatch(getAllTravellerPosts());
    }, [dispatch, trigger]);


    const formatDate = (dateString) => {
        const dateTime = new Date(dateString);
        const day = dateTime.getDate();
        const month = dateTime.getMonth() + 1;
        const year = dateTime.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div>
            < Navbar />

            <h1>TravelerPosts</h1>

            <div className="unconfirmed-div">
                {allTravellerPosts ? renderTravelerPosts(allTravellerPosts) : <h1>No post yet</h1>}
            </div>
        </div>
    );
}

export default TravellerPosts;