export declare interface IUserState {
  id?: string;
  avatar?: string | undefined;
  email?: string;
  name?: string;
  nickname?: string;
  birthDate?: string;
  gender?: number | string | undefined;
  phone?: string;
  subscribeNewsletter?: boolean;
  isEmailVerified?: boolean;
  category?: string[];
  collects?: string[];
  notifications?: string[];
  contactName?: string;
  contactPhone?: string;
  city?: string;
  district?: string;
  postalCode?: string;
  address?: string;
  role?: string;
  createdAt?: Date | null;
}
