import {INotification} from "./INotification";

export interface INotificationProps {
    notification: INotification;
    setNotification: (notification: INotification) => void;
}