import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importa tus archivos de traducción
import es from "./locales/es.json";

i18n.use(initReactI18next).init({
  resources: {
    es: {
      translation: es,
    },
  },
  lng: "es", // Idioma por defecto
  fallbackLng: "es", // Idioma de respaldo
  interpolation: {
    escapeValue: false, // react ya maneja el escape de valores
  },
});

export default i18n;
