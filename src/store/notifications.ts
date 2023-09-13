import { makeAutoObservable } from "mobx";
import axiosInstance from "../services/init";
import { v4 as uuidv4 } from "uuid";

export type NotificationType = "error" | "info";

export type Notification = {
    type: NotificationType;
    id: string;
    message: string;
};

const defaultMessage =
    "Something really bad happened while uploading your image, please try again";

class Notifications {
    notifications: Notification[] = [];

    constructor() {
        makeAutoObservable(this);

        axiosInstance.interceptors.response.use(
            (res) => res,
            (error) => {
                this.add(
                    "error",
                    error.response?.data?.message ?? defaultMessage
                );
                return error;
            }
        );
    }

    add(type: NotificationType, message: string) {
        const id = uuidv4();
        this.notifications.push({
            id,
            message,
            type,
        });

        setTimeout(() => {
            this.remove(id);
        }, 12000);
    }

    remove(id: string) {
        this.notifications = this.notifications.filter(
            (notification) => notification.id !== id
        );
    }
}
const notifications = new Notifications();
export default notifications;
