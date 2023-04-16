interface GeneralType {
  id: number;
  title: string;
}
export type User = {
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
};
