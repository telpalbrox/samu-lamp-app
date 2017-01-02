interface Notification {
    title: string;
    package: string;
    text: string;
    textLines: string;
}

interface NotificationListener {
    listen(callback: (notification: Notification) => any);
}

declare var notificationListener: NotificationListener;
