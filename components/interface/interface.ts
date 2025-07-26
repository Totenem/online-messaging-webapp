export interface UserData {
    id: number;
    uuid: string;
    name: string;
    email: string;
    created_at: string;
  }
  
export interface FilteredUser {
    id: number;
    name: string;
    email: string;
  }