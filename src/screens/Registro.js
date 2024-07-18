import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { auth, database } from '../config/firebase';
import Button from '../components/Button';
import InputText from '../components/InputText';
import { useNavigation } from '@react-navigation/native';

export default function Registro() {
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const navigation = useNavigation();

    const Registrar = async () => {
        try {
            if (!correo || !clave || !nombre || !telefono) {
                Alert.alert('Campos Incompletos', 'Rellene todos los campos.');
                return;
            }
            const userCredential = await createUserWithEmailAndPassword(auth, correo, clave);
            const userId = userCredential.user.uid;

            await setDoc(doc(collection(database, 'users'), userId), {
                nombre, telefono, correo
            });

            Alert.alert('Registro exitoso', 'El usuario ha sido registrado correctamente.');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error al registrar:', error);
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Error', 'El correo ya está en uso.');
            } else if (error.code === 'auth/invalid-email') {
                Alert.alert('Error', 'El correo no es válido.');
            } else if (error.code === 'auth/weak-password') {
                Alert.alert('Error', 'La contraseña es demasiado débil.');
            } else {
                Alert.alert('Error', 'Hubo un problema al registrar. Por favor, inténtalo de nuevo más tarde.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrarse</Text>
            <View style={styles.row}>
                <View>
                    <InputText
                        placeHolder={"Ingresa tu nombre aquí"}
                        valor={nombre}
                        setTextChange={setNombre} />
                    <InputText
                        placeHolder={"Ingresa tu teléfono aquí"}
                        contra={false}
                        valor={telefono}
                        setTextChange={setTelefono} />
                    <InputText
                        placeHolder={"Ingresa tu correo electrónico aquí"}
                        valor={correo}
                        setTextChange={setCorreo} />
                    <InputText
                        placeHolder={"Ingresa una clave"}
                        contra={true}
                        valor={clave}
                        setTextChange={setClave} />
                </View>
            </View>
            <View style={styles.column}>
                <View style={styles.button}>
                    <Button color={"Morado"}
                        textoBoton={"Registrarse"}
                        accionBoton={Registrar}
                    />
                </View>
                <View style={styles.button}>
                    <Button color={"Morado"}
                        textoBoton={"Iniciar sesión"}
                        accionBoton={() => navigation.navigate('Login')}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        color: '#000',
        fontWeight: '800',
        fontSize: 30,
        marginBottom: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    column: {
        flex: 2,
        marginHorizontal: 10,
    },
    button: {
        marginTop: 10,
        marginBottom: 10,
    },
});
