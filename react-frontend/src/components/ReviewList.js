import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewReview from "./NewReview";
import Review from "./Review"

function ReviewList({ game_id, name, introduction, img, testUser}) {
  const params = useParams()
  const [reviews, setReviews] = useState([])
  const [users, setUsers] = useState([])
  const userData = {} 

  useEffect(() => {
    fetch("http://localhost:9292/users")
    .then((r) => r.json())
    .then((data) => setUsers(data))
  }, [])

  users.forEach((user) => {
    userData[user.id] = user.name
  })

  useEffect(() => {
    fetch(`http://localhost:9292/reviews/${params.gameId}`)
    .then((r) => r.json())
    .then((reviews) => setReviews(reviews))
  }, [params])

  if (params.gameId !== name) {
    return null
  }

  function handleAddReview(newReview) {
    setReviews([...reviews, newReview])
  }

  function handleDeleteReview(reviewId) {
    const newReviews = reviews.filter((review) => {
      return review.id !== reviewId
    })
    setReviews(newReviews)
  }

  function handleEditReview(updatedReview) {
    const newReviews = reviews.map((review) => {
      if (review.id === updatedReview.id) {
        return updatedReview
      } else {
        return review
      }
    })
    setReviews(newReviews)
  }
  
  return (
    <div>
      <img className="image" src={img} alt={name}/>
      <p className="introduction">{introduction}</p>
      <ul>
        {reviews.map((review) => {
          return (
            <li key={review.id}>
              <Review 
              review={review} 
              userData={userData} 
              testUser={testUser} 
              onDeleteReview={handleDeleteReview}
              onEditReview={handleEditReview} />
            </li>            
          )          
        })}
      </ul>
      <NewReview game_id={game_id} testUser={testUser} onAddNewReview={handleAddReview}/>     
    </div>    
  )
}

export default ReviewList;