import { Background } from "@react-navigation/elements";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, TextInput, View } from "react-native";

export default function RootLayout() {
  const [entrada, setEntrada] = useState("");
  const [resultado, setResultado] = useState("");

  function calcular() {    
      const sanitized = entrada.replace(/(^|[^\d.])0+(\d)/g, "$1$2");
      const res = eval(sanitized);
      setResultado(String(res));
    } 

  function adicionarOperador(operador: string) {
    setEntrada(entrada + operador);
  }

  function limpar() {
    setEntrada("");
    setResultado("");
  }

  function adicionarNumero(numero: string) {
    setEntrada(entrada + numero);
  }

  return (
    <>
      <Text style={{ fontSize: 20, alignSelf: "center" }}>cauculadora </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite um número"
        value={entrada}
        onChangeText={setEntrada}
        keyboardType="numeric"
      />
      <Text
        style={{ fontSize: 20, alignSelf: "center", marginVertical: 10 }}
      >
        {resultado}
      </Text>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.botao} onPress={() => adicionarOperador("+")}>
          <Text style={styles.botaoTexto}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => adicionarOperador("-")}>
          <Text style={styles.botaoTexto}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => adicionarOperador("*")}>
          <Text style={styles.botaoTexto}>*</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => adicionarOperador("/")}>
          <Text style={styles.botaoTexto}>/</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => adicionarNumero("0")}>
          <Text style={styles.botaoTexto}>0</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => adicionarNumero("1")}>
          <Text style={styles.botaoTexto}>1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => adicionarNumero("2")}>
          <Text style={styles.botaoTexto}>2</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => adicionarNumero("3")}>
          <Text style={styles.botaoTexto}>3</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => adicionarNumero("4")}>
          <Text style={styles.botaoTexto}>4</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => adicionarNumero("5")}>
          <Text style={styles.botaoTexto}>5</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => adicionarNumero("6")}>
          <Text style={styles.botaoTexto}>6</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => adicionarNumero("7")}>
          <Text style={styles.botaoTexto}>7</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => adicionarNumero("8")}>
          <Text style={styles.botaoTexto}>8</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => adicionarNumero("9")}>
          <Text style={styles.botaoTexto}>9</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={calcular}>
          <Text style={styles.botaoTexto}>=</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={limpar}>
          <Text style={styles.botaoTexto}>C</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#06016d",
    marginHorizontal: 10,
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  botao: {
    backgroundColor: "#06016d",
    width: 70,
    height: 70,
    margin: 6,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 18,
  },  
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});