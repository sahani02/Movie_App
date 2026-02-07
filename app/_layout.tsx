import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter, useSegments } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Layout() {
  const router = useRouter();
  const segments = useSegments() as string[]; // Force as string[] for TS
  const current = segments[0] || "";

  // Pages where footer should be hidden
  const hiddenPages = ["login", "register"];
  const hideFooter = hiddenPages.includes(current.toLowerCase()) || segments.length === 0;

  return (
    <View style={{ flex: 1, backgroundColor: "#0f172a" }}>
      {/* Stack renders the current page */}
      <Stack screenOptions={{ headerShown: false }} />

      {/* Footer */}
      {!hideFooter && (
        <>
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => router.push("/Home")}>
              <View style={styles.footerItem}>
                <Ionicons name="home" size={22} color="#fff" />
                <Text style={styles.footerText}>Home</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/favorites")}>
              <View style={styles.footerItem}>
                <Ionicons name="heart" size={22} color="#fff" />
                <Text style={styles.footerText}>Favorites</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/profile")}>
              <View style={styles.footerItem}>
                <Ionicons name="person" size={22} color="#fff" />
                <Text style={styles.footerText}>Profile</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerText1}>Made By: Sahani</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: "#1e293b",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#334155",
  },
  footerItem: {
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 3,
  },
  footerText1: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 4,
  },
});
