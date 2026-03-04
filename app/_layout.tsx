import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, TextInput, View, ScrollView } from "react-native";

export default function RootLayout() {
  const [entrada, setEntrada] = useState("");
  const [resultado, setResultado] = useState("");
  const [historico, setHistorico] = useState<string[]>([]);
  const [mostrarHistorico, setMostrarHistorico] = useState(false);

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

  function calcularPercentual() {
    if (resultado) {
      const percentual = (parseFloat(resultado) / 100).toString();
      setResultado(percentual);
      setEntrada(percentual);
    }
  }

  function calcularInverso() {
    if (resultado && parseFloat(resultado) !== 0) {
      const inverso = (1 / parseFloat(resultado)).toString();
      setResultado(inverso);
      setEntrada(inverso);
    } else {
      setResultado("Erro: Divisão por zero");
    }
  }

  function adicionarParentese() {
    const abertos = (entrada.match(/\(/g) || []).length;
    const fechados = (entrada.match(/\)/g) || []).length;
    
    
    if (fechados >= abertos) {
      setEntrada(entrada + "(");
    } else {
      
      setEntrada(entrada + ")");
    }
  }



  return (
    <>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMostrarHistorico(!mostrarHistorico)} style={styles.menuBotao}>
          <Text style={styles.menuIcone}>{"\u2630"}</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, color: "#000000" }}>Calculadora</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.calculatorBox}>
        <TextInput
          style={styles.input}
          placeholder="0"
          placeholderTextColor="#aaa"
          value={entrada}
          onChangeText={setEntrada}
          keyboardType="numeric"
        />
        <Text style={styles.saida}>
          {resultado ? `= ${resultado}` : ""}
        </Text>

        <View style={styles.grid}>
        <TouchableOpacity style={[styles.botao, styles.botaoEspecial]} onPress={adicionarParentese}>
          <Text style={styles.botaoTexto}>(  )</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, styles.botaoOperador]} onPress={() => adicionarOperador("+")}>
          <Text style={styles.botaoTexto}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, styles.botaoOperador]} onPress={() => adicionarOperador("-")}>
          <Text style={styles.botaoTexto}>−</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, styles.botaoOperador]} onPress={() => adicionarOperador("*")}>
          <Text style={styles.botaoTexto}>×</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, styles.botaoOperador]} onPress={() => adicionarOperador("/")}>
          <Text style={styles.botaoTexto}>÷</Text>
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

        <TouchableOpacity style={[styles.botao, styles.botaoEspecial]} onPress={adicionarDecimal}>
          <Text style={styles.botaoTexto}>.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, styles.botaoEspecial]} onPress={calcularPercentual}>
          <Text style={styles.botaoTexto}>%</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, styles.botaoEspecial]} onPress={calcularInverso}>
          <Text style={styles.botaoTexto}>1/x</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, styles.botaoIgual]} onPress={calcular}>
          <Text style={styles.botaoTexto}>=</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, styles.botaoLimparC]} onPress={limpar}>
          <Text style={styles.botaoTexto}>C</Text>
        </TouchableOpacity>
      </View>
      </View>

      {mostrarHistorico && (
        <>
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
        </>
      )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f5",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  menuBotao: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  menuIcone: {
    fontSize: 26,
    color: "#06016d",
  },
  calculatorBox: {
    borderWidth: 2,
    borderColor: "#06016d",
    borderRadius: 12,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 8,
    backgroundColor: "#ffffff",
  },
  input: {
    height: 55,
    borderWidth: 2,
    borderColor: "#06016d",
    backgroundColor: "#fff",
    color: "#111",
    marginHorizontal: 0,
    marginVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 20,
  },
  saida: {
    fontSize: 28,
    fontWeight: "bold",
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 10,
    color: "#06016d",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    marginTop: 5,
  },
  botao: {
    backgroundColor: "#ffffff",
    width: 72,
    height: 72,
    margin: 5,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  botaoTexto: {
    color: "#111",
    fontSize: 20,
    fontWeight: "600",
  },
  botaoOperador: {
    backgroundColor: "#090297",
    
  },
  botaoEspecial: {
    backgroundColor: "#d0cfe8",
  },
  botaoIgual: {
    backgroundColor: "#4caf50",
  },
  botaoLimparC: {
    backgroundColor: "#e53935",
  },
  historicoContainer: {
    maxHeight: 200,
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#06016d",
    borderRadius: 10,
    padding: 10,
  },
  historicoItem: {
    fontSize: 14,
    color: "#333",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  botaoLimpar: {
    width: "auto",
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#e53935",
    borderRadius: 8,
    height: 45,
  },
});