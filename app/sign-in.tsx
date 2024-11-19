import React from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSession } from "@/context/ctx";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

interface LoginValues {
  email: string;
  password: string;
}

export default function SignIn() {
  const { signIn } = useSession();
  const LoginSchema = Yup.object().shape({
    //email: Yup.string().email("Invalid email").required("Required"),
    //password: Yup.string().min(4, "Too short!").required("Required"),
    email: Yup.string().required("Este campo es obligatorio"),
    password: Yup.string().required("Este campo es obligatorio"),
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="lock" size={64} color="#4CAF50" />
        <Text style={styles.appTitle}>Smart Social Farm</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
      </View>
      <Formik
        initialValues={{ email: "johndoe@gmail.com", password: "123456" }}
        validationSchema={LoginSchema}
        onSubmit={(values: LoginValues) => {
          // Aquí iría la lógica para autenticar al usuario
          signIn();
          router.replace("/");
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <MaterialIcons
                name="email"
                size={24}
                color="#4CAF50"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>

            {errors.email && touched.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
            <View style={styles.inputContainer}>
              <MaterialIcons
                name="lock"
                size={24}
                color="#4CAF50"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#aaa"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>
            {errors.password && touched.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleSubmit as any}
            >
              <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginTop: 5,
  },
  form: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  inputIcon: {
    marginRight: 5,
  },
  forgotPassword: {
    alignItems: "flex-end",
    marginBottom: 15,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#4CAF50",
  },
  loginButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    elevation: 3,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#777",
  },
  signUpText: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  gradient: {
    flex: 1,
  },
  /*container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },*/
  errorText: {
    fontSize: 12,
    marginBottom: 15,
    color: "red",
  },
});
