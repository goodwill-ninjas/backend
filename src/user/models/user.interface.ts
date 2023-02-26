export interface IUser {
  id?: number;
  email: string;
  username: string;
  password: string;
  blood_type: string;
  avatar: number;
  experience: number;
  created_at?: Date;
}
