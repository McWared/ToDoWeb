import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import classes from './AddForm.module.css'
import { useState, useEffect, useContext } from 'react'
import { NotificationContext } from '../../App'

export default function AddForm (props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isTitleValid, setIsTitleValid] = useState(title && title.trim())
    const [isDescriptionValid, setIsDescriptionValid] = useState(description && description.trim())

    const notifyContext = useContext(NotificationContext)
    
    useEffect(() => {
        setIsTitleValid(title && title.trim())
        setIsDescriptionValid(description && description.trim())
    }, [title, description])

    const addNewTask = (event) => {
        event.preventDefault()

        if(!isTitleValid || !isDescriptionValid) return

        props.addTask({
            title,
            description
        })

        notifyContext.showNotification({
            message: "Task added!",
            time: 2000,
            type: "success"
        })
    }

    return (
        <>
        <form
            className={classes['add-task-form']}
            onSubmit={(event) => {
                addNewTask(event)
                props.closeModal()}
            }
            >
            <h2>New task</h2>
            <div className={classes['form-title']}>
                <TextField 
                helperText={!isTitleValid && "Necessary to fill"}
                error={!isTitleValid}
                value={title}
                label="Title"
                onChange={(event) => setTitle(event.target.value)}/>
            </div>
            <div className={classes['form-description']}>
                <TextField 
                helperText={!isDescriptionValid && "Necessary to fill"}
                error={!isDescriptionValid}
                value={description}
                label="Description"
                onChange={(event) => setDescription(event.target.value)}/>
            </div>
            <Button type='submit' variant='outlined'>Submit</Button>
        </form>
        </>
    )
}