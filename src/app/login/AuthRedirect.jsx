// "use client";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export const AuthRedirect = () => {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/protected");
    }
  }, [user, router]);

  return null;
};
export default AuthRedirect;
