import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Theme } from "@/constants/Theme";
import { Device } from "@/types";
import { fetchDevices } from "@/services";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";

const renderItem = ({ item }: { item: Device }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{item.title}</Text>
  </View>
);

export default function Index() {
  const { t } = useTranslation();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadItems = async () => {
      const data = await fetchDevices();
      setDevices(data);
      setLoading(false);
    };

    loadItems();
  }, []);

  if (loading) {
    return (
      <View style={Theme.container}>
        <ActivityIndicator size="large" color={Colors.light.icon} />
      </View>
    );
  }

  return (
    <View style={Theme.container}>
      <Text>{t("devices.title")}</Text>
      <FlatList
        style={styles.list}
        data={devices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fafafa",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 5,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    marginLeft: 0,
    marginRight: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Para sombra en Android
  },
  title: {
    fontSize: 20,
  },
  list: {
    marginTop: 20,
  },
});
