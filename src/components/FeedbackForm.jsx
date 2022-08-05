import { useState, useContext, useEffect } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm({handleAdd}) {

  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const {addFeedback, updateFeedback, editFeedback, feedbackEdit} = useContext(FeedbackContext)

  useEffect(() =>{
    if(feedbackEdit.edit === true){
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  },[feedbackEdit])

  const handleTextChange = (e) => {

    if(text === ''){
        setBtnDisabled(true)
        setMessage('')
    }else if(text !== '' && text.trim().length <= 10){
        setBtnDisabled(true)
        setMessage('Text must be atleast 10 characters')
    }else{
        setBtnDisabled(false)
        setMessage('')
    }
    setText(e.target.value)
 
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(text.trim().length > 10){
      const newFeedback = {
        text,
        rating
      }

      if(feedbackEdit.edit === true){
        updateFeedback(feedbackEdit.item.id, newFeedback)
        editFeedback(feedbackEdit, false)
      }else{
        addFeedback(newFeedback)
      }
      
      setText('')

    }

  }
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate our service?</h2>
        <RatingSelect select = {(rating) => setRating(rating)}/>
        <div className="input-group">
            <input type="text" placeholder='Write a review' onChange = {handleTextChange} value={text}></input>
            <Button type="submit" isDisaled={btnDisabled}>Done</Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
