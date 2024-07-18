import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  Image,
  useColorScheme,
} from "react-native";

import { AuthContext } from "@/contexts/AuthContext";

export default function LoginScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    const token = "dummy-token";
    login(token);
  };

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/icon.png")} style={styles.logo} />

      <TextInput
        placeholder="Email"
        placeholderTextColor={colorScheme === "dark" ? "#fff" : "#000"}
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        placeholderTextColor={colorScheme === "dark" ? "#fff" : "#000"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.text}>Entrar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 40,
  },
  input: {
    height: 50,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#005131",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
});
