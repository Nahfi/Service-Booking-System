export const getNotificationTemplateBadgeClass = (type) => {
    switch (type) {
        case "incoming":
            return "success";
        case "outgoing":
            return "info";
        case "both":
            return "danger";
    }
};
