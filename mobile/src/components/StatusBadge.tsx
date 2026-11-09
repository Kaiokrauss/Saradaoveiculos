import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CustomerStatus, FinancingStatus, VehicleStatus } from "../data/crm-data";
import { colors } from "../theme/colors";

const customerBadgeTheme: Record<CustomerStatus, { bg: string; text: string; border: string }> = {
  Lead: { bg: colors.infoBg, text: colors.infoText, border: colors.infoBorder },
  "Em Negociação": { bg: colors.warningBg, text: colors.warningText, border: colors.warningBorder },
  "Proposta Enviada": { bg: colors.primaryLight, text: colors.primary, border: "#fed7aa" },
  Vendido: { bg: colors.successBg, text: colors.successText, border: colors.successBorder },
};

const financingBadgeTheme: Record<FinancingStatus, { bg: string; text: string; border: string }> = {
  "Não iniciado": { bg: colors.muted, text: colors.mutedForeground, border: colors.border },
  "Em análise": { bg: colors.warningBg, text: colors.warningText, border: colors.warningBorder },
  Aprovado: { bg: colors.successBg, text: colors.successText, border: colors.successBorder },
  Recusado: { bg: colors.dangerBg, text: colors.dangerText, border: colors.dangerBorder },
};

const vehicleBadgeTheme: Record<VehicleStatus, { bg: string; text: string; border: string }> = {
  Disponível: { bg: colors.successBg, text: colors.successText, border: colors.successBorder },
  Reservado: { bg: colors.warningBg, text: colors.warningText, border: colors.warningBorder },
  Vendido: { bg: colors.muted, text: colors.mutedForeground, border: colors.border },
};

export function StatusBadge({ status }: { status: CustomerStatus }) {
  const theme = customerBadgeTheme[status];
  return (
    <View style={[styles.badge, { backgroundColor: theme.bg, borderColor: theme.border }]}>
      <Text style={[styles.text, { color: theme.text }]}>{status}</Text>
    </View>
  );
}

export function FinancingBadge({ status }: { status: FinancingStatus }) {
  const theme = financingBadgeTheme[status];
  return (
    <View style={[styles.badge, { backgroundColor: theme.bg, borderColor: theme.border }]}>
      <Text style={[styles.text, { color: theme.text }]}>{status}</Text>
    </View>
  );
}

export function VehicleBadge({ status }: { status: VehicleStatus }) {
  const theme = vehicleBadgeTheme[status];
  return (
    <View style={[styles.badge, { backgroundColor: theme.bg, borderColor: theme.border }]}>
      <Text style={[styles.text, { color: theme.text }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 1,
  },
  text: {
    fontSize: 11,
    fontWeight: "700",
  },
});

