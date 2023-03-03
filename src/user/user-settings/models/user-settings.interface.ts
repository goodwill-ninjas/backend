export interface IUserSettings {
  id?: number;
  user_id: number;
  theme: string;
  font_size: number;
  event_notifications: boolean;
  reminder_notifications: boolean;
  created_at?: Date;
}
