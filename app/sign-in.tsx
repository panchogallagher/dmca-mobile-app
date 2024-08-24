import React from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSession } from "@/ctx";
import { router } from "expo-router";

interface LoginValues {
  email: string;
  password: string;
}

export default function SignIn() {
  const { signIn } = useSession();
  const LoginSchema = Yup.object().shape({
    //email: Yup.string().email("Invalid email").required("Required"),
    //password: Yup.string().min(4, "Too short!").required("Required"),
    email: Yup.string().required("Required"),
    password: Yup.string().min(4, "Too short!").required("Required"),
  });

  return (
    <View style={styles.container}>
      <h1>Smart Social Farm</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
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
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {errors.email && touched.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {errors.password && touched.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
            <Button onPress={handleSubmit as any} title="Login" />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  },
  errorText: {
    fontSize: 12,
    color: "red",
  },
});
