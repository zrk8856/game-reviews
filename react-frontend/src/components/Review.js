import React, { useState } from "react";

function Review({ review, userData, testUser, onDeleteReview }) {
  const timeStamp = new Date(review.created_at).toLocaleDateString()
  const user = userData[review.user_id]

  let isCurrentUser = testUser.name === user



  return (
    <div>
      <span>{user}</span>
      <span>{timeStamp}</span>
      <p>{review.review}</p>
      {
        isCurrentUser ?
        <button onClick={handleDeleteClick}>
          Delete
        </button>
        : null
      }
    </div>
  )









}

export default Review;