export interface Location {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface EditUserData {
  name: string;
  email: string;
  workplace: string;
  phoneNumber: string;
  location?: Location;
  updatedAt: string | null;
}

export interface EditedUserResponse {
  id: string;
  name: string;
  email: string;
  location: Location;
  workplace: string;
  phoneNumber: string;
  updatedAt: string | null;
}
