import { Colors } from "@/constants/Colors";
import { fetchDeviceActivity } from "@/services";
import { Activity, Device } from "@/types";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

const activityLog = [
  { id: "1", activity: "Mantenimiento realizado", date: "2024-11-10" },
  { id: "2", activity: "Nivel bajo detectado", date: "2024-11-08" },
  { id: "3", activity: "Dispositivo reiniciado", date: "2024-11-05" },
];

export function DeviceView({ item }: { item: Device }) {
  const [activity, setActivity] = useState<Activity[]>([]);
  const [loadingActivity, setLoadingActivity] = useState<boolean>(true);

  useEffect(() => {
    const loadItems = async () => {
      const data = await fetchDeviceActivity();
      setActivity(data);
      setLoadingActivity(false);
    };
    loadItems();
  }, []);

  const renderActivityItem = ({
    item,
  }: {
    item: { id: string; activity: string; date: string };
  }) => (
    <View style={styles2.activityItem}>
      <Text style={styles2.activityText}>
        - {item.date}: {item.activity}
      </Text>
    </View>
  );

  return (
    <>
      <Text style={styles2.modalDetail}>Última lectura: {item.unit}</Text>
      <Text style={styles2.modalDate}>Última actualización: {item.date}</Text>
      <View style={styles2.chartContainer}>
        <Text style={styles2.chartTitle}>Datos Recientes</Text>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get("window").width - 40} // from react-native
          height={220}
          chartConfig={{
            backgroundColor: "#333",
            backgroundGradientFrom: "#333",
            backgroundGradientTo: "#999",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#4CAF50",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      <Text style={styles2.activityTitle}>Registro de Actividad</Text>
      {loadingActivity ? (
        <ActivityIndicator size="large" color={Colors.light.icon} />
      ) : (
        <FlatList
          data={activity}
          renderItem={renderActivityItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </>
  );
}

const styles2 = StyleSheet.create({
  modalDetail: {
    fontSize: 18,
    color: "#555",
    marginBottom: 8,
  },
  modalDate: {
    fontSize: 16,
    color: "#777",
    marginBottom: 16,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 16,
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  activityText: {
    fontSize: 16,
    color: "#555",
  },
  activityDate: {
    fontSize: 14,
    color: "#777",
  },
  chartContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
});