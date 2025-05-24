export type Response<Data> = {
  resultCode: number;
  messages: string[];
  data: Data;
};

export type Request = {
  email: string;
  password: string;
  rememberMe?: boolean;
};
