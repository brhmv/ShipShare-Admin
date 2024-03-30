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

const Review = () => {
    const dispatch = useDispatch();

    const reviews = useSelector(state => state.admin.allReviews);

    const [confirmedReviews,setConfirmedReviews] = useState([]);
    const [unconfirmedReviews,setUnconfirmedReviews] = useState([]);

    const [postType, setPostType] = useState('confirmed');

    const reviewInfo = useSelector((state) => state.review);

    const [trigger,setTrigger] = useState(false);

    useEffect(() => {
        dispatch(getAllReviews());
        setConfirmedReviews([...reviews.filter(r => r.isConfirmed)]);
        setUnconfirmedReviews([...reviews.filter(r => !r.isConfirmed)]);
    }, [dispatch, trigger,reviews]);

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
                setTrigger(!trigger);
                console.log(trigger);
            }
        } catch (error) {
            console.error('Error confirming Review:', error);
        }
    };

    const handleDelete = (reviewId) => {

        const response = dispatch(deleteReview(reviewId));

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
            console.log(trigger);
            setTrigger(!trigger);
            console.log("after")
            console.log(trigger);
            
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
            setTrigger(!trigger);
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
            {(postType === 'unconfirmed' && unconfirmedReviews) && renderReview(unconfirmedReviews)}

        </div >
    );
}

export default Review;