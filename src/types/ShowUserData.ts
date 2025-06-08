export interface UserLocation {
  id: number;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  createdAt: string;
  lastUpdated: string | null;
}

export interface UserShowData {
  name: string;
  email: string;
  firebaseId: string;
  workplace: string;
  phoneNumber: string;
  location: UserLocation;
}