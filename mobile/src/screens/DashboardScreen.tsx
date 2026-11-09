import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Customer, metrics } from "../data/crm-data";
import { StatusBadge } from "../components/StatusBadge";
import { colors } from "../theme/colors";

type Props = {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
  onGoToClientes: () => void;
};

const agenda = [
  { time: "10:30", icon: "phone" as const, text: "Ligar para Marcos Vinícius (Toro Volcano)" },
  { time: "13:00", icon: "calendar" as const, text: "Test drive – Corolla XEI com Ricardo" },
  { time: "15:30", icon: "message-circle" as const, text: "Follow-up WhatsApp – Patrícia Nogueira" },
  { time: "17:00", icon: "mail" as const, text: "Reenviar proposta – Diego Ferraz" },
];

export function DashboardScreen({ customers, onSelectCustomer, onGoToClientes }: Props) {
  const recent = customers.slice(0, 5);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Banner de Meta do Mês */}
      <View style={styles.goalBanner}>
        <View style={styles.goalHeader}>
          <Text style={styles.goalTitle}>Meta do mês · Saradão Veículos</Text>
          <Text style={styles.goalPercent}>72%</Text>
        </View>
        <Text style={styles.goalSubtitle}>18 de 25 veículos vendidos em Presidente Prudente, SP</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: "72%" }]} />
        </View>
      </View>

      {/* Cards de Métricas */}
      <View style={styles.metricsGrid}>
        {metrics.map((m) => (
          <View key={m.label} style={styles.metricCard}>
            <View style={styles.metricTop}>
              <Text style={styles.metricLabel} numberOfLines={1}>
                {m.label}
              </Text>
              <View style={styles.metricIconBox}>
                <Feather name={m.icon} size={16} color={colors.primaryDark} />
              </View>
            </View>
            <Text style={styles.metricValue}>{m.value}</Text>
            <Text style={styles.metricDelta}>{m.delta}</Text>
          </View>
        ))}
      </View>

      {/* Últimos Contatos */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Últimos Contatos</Text>
            <Text style={styles.sectionSubtitle}>Interações mais recentes com clientes</Text>
          </View>
          <TouchableOpacity style={styles.seeAllBtn} onPress={onGoToClientes}>
            <Text style={styles.seeAllText}>Ver todos</Text>
            <Feather name="arrow-right" size={14} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {recent.map((c, index) => {
          const initials = c.name
            .split(" ")
            .slice(0, 2)
            .map((n) => n[0])
            .join("");

          return (
            <TouchableOpacity
              key={c.id}
              style={[styles.contactRow, index < recent.length - 1 && styles.contactRowBorder]}
              onPress={() => onSelectCustomer(c)}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{initials}</Text>
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName} numberOfLines={1}>
                  {c.name}
                </Text>
                <Text style={styles.contactNote} numberOfLines={1}>
                  {c.interest} · {c.interactions[0]?.note}
                </Text>
                <View style={styles.contactMetaRow}>
                  <StatusBadge status={c.status} />
                  <Text style={styles.contactTime}>{c.lastContact}</Text>
                </View>
              </View>
              <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Agenda de Hoje */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Agenda de hoje</Text>
            <Text style={styles.sectionSubtitle}>Compromissos da equipe comercial</Text>
          </View>
        </View>
        <View style={styles.agendaList}>
          {agenda.map((item) => (
            <View key={item.time} style={styles.agendaItem}>
              <View style={styles.agendaIconBox}>
                <Feather name={item.icon} size={16} color={colors.primaryDark} />
              </View>
              <View style={styles.agendaTextWrap}>
                <Text style={styles.agendaTime}>{item.time}</Text>
                <Text style={styles.agendaDesc}>{item.text}</Text>
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
  goalBanner: {
    backgroundColor: colors.slate,
    borderRadius: 14,
    padding: 16,
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  goalTitle: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
  },
  goalPercent: {
    color: colors.primary,
    fontWeight: "800",
    fontSize: 14,
  },
  goalSubtitle: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 4,
  },
  progressTrack: {
    height: 6,
    backgroundColor: "#334155",
    borderRadius: 999,
    marginTop: 12,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 999,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  metricCard: {
    width: "48%",
    flexGrow: 1,
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  metricTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 6,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.mutedForeground,
    flex: 1,
  },
  metricIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  metricValue: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.foreground,
    marginTop: 10,
  },
  metricDelta: {
    fontSize: 11,
    color: colors.mutedForeground,
    marginTop: 4,
  },
  sectionCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.foreground,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: colors.mutedForeground,
    marginTop: 2,
  },
  seeAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primary,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 12,
  },
  contactRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.slate,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 13,
  },
  contactInfo: {
    flex: 1,
    gap: 4,
  },
  contactName: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.foreground,
  },
  contactNote: {
    fontSize: 12,
    color: colors.mutedForeground,
  },
  contactMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  contactTime: {
    fontSize: 11,
    color: colors.mutedForeground,
  },
  agendaList: {
    padding: 14,
    gap: 10,
  },
  agendaItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  agendaIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  agendaTextWrap: {
    flex: 1,
  },
  agendaTime: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.foreground,
  },
  agendaDesc: {
    fontSize: 12,
    color: colors.mutedForeground,
    marginTop: 2,
  },
});

