import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";

export default function DetailScreen({ route }) {
  const { metal } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      // Example API endpoint (replace with your provider)
      const response = await axios.get(`https://metals-api.com/api/timeseries?access_key=YOUR_API_KEY&base=USD&symbols=${metal.symbol}&start_date=2025-08-25&end_date=2025-08-27`);
      
      setDetails(response.data.rates);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: "center" }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{metal.name} Details</Text>
      <Text>Today Price: ${metal.price.toFixed(2)}</Text>
      <Text>Yesterday Open: (fetch from API)</Text>
      <Text>Yesterday Close: (fetch from API)</Text>
      <Text>Timestamp: {new Date().toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
