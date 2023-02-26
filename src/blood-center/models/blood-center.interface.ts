export interface IBloodCenter {
  id?: number;
  name: string;
  street_name: string;
  street_number: number;
  postal_code: string;
  city: string;
  voivodeship: string;
  open_from?: string;
  open_to?: string;
  created_at?: Date;
}
