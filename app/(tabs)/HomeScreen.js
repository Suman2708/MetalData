
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { API_KEY, BASE_URL } from "@env";

const symbolNames = {
  XAU: "Gold",
  XAG: "Silver",
  XPD: "Palladium",
  XPT: "Platinum",
  XCU: "Copper",
  NI: "Nickel",
  ZNC: "Zinc",
  ALU: "Aluminium",
  LEAD: "Lead",
};

export default function HomeScreen({ navigation }) {
  const [metals, setMetals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetals();
  }, []);

  const fetchMetals = async () => {
    try {
      const response = await fetch(BASE_URL, {
        headers: {
          "x-api-key": API_KEY,
        },
      });

      const json = await response.json();
      console.log("API Response:", json.data);

      const rates = json?.data.rates;
      if (rates) {
        const formattedData = Object.keys(rates).map((symbol) => ({
          name: symbolNames[symbol] || symbol,
          symbol,
          ...rates[symbol], // spread so you get current, high, low, open, prev
        }));

        setMetals(formattedData);
      } else {
        console.error("Rates not found in API response:", json);
      }
    } catch (error) {
      console.error("Error fetching metals:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={metals}
        keyExtractor={(item) => item.symbol}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Details", { metal: item })}
          >
            <Text style={styles.title}>{item.name}</Text>
            <Text>Symbol: {item.symbol}</Text>
            <Text>Current Price: ${item.current}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  card: {
    padding: 20,
    marginBottom: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
});
