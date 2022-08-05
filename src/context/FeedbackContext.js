import { createContext, useState } from "react"
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
const [feedback, setFeedback] = useState([
    {
        id: 1,
        text: 'This is feedback item1',
        rating: 10,
    },
    {
        id: 2,
        text: 'This is feedback item2',
        rating: 6,
    },
    {
        id: 3,
        text: 'This is feedback item3',
        rating: 8,
    },
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
      }

    const deleteFeedback = (id) => {
        if (window.confirm('Do you want to Delete?')) {
          setFeedback(feedback.filter((item) => item.id !== id))
        }
        console.log('App: ', id)
      }

      const editFeedback = (item,isEdit) => {
        setFeedbackEdit({
            item,
            edit: isEdit
        })
      }

      const updateFeedback =(id, updItem) => {
        setFeedback(feedback.map((item) => (
             item.id === id? {...item, ...updItem} : item
        ))) 
      }

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
        
    }}>
        {children}
    </FeedbackContext.Provider>

}

export default FeedbackContext