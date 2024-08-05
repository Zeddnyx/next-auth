declare interface ISession {
  user: {
    id?: string;
    name?: string;
    email?: string;
    last_login?: string;
    role?: string;
    image?: string;
  };
  token?: string;
  credentials?: string;
}
