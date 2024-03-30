import Navbar from "../../Components/Navbar";
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";
// import { GiWeight } from "react-icons/gi";
import { FaDollarSign } from "react-icons/fa";
import { deletePostAsync } from "../../Store/TravelPostSlice"
import { getAllTravellerPosts } from "../../Store/AdminSlice"
import { setTravellerStatus } from "../../Store/AdminSlice"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TravellerPosts() {
    const dispatch = useDispatch();
    const [postType, setPostType] = useState('confirmed');

    const travellerPosts = useSelector(state => state.admin.allTravellerPosts)
    const [confirmedTravellerPosts,setConfirmedTravellerPosts]= useState([]);
    const [unConfirmedTravellerPosts,setunConfirmedTravellerPosts] = useState([]);

    const travelPostInfo = useSelector((state) => state.travelPost);
    const [trigger, setTrigger] = useState(false);

    const [filteredPosts, setFilteredPosts] = useState("");
    const [startLocation, setStartLocation] = useState('');
    const [endLocation, setEndLocation] = useState('');

    const handleConfirm = (postId) => {
        try {
            const status = true;
            const response = dispatch(setTravellerStatus({ postId, status }));
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
                setTrigger(!trigger);
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
                setTrigger(!trigger);
            }
        } catch (error) {
            console.error('Error confirming post:', error);
        }
    };


    const handleDelete = async (postId) => {
        dispatch(deletePostAsync(postId));

        const error = travelPostInfo.error ?? true

        if (error) {
            toast.success('Traveler Post deleted Succesfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
            setTrigger(!trigger);
        }
        else {
            toast.error('Failed to delete Traveler Post!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
            setTrigger(!trigger);
        }

    };

    const handleSearch = () => {

        let postsToSearch = [];
        if (postType === 'confirmed') {
            postsToSearch = confirmedTravellerPosts;
        } else if (postType === 'unconfirmed') {
            postsToSearch = unConfirmedTravellerPosts;
        }

        if (Array.isArray(postsToSearch)) {
            const filtered = postsToSearch.filter(post =>
                post.startDestination.toLowerCase().includes(startLocation.toLowerCase()) &&
                post.endDestination.toLowerCase().includes(endLocation.toLowerCase())
            );
            setFilteredPosts(filtered);
        } else {
            console.error('Posts to search is not an array:', postsToSearch);
            setFilteredPosts([]);
        }
    };

    const renderTravelerPosts = () => {
        return (
            <div>


                <div className="search-div">
                    <form className="search-form">
                        <div className="form-outline" data-mdb-input-init>
                            <input
                                id="search-focus"
                                placeholder='Start Location'
                                value={startLocation}
                                onChange={e => setStartLocation(e.target.value)}
                                type="search"
                                className="form-control"
                            />
                        </div>

                        <div className="form-outline" data-mdb-input-init>
                            <input
                                id="search-focus-form1"
                                type="search"
                                value={endLocation}
                                onChange={e => setEndLocation(e.target.value)}
                                placeholder='End Location'
                                className="form-control"
                            />
                        </div>

                        <button
                            type="button"
                            className="btn btn-primary"
                            data-mdb-ripple-init="true"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </form>
                </div>

                <br />

                <div className="profile-posts-div">

                    {filteredPosts.length !== 0 ?
                        filteredPosts.map((post, index) => (
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
                        )) : <h1 className='mg-5 npy'>No Post Yet!</h1>
                    }
                </div>
            </div>

        );
    };

    useEffect(() => {
        dispatch(getAllTravellerPosts());

        setConfirmedTravellerPosts([...travellerPosts.filter(p => p.isConfirmed)]);
        setunConfirmedTravellerPosts([...travellerPosts.filter(p => !p.isConfirmed)]);
        setFilteredPosts(confirmedTravellerPosts)
    }, [dispatch, trigger,travellerPosts]);

    useEffect(() => {
        if (postType === 'confirmed') {
            setFilteredPosts(confirmedTravellerPosts);
        } else if (postType === 'unconfirmed') {
            setFilteredPosts(unConfirmedTravellerPosts);
        }
    }, [postType, confirmedTravellerPosts, unConfirmedTravellerPosts]);

    const formatDate = (dateString) => {
        const dateTime = new Date(dateString);
        const day = dateTime.getDate();
        const month = dateTime.getMonth() + 1;
        const year = dateTime.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handlePostTypeChange = (type) => {
        setPostType(type);

        if (type === 'confirmed') {
            setFilteredPosts(confirmedTravellerPosts)
        }

        else if (type === 'unconfirmed') {
            setFilteredPosts(unConfirmedTravellerPosts);
        }
    };

    return (
        <div>
            < Navbar />

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
                    Confirmed Traveler Posts
                </button>

                <button
                    className={`btn ${postType === 'unconfirmed' ? 'btn-danger' : 'btn-secondary'}`}
                    onClick={() => handlePostTypeChange('unconfirmed')}
                >
                    UnConfirmed Traveler Posts
                </button>
            </div>

            <br />



            {/* {(postType === 'confirmed' && confirmedTravellerPosts) && renderTravelerPosts(confirmedTravellerPosts)}
            {(postType === 'unconfirmed' && unConfirmedTravellerPosts) && renderTravelerPosts(unConfirmedTravellerPosts)} */}


            {renderTravelerPosts()};

        </div>
    );
}

export default TravellerPosts;