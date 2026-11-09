import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Customer } from "../data/crm-data";
import { FinancingBadge, StatusBadge } from "../components/StatusBadge";
import { colors } from "../theme/colors";

type Props = {
  customer: Customer;
  onBack: () => void;
};

export function ClienteDetalheScreen({ customer, onBack }: Props) {
  const initials = customer.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  function openWhatsApp() {
    const digits = customer.phone.replace(/\D/g, "");
    Linking.openURL(`https://wa.me/55${digits}`);
  }

  function makeCall() {
    const digits = customer.phone.replace(/\D/g, "");
    Linking.openURL(`tel:${digits}`);
  }

  const infoRows = [
    { icon: "phone" as const, value: customer.phone },
    { icon: "mail" as const, value: customer.email },
    { icon: "map-pin" as const, value: customer.city },
    { icon: "truck" as const, value: customer.interest },
    { icon: "credit-card" as const, value: `Orçamento: ${customer.budget}` },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Feather name="arrow-left" size={16} color={colors.mutedForeground} />
        <Text style={styles.backText}>Voltar para clientes</Text>
      </TouchableOpacity>

      {/* Card Principal do Cliente */}
      <View style={styles.card}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={{ flex: 1, gap: 6 }}>
            <Text style={styles.name}>{customer.name}</Text>
            <StatusBadge status={customer.status} />
          </View>
        </View>

        <View style={styles.infoList}>
          {infoRows.map((row, idx) => (
            <View key={idx} style={styles.infoRow}>
              <View style={styles.iconBox}>
                <Feather name={row.icon} size={15} color={colors.primaryDark} />
              </View>
              <Text style={styles.infoText}>{row.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.financingBox}>
          <Text style={styles.financingLabel}>STATUS DO FINANCIAMENTO</Text>
          <View style={{ marginTop: 8 }}>
            <FinancingBadge status={customer.financing} />
          </View>
          <Text style={styles.notesText}>{customer.notes}</Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.primaryBtn} onPress={openWhatsApp}>
            <Feather name="message-circle" size={16} color="#ffffff" />
            <Text style={styles.primaryBtnText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlineBtn} onPress={makeCall}>
            <Feather name="phone" size={16} color={colors.foreground} />
            <Text style={styles.outlineBtnText}>Ligar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Histórico de Interações */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Histórico de Interações</Text>
        <Text style={styles.sectionSubtitle}>Ligações, mensagens e visitas registradas</Text>

        <View style={styles.timeline}>
          {customer.interactions.map((it, index) => (
            <View key={it.id} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View style={styles.timelineDot} />
                {index < customer.interactions.length - 1 && <View style={styles.timelineLine} />}
              </View>
              <View style={styles.timelineBody}>
                <View style={styles.timelineTopRow}>
                  <Text style={styles.timelineKind}>{it.kind}</Text>
                  <Text style={styles.timelineDate}>{it.date}</Text>
                </View>
                <Text style={styles.timelineNote}>{it.note}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  backText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.mutedForeground,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 16,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.slate,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "800",
  },
  name: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.foreground,
  },
  infoList: {
    gap: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    fontSize: 13,
    color: colors.mutedForeground,
    flex: 1,
  },
  financingBox: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 14,
    backgroundColor: colors.background,
  },
  financingLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.mutedForeground,
    letterSpacing: 0.5,
  },
  notesText: {
    fontSize: 13,
    color: colors.mutedForeground,
    marginTop: 10,
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
  },
  primaryBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
  },
  primaryBtnText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
  },
  outlineBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 12,
    borderRadius: 10,
  },
  outlineBtnText: {
    color: colors.foreground,
    fontWeight: "700",
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.foreground,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: colors.mutedForeground,
    marginTop: -10,
  },
  timeline: {
    marginTop: 4,
  },
  timelineItem: {
    flexDirection: "row",
    gap: 12,
  },
  timelineLeft: {
    alignItems: "center",
    width: 16,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
    marginTop: 3,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  timelineBody: {
    flex: 1,
    paddingBottom: 18,
  },
  timelineTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  timelineKind: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.foreground,
  },
  timelineDate: {
    fontSize: 12,
    color: colors.mutedForeground,
  },
  timelineNote: {
    fontSize: 13,
    color: colors.mutedForeground,
    marginTop: 4,
  },
});

