import React, { useState } from "react";
import { View, Text, TextInput, Switch, TouchableOpacity, ScrollView, Alert, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

const notificationItems = [
  { key: "lead", label: "Novo lead recebido", desc: "Alerta imediato para a equipe comercial" },
  { key: "testDrive", label: "Test drive agendado", desc: "Lembrete 1 hora antes do horário" },
  { key: "financing", label: "Financiamento aprovado", desc: "Aviso quando o banco retornar" },
  { key: "daily", label: "Resumo diário por e-mail", desc: "Enviado às 19h para os gestores" },
];

export function ConfiguracoesScreen() {
  const [loja, setLoja] = useState("Saradão Veículos");
  const [cidade, setCidade] = useState("Presidente Prudente, SP");
  const [telefone, setTelefone] = useState("(18) 3222-0000");
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    lead: true,
    testDrive: true,
    financing: true,
    daily: true,
  });

  function handleSave() {
    Alert.alert("Configurações salvas", "Os dados da loja foram atualizados com sucesso.");
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Dados da Loja */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Dados da loja</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Nome</Text>
          <TextInput style={styles.input} value={loja} onChangeText={setLoja} />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Cidade</Text>
          <TextInput style={styles.input} value={cidade} onChangeText={setCidade} />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Telefone comercial</Text>
          <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Salvar alterações</Text>
        </TouchableOpacity>
      </View>

      {/* Notificações */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Notificações</Text>

        {notificationItems.map((n) => (
          <View key={n.key} style={styles.switchRow}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={styles.switchLabel}>{n.label}</Text>
              <Text style={styles.switchDesc}>{n.desc}</Text>
            </View>
            <Switch
              value={toggles[n.key]}
              onValueChange={(v) => setToggles((prev) => ({ ...prev, [n.key]: v }))}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#ffffff"
            />
          </View>
        ))}
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
    gap: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.foreground,
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.foreground,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.foreground,
    backgroundColor: colors.background,
  },
  saveBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 4,
  },
  saveBtnText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.foreground,
  },
  switchDesc: {
    fontSize: 12,
    color: colors.mutedForeground,
    marginTop: 2,
  },
});

