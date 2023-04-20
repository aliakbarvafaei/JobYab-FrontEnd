export interface GeneralType {
  id: number;
  title: string;
}
type User = {
  activity_field: string;
  company_english_name: string;
  company_persian_name: string;
  company_phone_number: string;
  id: number;
  introduction: string;
  level: string;
  logo: string | null;
  number_of_personnel: string;
  type: string;
  user: number;
  website: string | null;
};
export type PostType = {
  id: number;
  city: GeneralType;
  cooperation_type: string;
  created_date: string;
  degree: string;
  description: string;
  experience: string;
  job_type: GeneralType;
  salary: string;
  sarbazi: string;
  sex: string;
  skills: GeneralType[];
  state: GeneralType;
  title: string;
  user: User;
  is_bookmark?: boolean;
};

type UserSpecificData = {
  date_joined: string;
  email: string;
  email_active_code: string;
  first_name: string;
  groups: string[];
  id: number;
  is_active: boolean;
  is_authorized: boolean;
  is_employer: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_login: string;
  last_name: string;
  password: string;
  user_permissions: string[];
  username: string;
};
export type UserType = {
  address: string;
  phone_number: string;
  national_code: string;
  full_name: string;
  data: UserSpecificData;
};

export type StateType = {
  id: number;
  title: string;
  order: number;
};
