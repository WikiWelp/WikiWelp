export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};

export interface UserDao {
  id: number;
  email: string;
  password: string;
}
