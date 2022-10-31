import { Store } from 'react-notifications-component';


export function successMessage(message) {
    Store.addNotification({
        title: "Success",
        message: message,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 1500
        }
    });
}