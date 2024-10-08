import { useState, useEffect } from 'react'

export default function useNotification() {
    const [notifications, setNotification] = useState([])

    useEffect(() => {
        const firstNotification = notifications[0]

        if (firstNotification) {
            const timer = setTimeout(() => {
                removeNotificationById(firstNotification.id)
            }, firstNotification?.time ?? 1000)

            return () => clearTimeout(timer)
        }
    }, [notifications])

    const removeNotificationById = (id) => {
        setNotification([...notifications].filter(notification => notification.id !== id))
    }

    const showNotification = (newNotification) => {
        setNotification([...notifications, {
            id: (notifications.at(-1)?.id + 1) || 1,
            ...newNotification
        }])
    }
    return {
        notifications,
        showNotification,
        removeNotificationById
    }
}