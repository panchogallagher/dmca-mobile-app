import { Activity, Device, DeviceType } from "@/types";
import moment from "moment";
import "moment/locale/es"; // Importa el idioma español

moment.locale("es");

const deviceTypes: DeviceType[] = [
  {
    name: "Sensor de humedad",
    icon: "water",
    unit: "%",
    min: 30,
    max: 95,
  },
  {
    name: "Barómetro",
    icon: "cloud-moon",
    unit: "hPa",
    min: 870,
    max: 1084,
  },
  {
    name: "Termómetro",
    icon: "thermometer-half",
    unit: "°C",
    min: 0,
    max: 37,
  },
];

const capitalizeFirstLetter = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * (max + 1)); // Incluye el valor máximo X
}

const randomUnit = (obj: DeviceType): string => {
  const total = obj.min + Math.round(Math.random() * (obj.max - obj.min));
  return `${total}${obj.name === "Barómetro" ? " " + obj.unit : obj.unit}`;
};

const generateDevice = (i: number): Device => {
  const index = getRandomInt(deviceTypes.length - 1);
  const dev: DeviceType = deviceTypes[index];
  const id = (i + 1).toString();

  const randomTimestamp = Math.floor(
    Date.now() - Math.random() * 30 * 60 * 1000 // 30 minutos en milisegundos
  );

  // Convertir el timestamp a un formato específico
  const randomDate = moment(randomTimestamp).format("YYYY-MM-DD HH:mm:ss");

  return {
    id: id,
    icon: dev.icon,
    title: dev.name,
    unit: randomUnit(dev),
    date: randomDate,
  };
};

const generateActivity = (i: number): Activity => {
  const activity =
    getRandomInt(100) > 50
      ? "Se recomienda regar durante la próxima hora"
      : "Se recomienda no regar en la próxima hora";

  const pastDate = moment().subtract(i * (12 + getRandomInt(6)), "hours");

  // Formatear la fecha como "hace un rato"
  const timeAgo = pastDate.fromNow();

  return {
    id: (i + 1).toString(),
    activity: activity,
    date: capitalizeFirstLetter(timeAgo),
  };
};

// Función para generar un listado dummy de items
const generateDummyItems = (count: number): Device[] => {
  return Array.from({ length: count }, (_, i) => generateDevice(i));
};

const generateDummyActivity = (count: number): Activity[] => {
  return Array.from({ length: count }, (_, i) => generateActivity(i));
};

export const fetchDevices = async (): Promise<Device[]> => {
  return new Promise((resolve) => {
    const dummyItems = generateDummyItems(5); // Genera 10 items dummy
    setTimeout(() => {
      resolve(dummyItems);
    }, 3000); // Simula un retraso de 2 segundos
  });
};

export const fetchDeviceActivity = async (): Promise<Activity[]> => {
  return new Promise((resolve) => {
    const dummyItems = generateDummyActivity(1 + getRandomInt(3)); // Genera 10 items dummy
    setTimeout(() => {
      resolve(dummyItems);
    }, (1 + getRandomInt(3)) * 1000); // Simula un retraso de 2 segundos
  });
};
