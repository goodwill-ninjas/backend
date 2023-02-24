export interface IDonation {
  id?: number;
  user_id: number;
  companion_user_id?: number;
  donated_type: string;
  amount: number;
  blood_pressure?: string;
  hemoglobin?: number;
  details?: string;
  donated_at: Date;
  createdAt?: Date;
}
