import { StyleSheet, Text, View, Image } from "react-native";
const trash = require('../assets/trash.png');
import {Link} from "expo-router";

export function Main() {
  return (
    <View style={styles.container}>
      <Image source={trash} style={styles.logo} />
     
      
      {/* Título de la pantalla */}
      <Text style={styles.title}>ECOPOINT</Text>

      {/* Botones de acción con Link para la navegación */}
      <Link href="/login" style={styles.buttonPrimary}>
        <Text style={styles.buttonTextPrimary}>Ya tengo una cuenta</Text>
      </Link>

      <Link href="/register" style={styles.buttonSecondary}>
        <Text style={styles.buttonTextSecondary}>No tengo una cuenta</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#333333',
  },
  buttonPrimary: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#DFF2C6',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonTextPrimary: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
  },
  buttonSecondary: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#52734D',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonTextSecondary: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
