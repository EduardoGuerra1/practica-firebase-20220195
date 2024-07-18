import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Button({ textoBoton, accionBoton, color }) {
    
    const Colores = {
        Morado: '#5F0A87',
    };

   
    const buttonColor = Colores[color] || color;

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor, borderColor: buttonColor }]} onPress={accionBoton}>
            <Text style={styles.buttonText}>{textoBoton}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        width: 185,
        borderRadius: 20,
        padding: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: "#FFF",
        fontWeight: '800',
        fontSize: 15,
    }
});
