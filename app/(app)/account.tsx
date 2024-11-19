/*
import { Theme } from "@/constants/Theme";
import { useSession } from "@/context/ctx";
import { Button, Text, View } from "react-native";

export default function Account() {
  const { signOut } = useSession();
  return (
    <View style={Theme.container}>
      <Text>Account</Text>
      <Button
        title="Sign Out"
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      />
    </View>
  );
}
*/

import { Gradient } from "@/constants/Colors";
import { Theme } from "@/constants/Theme";
import { useSession } from "@/context/ctx";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";

const AccountScreen = () => {
  const { signOut, session } = useSession();
  const user = JSON.parse(session!);

  return (
    <LinearGradient
      // Los colores del gradiente
      colors={Gradient}
      // La dirección del gradiente (diagonal)
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={Theme.gradient}
    >
      <View style={styles.container}>
        {/* Detalles de la Cuenta */}
        <View style={styles.accountDetails}>
          <Text style={styles.title}>Detalles de la Cuenta</Text>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{user.name}</Text>
          <Text style={styles.label}>Correo Electrónico:</Text>
          <Text style={styles.value}>{user.email}</Text>
          <Text style={styles.label}>Fecha creación:</Text>
          <Text style={styles.value}>{user.create_date}</Text>
        </View>

        {/* Botón para Cerrar Sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => signOut()}>
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#f5f5f5",
    padding: 16,
  },
  accountDetails: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2, // Para Android
    shadowColor: "#000", // Para iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: "#777",
  },
  logoutButton: {
    backgroundColor: "#FF4C4C",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    elevation: 3,
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default AccountScreen;
