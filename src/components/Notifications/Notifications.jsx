import classes from './Notifications.module.css'
import Notification from '../Notification/Notification'

export default function Notifications(props) {
    return (
        <div className={classes['notification-wrapper']}>
            {
                props.notifications && props.notifications.map((notification) => {
                    return <Notification key={`Notification-${notification.id}`} notification={notification}/>
                })
            }
        </div>
    )
}