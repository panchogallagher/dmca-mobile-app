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
import { Colors, Gradient } from "@/constants/Colors";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DeviceView } from "@/components/DeviceView";
import WeatherCard from "@/components/WeatherCard";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  const { t } = useTranslation();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);

  const openModal = (device: any) => {
    setSelectedDevice(device);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDevice(null);
  };

  const openAddModal = () => {
    setAddModalVisible(true);
  };

  const closeAddModal = () => {
    setAddModalVisible(false);
  };

  useEffect(() => {
    const loadItems = async () => {
      const data = await fetchDevices();
      setDevices(data);
      setLoading(false);
    };
    loadItems();
  }, []);

  const renderItem = ({ item }: { item: Device }) => (
    <TouchableOpacity
      style={styles2.itemContainer}
      onPress={() => openModal(item)}
    >
      <View style={styles2.iconContainer}>
        <FontAwesome5 name={item.icon} size={24} color="#4CAF50" />
      </View>
      <View style={styles2.textContainer}>
        <Text style={styles2.name}>{item.unit}</Text>
        <Text style={styles2.detail}>{item.title}</Text>
        <Text style={styles2.date}>{item.date}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#333" />
    </TouchableOpacity>
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
      <View style={Theme.container}>
        <Text style={styles2.title}>{t("welcome")}, John</Text>
        <WeatherCard></WeatherCard>
        <Text>{t("devices.title")}</Text>
        {loading ? (
          <ActivityIndicator color={Colors.light.icon} />
        ) : (
          <>
            <FlatList
              style={styles2.list}
              data={devices}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
            <View style={styles2.fabContainer}>
              <TouchableOpacity
                style={styles2.fab}
                onPress={openAddModal as any}
              >
                <MaterialIcons name="add" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </>
        )}
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
                    <Text style={styles2.modalTitle}>
                      {selectedDevice.title}
                    </Text>
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
        <Modal
          visible={addModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={closeAddModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Añadir Dispositivo IoT</Text>
                <TouchableOpacity onPress={closeAddModal}>
                  <MaterialIcons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>
              <ScrollView>
                <Text style={styles.modalText}>
                  Para añadir un dispositivo IoT, sigue estos pasos:
                </Text>
                <Text style={styles.modalStep}>
                  1. Asegúrate de que el dispositivo esté conectado a la red
                  Wi-Fi.
                </Text>
                <Text style={styles.modalStep}>
                  2. Abre la aplicación móvil y selecciona "Añadir Dispositivo".
                </Text>
                <Text style={styles.modalStep}>
                  3. Introduce el código de emparejamiento del dispositivo.
                </Text>
                <Text style={styles.modalStep}>
                  4. Configura los parámetros básicos, como el nombre del
                  dispositivo y su ubicación.
                </Text>
                <Text style={styles.modalStep}>
                  5. Guarda los cambios para finalizar la configuración.
                </Text>
                <Text style={styles.modalText}>
                  Una vez añadido, podrás gestionar y monitorear tu dispositivo
                  desde la aplicación.
                </Text>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
  fab: {
    position: "absolute",
    bottom: 20, // Distancia desde el fondo
    right: 20, // Distancia desde el borde derecho
    backgroundColor: "#4CAF50",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Sombra en Android
    shadowColor: "#000", // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    elevation: 5, // Para Android
    shadowColor: "#000", // Para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  modalText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  modalStep: {
    fontSize: 16,
    color: "#777",
    marginBottom: 8,
    paddingLeft: 10,
  },
});

const styles2 = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
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
  fab: {
    //position: "absolute",
    //bottom: 0, // Distancia desde el fondo
    //right: 0, // Distancia desde el borde derecho
    backgroundColor: "#4CAF50",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Sombra en Android
    shadowColor: "#000", // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    zIndex: 100,
  },
  fabContainer: {
    position: "relative", // Relativo al contenedor principal
    width: "100%",
    alignItems: "flex-end", // Alinea el FAB a la derecha
    //padding: 20, // Espacio desde el borde
    bottom: 0,
  },
});
