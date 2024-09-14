import { Store } from "react-notifications-component"

const notifications = {
    vmanage_fail: {
        title: "ChaosSentry",
        message: "",
        type: "danger",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
    },
    vmanage_success: {
      title: "ChaosSentry",
      message: "",
      type: "success",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true
      }
    },
    vmanage_info: {
      title: "ChaosSentry",
      message: "",
      type: "info",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true
      }
    }
}



const details = {
    "SCAN_STARTED": (...args) => `Scanning IP(s): ${args[0]}`,
    "INVALID_VMWARE_PATH": (...args) => `Provided VMWARE folder does not exist for vm '${args[0]}'`,
    "INVALID_VMX_PATH": (...args) => `Provided VMX file does not exist for vm '${args[0]}'`,
    "INVALID_VMWARE_VALUE": (...args) => "Provided VMWARE value is invalid",
    "UNKNOWN_VM_NAME": (...args) => `unknown vm '${args[0]}', not present in the server`,
    "MISSING_KEY_NAME": (...args) => "ERROR: Missing key name in request",
    "INVALID_KEY_NAME": (...args) => "ERROR: Invalid key name in request",
    "START_SUCCESS": (...args) => `vm '${args[0]}' has been started`,
    "STOP_SUCCESS": (...args) => `vm '${args[0]}' has been stopped`,
    "HOST_UP": (...args) => `vm '${args[0]}' is up at '${args[1]}'`,
    "HOST_DOWN": (...args) => `vm '${args[0]}' is down at '${args[1]}'`,
    "VM_ADDED": (...args) => `vm '${args[0]}' has been added`,
    "VM_REMOVED": (...args) => `vm '${args[0]}' has been removed`,
    "VM_ONLINE": (...args) => `vm '${args[0]}' is now online at '${args[1]}'`

}

const setMessage = (notif_name, message, args=null) => {
    let notification = notifications[notif_name];
    if (notification == null) return;
    message = message.toUpperCase();
    let message_str = details[message](args);
    notification.message = message_str;
    return notification;
}

export { notifications, setMessage }