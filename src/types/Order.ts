import { UserShowData } from '@/types/ShowUserData';

export interface Order {
  id: string;
  sentBy: UserShowData;
  receivedBy: UserShowData; 

  createdAt: string; 
  updatedAt: string;
  deliveredAt: string;

  completed: boolean;
}