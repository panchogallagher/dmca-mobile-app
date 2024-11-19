import { Colors, Gradient } from "@/constants/Colors";
import { Theme } from "@/constants/Theme";
import { fetchNotifications } from "@/services/NotificationService";
import { Activity } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadItems = async () => {
      const data = await fetchNotifications();
      setNotifications(data);
      setLoading(false);
    };
    loadItems();
  }, []);

  const renderItem = ({
    item,
  }: {
    item: { id: string; activity: string; date: string };
  }) => (
    <View style={styles.notificationContainer}>
      <Text style={styles.notificationText}>{item.activity}</Text>
      <Text style={styles.notificationDate}>{item.date}</Text>
    </View>
  );

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
        <Text style={styles.title}>Notificaciones</Text>
        {loading ? (
          <ActivityIndicator color={Colors.light.icon} />
        ) : (
          <FlatList
            data={notifications}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    //backgroundColor: "#f5f5f5",
    padding: 20,
  },
  listContainer: {
    paddingBottom: 16,
  },
  notificationContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2, // Para Android
    shadowColor: "#000", // Para iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  notificationText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  notificationDate: {
    fontSize: 12,
    color: "#777",
  },
});

export default NotificationScreen;
