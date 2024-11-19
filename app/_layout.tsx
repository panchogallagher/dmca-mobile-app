import { SessionProvider } from "@/context/ctx";
import { Slot } from "expo-router";
import "@/i18n"; // Importa la configuración de i18n
import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";
import { Gradient } from "@/constants/Colors";
import { Theme } from "@/constants/Theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Root() {
  // Set up the auth context and render our layout inside of it.

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LinearGradient
        // Los colores del gradiente
        colors={Gradient}
        // La dirección del gradiente (diagonal)
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={Theme.gradient}
      >
        <SessionProvider>
          <Slot />
          <Toast />
        </SessionProvider>
      </LinearGradient>
    </GestureHandlerRootView>
  );
}
