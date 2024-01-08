import useSWR from "swr";
import axios from "@/app/libs/axios";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/auth";

interface AuthData {
  email: string;
  password: string;
}

export const useAuth = (
  middleware: string,
  redirectIfAuthenticated: string
) => {
  const router = useRouter();
  const params = useParams();
  const setToken = useAuthStore((state) => state.setToken);
  const setAuth = useAuthStore((state) => state.setIsAuth);
  const isAuth = useAuthStore((state) => state.isAuth);
  const setDataUser = useAuthStore((state) => state.setDataUser);

  const csrf = () => axios.get("/sanctum/csrf-cookie");
  /* 
  const register = async ({
    setErrors,
    ...props
  }: {
    setErrors: any;
    props: any;
  }) => {
    await csrf();
    setErrors([]);
    axios
      .post("/register", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        setErrors(error.response.data.errors);
      });
  }; */

  const login = async ({
    setErrors,
    setStatus,
    props: { email, password },
  }: {
    setErrors: any;
    setStatus: any;
    props: AuthData;
  }) => {
    await csrf();
    setErrors([]);
    setStatus(null);

    axios
      .post("/login", {
        email,
        password,
      })
      .then((res) => {
        setToken(res?.data?.token);
        setAuth(true);
        setDataUser(res?.data?.user);
        return;
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const forgotPassword = async ({
    setErrors,
    setStatus,
    email,
  }: {
    setErrors: any;
    setStatus: any;
    email: string;
  }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/forgot-password", { email })
      .then((response) => setStatus(response.data.status))
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resetPassword = async ({
    setErrors,
    setStatus,
    ...props
  }: {
    setErrors: any;
    setStatus: any;
    props: any;
  }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/reset-password", { token: params.token, ...props })
      .then((response) =>
        router.push("/login?reset=" + btoa(response.data.status))
      )
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resendEmailVerification = ({ setStatus }: { setStatus: any }) => {
    axios
      .post("/email/verification-notification")
      .then((response) => setStatus(response.data.status));
  };

  const logout = async () => {
    await axios.post("/logout").then(() => {
      setToken(null);
      setAuth(false);
      setDataUser(null);
    });

    router.push("/login");
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && isAuth)
      router.push(redirectIfAuthenticated);
    if (!isAuth) router.push("/login");
  }, [middleware, isAuth, redirectIfAuthenticated, router]);

  return {
    /*  register, */
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
