import { Link, router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from "../firebaseconfig";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        createdAt: new Date(),
      });

      alert("Account created successfully!");
      router.push("/Login"); 
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <Link href="/Login" style={styles.linkText}>
        Already have an account? Login
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#0f172a",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "#fff",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
    color: "#fff",
  },
  button: {
    backgroundColor: "#34C759",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  linkText: {
    color: "#007AFF",
    fontSize: 16,
    textAlign: "center",
  },
});
