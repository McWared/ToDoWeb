import classes from './Search.module.css'
import { useState, useEffect } from 'react'

import TextField from '@mui/material/TextField'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export default function Search(props) {
    const [searchText, setSearchText] = useState('')
    const [isClear, setIsClear] = useState(false)

    useEffect(() => {
        if (searchText) {
            props.setSearchGlobal(searchText)
            setIsClear(true)
        }
        else {
            setIsClear(false)
            props.setSearchGlobal('')
        }

    }, [searchText])

    const onClearClick = () => {
        props.setSearchGlobal('') 
        setIsClear(false)
        setSearchText('')
    }

    return (
        <div className={classes['search']}>
            <TextField
                label="Search"
                variant='outlined'
                fullWidth
                value={searchText}
                onInput={(event) => setSearchText(event.target.value)} 
            />
            {
                isClear && 
                <IconButton className={classes.clear} onClick={() => onClearClick()}>
                    <CloseIcon />
                </IconButton>
            }
        </div>
    )
}