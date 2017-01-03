interface Notification {
    title: string;
    package: string;
    text: string;
    textLines: string;
    appName: string;
}

interface NotificationListener {
    listen(callback: (notification: Notification) => any);
}

declare var notificationListener: NotificationListener;
