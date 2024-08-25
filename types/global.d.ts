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

// AUTH
declare interface ISignIn {
  email: string;
  password?: string;
  login_via: string;
}
declare interface ISignUp {
  name: string;
  email: string;
  password: string;
  login_via: string;
  role: string;
}
