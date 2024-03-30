import "./Review.css";
import Navbar from "../../Components/Navbar";
import { useSelector, useDispatch } from 'react-redux';
import { getAllReviews } from "../../Store/AdminSlice"
import React, { useState, useEffect, useCallback } from 'react';
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { setReviewStatus } from "../../Store/AdminSlice"
import { deleteReview } from "../../Store/ReviewSlice"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Review() {
    const dispatch = useDispatch();
    const [trigger, setTrigger] = useState(false);

    const unConfirmedReviews = useSelector(state => state.admin.allReviews.filter(post => !post.isConfirmed));
    const confirmedReviews = useSelector(state => state.admin.allReviews.filter(post => post.isConfirmed));

    const [postType, setPostType] = useState('confirmed');

    const reviewInfo = useSelector((state) => state.review);

    useEffect(() => {
        dispatch(getAllReviews());
    }, [dispatch, trigger]);

    const renderStars = (numStars) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= numStars)
                stars.push(<span key={i}><FaStar /></span>);
            else
                stars.push(<span key={i}><FaRegStar /></span>);
        }
        return stars;
    };

    const handleConfirm = (reviewId) => {
        try {
            debugger;
            const status = true;
            const response = dispatch(setReviewStatus({ reviewId, status }));

            console.log(response);
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
                // ActivateTrigger();
                setTrigger(true);
            }
        } catch (error) {
            console.error('Error confirming Review:', error);
        }
    };

    const ActivateTrigger = useCallback(() => {
        setTrigger(prevTrigger => !prevTrigger);
    }, []);

    const handleDelete = (reviewId) => {

        const response = dispatch(deleteReview(reviewId));

        ActivateTrigger();

        const error = reviewInfo.error ?? true

        if (error) {
            toast.success('review deleted Succesfully!', {
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
        else {
            toast.error('Failed to delete review!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
            setTrigger(true);
            // ActivateTrigger();
        }

    };

    function renderReview(reviews) {
        return (
            <div className="reviews">
                {reviews.length !== 0 ?
                    reviews.map((review, index) => (
                        <div key={review.id} className='review-item'>
                            <div className="review-item-1">

                                <p className='p-detail'><span className='bold-span'>Posted By:</span> <span className="p-span-2">{review.reviewSenderId}</span></p>

                                <p className='p-detail'><span className='bold-span'>Posted To:</span> <span className="p-span-2">{review.reviewRecipientId}</span></p>

                                <p className='p-detail'><span className='bold-span'>Text:</span> <span className="p-span-2">{review.text}</span></p>

                                <p className='p-detail'><span className='bold-span'>Rating:</span> <span className="p-span-2 red-star">{renderStars(review.rating)}</span></p>

                                <p className="p-detail"><span className="span-detail">Is Confirmed:</span>
                                    {review.isConfirmed ? <span className="greenColor">
                                        Confirmed
                                    </span> : <span className="redColor">
                                        Not Confirmed
                                    </span>}
                                </p>
                            </div>


                            {!review.isConfirmed ?
                                <div className='d-flex align-content-center justify-content-center'>
                                    <button type="button" className="btn btn-success btn-lg mg-5 " onClick={() => handleConfirm(review.id)}>
                                        Confirm
                                    </button>

                                    <button className="btn btn-danger btn-lg mg-5" onClick={() => handleDelete(review.id)}>
                                        Delete
                                    </button>
                                </div>
                                :
                                <div className='d-flex align-content-center justify-content-center'>
                                    <button className="btn btn-danger btn-lg" onClick={() => handleDelete(review.id)}>Delete</button>
                                </div>
                            }
                        </div>
                    )) : <h1 className='mg-5 npy'>No Review yet.</h1>
                }
            </div>
        );
    }

    const handlePostTypeChange = (type) => {
        setPostType(type);
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
                    Confirmed Reviews
                </button>

                <button
                    className={`btn ${postType === 'unconfirmed' ? 'btn-danger' : 'btn-secondary'}`}
                    onClick={() => handlePostTypeChange('unconfirmed')}
                >
                    UnConfirmed Reviews
                </button>
            </div>

            <br />

            {(postType === 'confirmed' && confirmedReviews) && renderReview(confirmedReviews)}
            {(postType === 'unconfirmed' && unConfirmedReviews) && renderReview(unConfirmedReviews)}

        </div >
    );
}

export default Review;