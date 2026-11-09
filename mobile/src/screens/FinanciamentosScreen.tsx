import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Customer } from "../data/crm-data";
import { FinancingBadge } from "../components/StatusBadge";
import { colors } from "../theme/colors";

type Props = {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
};

export function FinanciamentosScreen({ customers, onSelectCustomer }: Props) {
  const rows = customers.filter((c) => c.financing !== "Não iniciado");

  return (
    <View style={styles.container}>
      <FlatList
        data={rows}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => onSelectCustomer(item)}>
            <View style={styles.topRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.vehicle}>{item.interest}</Text>
              </View>
              <FinancingBadge status={item.financing} />
            </View>
            <View style={styles.bottomRow}>
              <Text style={styles.budgetLabel}>Valor da Proposta</Text>
              <Text style={styles.budgetValue}>{item.budget}</Text>
            </View>
          </TouchableOpacity>
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
    gap: 12,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.foreground,
  },
  vehicle: {
    fontSize: 13,
    color: colors.mutedForeground,
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
  },
  budgetLabel: {
    fontSize: 12,
    color: colors.mutedForeground,
  },
  budgetValue: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.foreground,
  },
});

