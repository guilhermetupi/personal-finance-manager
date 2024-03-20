export type Response<T = null> = {
  success: boolean;
  data: T | null;
  message?: string;
};
