import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DetailScreen({ route }) {
  const { metal } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{metal.name} ({metal.symbol})</Text>

      <Text>Current Price: ${metal.current}</Text>
      <Text>High Price achieved: ${metal.high}</Text>
      <Text>Low Price drop: ${metal.low}</Text>
      <Text>Opened At: ${metal.open}</Text>
      <Text>Previous Day price: ${metal.prev}</Text>

      <Text style={styles.timestamp}>
        Last Updated: {new Date().toLocaleString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  timestamp: { marginTop: 20, fontSize: 12, color: "gray" },
});
