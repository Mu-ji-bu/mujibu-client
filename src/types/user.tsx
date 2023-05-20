export declare interface IUserState {
  id?: string;
  uid: string;
  avatar?: string | undefined;
  userName: string;
  email: string;
  nickname?: string;
  birthDate?: string;
  gender?: number;
  phone?: string;
  subscribeNewsletter?: boolean;
  category?: string[];
  contactName?: string;
  contactPhone?: string;
  city?: string;
  district?: string;
  postalCode?: string;
  address?: string;
  createdAt?: Date | null;
}
