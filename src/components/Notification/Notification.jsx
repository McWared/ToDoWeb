import classes from './Notification.module.css'
import Alert from '@mui/material/Alert'

export default function Notification(props) {
    return (
        <div className={classes.notification}>
            <Alert severity={props.notification.type}>
                { props.notification?.message ?? "Notification" }
            </Alert>

        </div>
    )
}