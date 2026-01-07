
export interface House {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  description: string;
}

export interface UserCredentials {
  email: string;
  password?: string;
}
