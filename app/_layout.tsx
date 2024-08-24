import { SessionProvider } from "@/context/ctx";
import { Slot } from "expo-router";
import "@/i18n"; // Importa la configuración de i18n

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
