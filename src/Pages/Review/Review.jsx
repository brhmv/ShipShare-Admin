import "./Review.css";
import Navbar from "../../Components/Navbar";
import { useSelector, useDispatch } from 'react-redux';
import { getAllReviews } from "../../Store/AdminSlice"
import React, { useState, useEffect } from 'react';
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { setReviewStatus } from "../../Store/AdminSlice"
import { deleteReview } from "../../Store/ReviewSlice"

function Review() {
    const dispatch = useDispatch();
    const [trigger, setTrigger] = useState(false);

    const allReviews = useSelector(state => state.admin.allReviews);

    useEffect(() => {
        dispatch(getAllReviews());
        console.log(allReviews);
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
            const status = true;
            const response = dispatch(setReviewStatus({ reviewId, status }));
            debugger;
            setTrigger(prevTrigger => !prevTrigger);
            console.log(response);
        } catch (error) {
            console.error('Error confirming post:', error);
        }
    };

    const handleDelete = async (reviewId) => {
        debugger;
        dispatch(deleteReview(reviewId));
        setTrigger(prevTrigger => !prevTrigger);
    };

    function renderReview(reviews) {
        return (
            <div>
                {reviews.map((review, index) => (
                    <div key={review.id} className='review-item'>
                        <div className="review-item-1">

                            <p className='p-detail'><span className='bold-span'>Posted By:</span> <span className="p-span-2">{review.reviewSenderId}</span></p>

                            <p className='p-detail'><span className='bold-span'>Posted To:</span> <span className="p-span-2">{review.reviewRecipientId}</span></p>

                            <p className='p-detail'><span className='bold-span'>Text:</span> <span className="p-span-2">{review.text}</span></p>

                            <p className='p-detail'><span className='bold-span'>Rating:</span> <span className="p-span-2 red-star">{renderStars(review.rating)}</span></p>

                        </div>

                        <p className="p-detail"><span className="span-detail">Is Confirmed:</span>
                            {review.isConfirmed ? <span className="greenColor">
                                Confirmed
                            </span> : <span className="redColor">
                                Not Confirmed
                            </span>}
                        </p>

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
                ))}
            </div>
        );
    }

    return (
        <div>
            < Navbar />


            <h1>Reviews</h1>
            {/* <h1>{allReviews}</h1> */}

            {allReviews && renderReview(allReviews)}



        </div >
    );
}

export default Review;