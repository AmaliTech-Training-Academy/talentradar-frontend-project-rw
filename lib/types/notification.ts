export type NotificationCategory = "SUCCESS" | "WARNING" | "ERROR" | "INFO";
export type NotificationEventType = "FEEDBACK" | "ASSESSMENT" | "AI_SCORE" | "OTHER";

export interface INotification {
  id: string;
  category: NotificationCategory;
  eventType: NotificationEventType;
  title: string;
  content: string;
  sentAt: string;
  readAt?: string;
}