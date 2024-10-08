import { useState, useRef, useEffect, useContext } from 'react'
import classes from './Task.module.css'

import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Checkbox, Icon } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import Fade from '@mui/material/Fade'
import { NotificationContext } from '../../App'

export default function Task(props) {
    const [isEdit, setIsEdit] = useState(false)
    const [isDone, setIsDone] = useState(props.task.done)
    const [taskTitle, setTaskTitle] = useState(props.task.title ?? '')
    const [taskDescription, setTaskDescription] = useState(props.task.description ?? '')
    const [isShowDialog, setIsShowDialog] = useState(false)
    
    const inputTitleRef = useRef(null)

    const notifyContext = useContext(NotificationContext)

    useEffect(() => {
        if (isEdit) inputTitleRef?.current?.focus()
    }, [isEdit])

    const onChangeDoneStatus = () => {
        setIsDone(!isDone)
        setTimeout(() => {
            props.changeTask(props.task.id, {
                done: !isDone
            })
        }, 50)
        notifyContext.showNotification({
            message: isDone ?  `Task ${props.task.title} is active!` : `Task ${props.task.title} is done!`,
            time: 1500,
            type: 'info'
        })
    }    

    const acceptChanges = () => {
        if (taskTitle !== props.task.title || taskDescription !== props.task.description) {
            props.changeTask(props.task.id, {
                title: taskTitle,
                description: taskDescription
            })
            notifyContext.showNotification({
                message: `Task ${props.task.title} updated!`,
                time: 3000,
                type: 'success'
            })
        }
        setIsEdit(false)
    }

    const declineChanges = () => {
        setTaskTitle(props.task.title)
        setTaskDescription(props.task.description)
        setIsEdit(false)
    }

    const modalAccept = () => {
        props.deleteTask(props.task.id)
        notifyContext.showNotification({
            message: `Task ${props.task.title} deleted!`,
            time: 1500,
            type: 'success'
        })
        setIsShowDialog(false)
    }

    const modalDecline = () => {
        setIsShowDialog(false)
    }
    
    
    return (
        <Fade in>
            <div className={`${classes.task} ${isDone ? classes['is-done'] : ''}`}>
                <div className={classes['task-check']}>
                    <Checkbox 
                        checked={isDone}
                        onChange={() => onChangeDoneStatus()}
                        sx={{ color: isDone ? '#D8D8D8' : '#539CFD', '&.Mui-checked': {
                            color: isDone ? '#D8D8D8' : '#539CFD',
                        }}}
                    />
                </div>
                <div className={classes['task-info']}>
                    {
                        isEdit
                            ? <>
                                <div className={classes['task-info__title-input']}>
                                    <TextField
                                        inputRef={inputTitleRef}
                                        label="Title"
                                        defaultValue={taskTitle}
                                        onChange={(event) => setTaskTitle(event.target.value)}
                                    />
                                </div>
                                <div className={classes['task-info__description-input']}>
                                    <TextField 
                                            label="Description"
                                            defaultValue={taskDescription}
                                            onChange={(event) => setTaskDescription(event.target.value)}
                                    />
                                </div>
                            </>
                            : <>
                                <h2 className={classes['task-info__title']}>{ props.task.title }</h2>
                                <p className={classes['task-info__description']}>{ props.task.description }</p>
                            </>
                    }
                </div>
                <div className={classes['task-actions']}>
                    {
                        isEdit
                            ? <>
                                <IconButton onClick={() => acceptChanges()}>
                                    <CheckIcon sx={{ color: isDone ? '#D8D8D8' : '#539CFD'}}/>
                                </IconButton>
                                <IconButton onClick={() => declineChanges()}>
                                    <CloseIcon sx={{ color: isDone ? '#D8D8D8' : '#539CFD'}}/>
                                </IconButton>
                            </>
                            : <Checkbox 
                                checked={isEdit}
                                onChange={() => setIsEdit(!isEdit)}
                                icon={<EditIcon className={classes[isDone ? 'icon-is-done' : 'icon-is-not-done']} sx={{ color: isDone ? '#D8D8D8' : '#539CFD'}} />}
                            />
                    }
                    <IconButton onClick={() => setIsShowDialog(true)}>
                        <DeleteOutlineIcon sx={{ color: isDone ? '#D8D8D8' : '#539CFD'}}/>
                    </IconButton>
                    <Dialog
                        open={isShowDialog}
                        maxWidth='md'
                        aria-labelledby='alert-dialog-title'
                        >
                        <DialogTitle>{ 'Are you sure you want to delete this task?' }</DialogTitle>
                        <DialogActions>
                            <Button onClick={() => modalAccept()}>Delete</Button>
                            <Button onClick={() => modalDecline()}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </Fade>

    )
}