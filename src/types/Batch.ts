export interface Batch {
  id: number;
  sku: string;
  description: string;
  entryDate: string;
  expirationDate: string;
  createdAt: string;
  lastUpdated: string;
  priority: string;
  classification?: {
    id: number;
    name: string;
  };
  location?: {
    id: number;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    createdAt: string;
    lastUpdated: string;
  };
  order?: any;
  admin?: any;
}