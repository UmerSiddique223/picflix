import { cookies } from "next/headers";

export const getUserCookie = () => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("user");
  const user = JSON.parse(cookie.value);
  return user;
};
