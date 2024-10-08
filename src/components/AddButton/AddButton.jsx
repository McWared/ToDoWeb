import classes from './AddButton.module.css'
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import AddForm from '../AddForm/AddForm';
import { useState } from 'react';

export default function AddButton(props) {
    const [isModal, setIsModal] = useState(false)

    return (
        <>
            <Dialog open={isModal} onClose={() => setIsModal(false)}>
                {props.children(() => setIsModal(false))}
            </Dialog>
            <div onClick={() => setIsModal(true)} className={classes['add-task-button']}>
                <AddIcon sx={{ width: 30, color: 'white' }}/>
            </div>
        </>
    )
}