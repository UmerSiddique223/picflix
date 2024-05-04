import { cookies } from "next/headers";

export const getUserCookie = () => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("user");
  const temp_user = JSON.parse(cookie.value);
  return temp_user;
};
