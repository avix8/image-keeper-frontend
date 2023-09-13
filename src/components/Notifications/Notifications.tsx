import classnames from "classnames";
import notifications from "../../store/notifications";
import styles from "./Notifications.module.css";
import { observer } from "mobx-react-lite";

const Notifications = () => {
    return (
        <div className={styles.notifications}>
            {notifications.notifications.map((notification) => {
                return (
                    <div key={notification.id} className={styles.notification}>
                        <div
                            className={classnames(
                                styles.title,
                                styles[notification.type]
                            )}
                        >
                            Sorry, but
                        </div>
                        <div className={styles.text}>
                            {notification.message}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default observer(Notifications);
