import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { inventory } from "../data/crm-data";
import { VehicleBadge } from "../components/StatusBadge";
import { colors } from "../theme/colors";

export function EstoqueScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={inventory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.topRow}>
              <View style={styles.iconBox}>
                <Feather name="truck" size={20} color={colors.primaryDark} />
              </View>
              <VehicleBadge status={item.status} />
            </View>

            <Text style={styles.model}>{item.model}</Text>
            <Text style={styles.year}>Ano {item.year}</Text>

            <View style={styles.bottomRow}>
              <View style={styles.kmRow}>
                <Feather name="activity" size={14} color={colors.mutedForeground} />
                <Text style={styles.kmText}>{item.km}</Text>
              </View>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
    gap: 12,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  model: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.foreground,
    marginTop: 12,
  },
  year: {
    fontSize: 13,
    color: colors.mutedForeground,
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  kmRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  kmText: {
    fontSize: 13,
    color: colors.mutedForeground,
  },
  price: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.primary,
  },
});

