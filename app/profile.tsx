import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../firebaseconfig";


type UserData = {
  name: string;
  email: string;
};

export default function Profile() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({ name: "", email: "" });


   useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return; // No user logged in

      const docRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(docRef);

      if (userSnap.exists()) {
        setUserData({
          name: userSnap.data().name || "",
          email: userSnap.data().email || currentUser.email || "",
        });
      } else {
        setUserData({ name: "", email: currentUser.email || "" });
      }
    };

    fetchUserData();
  }, []);
  
    const handleLogout = async () => {
      try {
        await signOut(auth);
        alert("Logged out successfully!");
        router.push("/Login");
      } catch (error: any) {
        console.log(error);
        alert(error.message);
      }
    };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.pravatar.cc/150?img=12" }}
        style={styles.avatar}
      />
      {/*<Text style={styles.name}>{userName}</Text>*/}
      <Text style={styles.name}>{userData.name}</Text>
      <Text style={styles.email}>{userData.email}</Text>

      <View style={styles.infoBox}>
        <Ionicons name="film" size={20} color="#38bdf8" />
        <Text style={styles.infoText}>Total Watched: 42</Text>
      </View>
      <View style={styles.infoBox}>
        <Ionicons name="heart" size={20} color="#ef4444" />
        <Text style={styles.infoText}>Favorites: 10</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/Home")}>
        <Text style={styles.buttonText}>Go Back Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    paddingTop: 80,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  email: {
    color: "#94a3b8",
    marginBottom: 30,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    padding: 12,
    borderRadius: 12,
    width: "80%",
    marginBottom: 10,
  },
  infoText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#1e293b",
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
