export enum NotificationTypesEnum {
    SUCCESS = 'success',
    ERROR = 'error',
}

export interface INotification {
    id: number,
    message: string,
    type: NotificationTypesEnum,
}
