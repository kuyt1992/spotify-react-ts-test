import { useSetAccessToken } from "../hooks/useSetAccessToken";

// アプリマウント時にアクセストークンをセット
export const AppInit = () => {
  useSetAccessToken();
  return null;
};
