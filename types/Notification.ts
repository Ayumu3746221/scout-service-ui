export interface Notification {
  id: number;
  user_id: number;
  content: string;
  is_read: boolean;
  notifiable_type: string | null;
  notifiable_id: number;
  notification_type: string | null;
  created_at: string;
  sender_id: number;
  notifiable: {
    id: number;
  };
}

export interface NotificationsResponse {
  notifications: Notification[];
  unread_count: number;
}
