import { Device } from "@/types";

// Función para generar un listado dummy de items
const generateDummyItems = (count: number): Device[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: (i + 1).toString(),
    title: `Item ${i + 1}`,
  }));
};

export const fetchDevices = async (): Promise<Device[]> => {
  return new Promise((resolve) => {
    const dummyItems = generateDummyItems(20); // Genera 10 items dummy
    setTimeout(() => {
      resolve(dummyItems);
    }, 2000); // Simula un retraso de 2 segundos
  });
};
