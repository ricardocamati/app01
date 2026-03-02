import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, TextInput, View, ScrollView } from "react-native";

export default function RootLayout() {
  const [entrada, setEntrada] = useState("");
  const [resultado, setResultado] = useState("");
  const [historico, setHistorico] = useState<string[]>([]);

  function calcular() {
    try {
      const linpou = entrada.replace(/(^|[^\d.])0+(\d)/g, "$1$2");
      const res = eval(linpou);
      setResultado(String(res));
      // Adiciona ao histórico
      if (entrada) {
        setHistorico([...historico, `${entrada} = ${res}`]);
      }
    } catch (erro) {
      setResultado("Erro");
    }
  }

  function adicionarOperador(operador: string) {
    setEntrada(entrada + operador);
  }

  function limpar() {
    setEntrada("");
    setResultado("");
  }

  function limparHistorico() {
    setHistorico([]);
  }

  function adicionarNumero(numero: string) {
    setEntrada(entrada + numero);
  }

  function adicionarDecimal() {
    const ultimoOperador = entrada.match(/[+\-*/]/g);
    const parteAtual = ultimoOperador ? entrada.split(/[+\-*/]/).pop() : entrada;
    if (!parteAtual?.includes(".")) {
      setEntrada(entrada + ".");
    }
  }



  return (
    <>
    <View style={styles.container}>
      <Text style={{ fontSize: 20, alignSelf: "center", color: "#000000" }}>cauculadora </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite um número"
        value={entrada}
        onChangeText={setEntrada}
        keyboardType="numeric"
      />
      <Text
        style={styles.saida}
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

        <TouchableOpacity style={styles.botao} onPress={adicionarDecimal}>
          <Text style={styles.botaoTexto}>.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={calcular}>
          <Text style={styles.botaoTexto}>=</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={limpar}>
          <Text style={styles.botaoTexto}>C</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 16, alignSelf: "center", marginTop: 15, fontWeight: "bold" }}>Histórico</Text>
      <ScrollView style={styles.historicoContainer}>
        {historico.length === 0 ? (
          <Text style={{ textAlign: "center", color: "#999", marginTop: 10 }}>Nenhuma operação ainda</Text>
        ) : (
          historico.map((item, index) => (
            <Text key={index} style={styles.historicoItem}>{item}</Text>
          ))
        )}
      </ScrollView>

      <TouchableOpacity style={[styles.botao, styles.botaoLimpar]} onPress={limparHistorico}>
        <Text style={styles.botaoTexto}>Limpar Histórico</Text>
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
    color: "#000000",
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
    color: "#efeded",
    fontSize: 18,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff", 
    paddingTop: 20,
  },
  saida: {
    fontSize: 20, alignSelf: "center", marginVertical: 10, color: "#fdfdfd",
  },
  historicoContainer: {
    maxHeight: 200,
    marginVertical: 10,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: "#06016d",
    borderRadius: 8,
    padding: 10,
  },
  historicoItem: {
    fontSize: 14,
    color: "#333",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  botaoLimpar: {
    width: "auto",
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginBottom: 20,
  },
});