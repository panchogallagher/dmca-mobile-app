import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Theme } from "@/constants/Theme";
import { Device } from "@/types";
import { fetchDevices } from "@/services";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DeviceView } from "@/components/DeviceView";
import Toast from "react-native-toast-message";

export default function Index() {
  const { t } = useTranslation();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);

  const openModal = (device: any) => {
    setSelectedDevice(device);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDevice(null);
  };

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

  const renderItem = ({ item }: { item: Device }) => (
    <TouchableOpacity
      style={styles2.itemContainer}
      onPress={() => openModal(item)}
    >
      <View style={styles2.iconContainer}>
        <FontAwesome5 name={item.icon} size={24} color="#4CAF50" />
      </View>
      <View style={styles2.textContainer}>
        <Text style={styles2.name}>{item.title}</Text>
        <Text style={styles2.detail}>Última lectura: {item.unit}</Text>
        <Text style={styles2.date}>{item.date}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#333" />
    </TouchableOpacity>
  );

  return (
    <View style={Theme.container}>
      <Text>{t("devices.title")}</Text>
      <FlatList
        style={styles2.list}
        data={devices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <View style={styles2.modalOverlay}>
          <View style={styles2.modalContent}>
            <View style={styles2.modalHeader}>
              {selectedDevice && (
                <>
                  <FontAwesome5
                    name={selectedDevice.icon}
                    size={24}
                    color="#333"
                  />
                  <Text style={styles2.modalTitle}>{selectedDevice.title}</Text>
                </>
              )}
              <Pressable onPress={closeModal}>
                <MaterialIcons name="close" size={24} color="#333" />
              </Pressable>
            </View>

            <View style={styles2.modalBody}>
              {selectedDevice && (
                <DeviceView item={selectedDevice}></DeviceView>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles2 = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  icon: {
    marginRight: 16,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  detail: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  list: {
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    padding: 0,
    backgroundColor: "#fff",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#333",
    backgroundColor: "#f1f1f1",
  },
  modalBody: {
    alignItems: "flex-start", // Alinea el contenido al inicio
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    color: "#333",
  },
});
