export interface Batch {
  id: number;
  sku: string;
  description: string;
  entryDate: string;
  expirationDate: string;
  createdAt: string;
  lastUpdated: string;
  priority: string;
  received: boolean;
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  order?: unknown;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  admin?: unknown;
}