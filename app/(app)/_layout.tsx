import { Text } from "react-native";
import { Redirect, Tabs } from "expo-router";

import { useSession } from "@/context/ctx";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Toast from "react-native-toast-message";
import { useEffect } from "react";

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (session) {
      /*
      // Configura un intervalo para mostrar notificaciones si hay sesión
      const notificationInterval = setInterval(() => {
        Toast.show({
          type: "success",
          text1: "Le recomendamos regar 💦",
          position: "top",
          visibilityTime: 2000, // Duración en pantalla (ms)
        });
      }, 30000); // Cada 30 segundos

      // Limpieza del intervalo al desmontar
      return () => clearInterval(notificationInterval);
      */
    }
  }, [session]); // Solo se ejecuta cuando cambia `isAuthenticated`

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notificaciones",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "notifications" : "notifications-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
