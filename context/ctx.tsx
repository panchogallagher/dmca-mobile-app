import moment from "moment";
import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "../hooks/useStorageState";

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          // Perform sign-in logic here
          const randomTimestamp = Math.floor(
            Date.now() - 20 * 24 * 60 * 60 * 1000 // 30 minutos en milisegundos
          );

          // Convertir el timestamp a un formato específico
          const randomDate = moment(randomTimestamp).format(
            "YYYY-MM-DD HH:mm:ss"
          );

          setSession(
            JSON.stringify({
              name: "John Doe",
              email: "johndoe@gmail.com",
              create_date: randomDate,
            })
          );
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
