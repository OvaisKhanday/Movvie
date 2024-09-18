type User = {
  id: number;
  username: string;
  name: string;
  email?: string;
  age: number;
  userImage?: string; // profile picture
};

type ApiResponse = {
  success: boolean;
  message: string;
  data?: any;
};
