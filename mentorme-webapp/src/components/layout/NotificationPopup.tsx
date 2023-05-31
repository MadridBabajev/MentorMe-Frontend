import {useEffect, useRef} from "react";
import {INotificationProps} from "../../types/props/layout/INotificationProps";
import {NotificationColors} from "../../types/dto/domain/enums/NotificationColors";

const NotificationPopup = ({ notification, setNotification }: INotificationProps) => {
    const timeoutId = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (notification.message !== '') {
            // Clear the existing timeout
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }

            timeoutId.current = setTimeout(() => {
                setNotification({ message: '', color: '' });
            }, 6000);
        }
    }, [notification, setNotification]);

    return (
        notification.message ? (
            <div className={`notification-popup ${notification.color === NotificationColors.SUCCESS ? 'SUCCESS' : 'ERROR'}`}>
                {notification.message}
            </div>
        ) : null
    );
};

export default NotificationPopup;