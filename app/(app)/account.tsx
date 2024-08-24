import { Theme } from "@/constants/Theme";
import { useSession } from "@/context/ctx";
import { Button, Text, View } from "react-native";

export default function Account() {
  const { signOut } = useSession();
  return (
    <View style={Theme.container}>
      <Text>Account</Text>
      <Button
        title="Sign Out"
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      />
    </View>
  );
}
