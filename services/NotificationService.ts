import { Activity } from "@/types";
import moment from "moment";
import "moment/locale/es"; // Importa el idioma español

const capitalizeFirstLetter = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * (max + 1)); // Incluye el valor máximo X
}

const generateActivity = (i: number): Activity => {
  const activity =
    "Se recomienda regar durante la próxima hora, en base a la información recopilada de su barómetro";

  const pastDate = moment().subtract(i * (12 + getRandomInt(6)), "hours");

  // Formatear la fecha como "hace un rato"
  const timeAgo = pastDate.fromNow();

  return {
    id: (i + 1).toString(),
    activity: activity,
    date: capitalizeFirstLetter(timeAgo),
  };
};

const generateDummyActivity = (count: number): Activity[] => {
  return Array.from({ length: count }, (_, i) => generateActivity(i));
};

export const fetchNotifications = async (): Promise<Activity[]> => {
  return new Promise((resolve) => {
    const dummyItems = generateDummyActivity(1 + getRandomInt(10)); // Genera 4 items dummy
    setTimeout(() => {
      resolve(dummyItems);
    }, (1 + getRandomInt(3)) * 1000); // Simula un retraso de 2 segundos
  });
};
