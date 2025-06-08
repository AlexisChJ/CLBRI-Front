export interface EditUserData {
  name: string;
  email: string;
  workplace: string;
  phone_number: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
  };
}