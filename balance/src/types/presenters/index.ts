export type Response<T = undefined> = {
  success: boolean;
  data?: T;
  message?: string;
};
