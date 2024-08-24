import { Theme } from "@/constants/Theme";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function Index() {
  const { t } = useTranslation();
  return (
    <View style={Theme.container}>
      <Text>{t("welcome")}</Text>
    </View>
  );
}
