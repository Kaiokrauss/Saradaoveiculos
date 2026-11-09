import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StatusBar, StyleSheet, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Customer, initialCustomers, inventory } from "./src/data/crm-data";
import { DashboardScreen } from "./src/screens/DashboardScreen";
import { ClientesScreen } from "./src/screens/ClientesScreen";
import { ClienteDetalheScreen } from "./src/screens/ClienteDetalheScreen";
import { EstoqueScreen } from "./src/screens/EstoqueScreen";
import { FinanciamentosScreen } from "./src/screens/FinanciamentosScreen";
import { ConfiguracoesScreen } from "./src/screens/ConfiguracoesScreen";
import { colors } from "./src/theme/colors";

type TabKey = "dashboard" | "clientes" | "estoque" | "financiamentos" | "configuracoes";

const tabs: { key: TabKey; label: string; icon: keyof typeof Feather.glyphMap }[] = [
  { key: "dashboard", label: "Início", icon: "grid" },
  { key: "clientes", label: "Clientes", icon: "users" },
  { key: "estoque", label: "Estoque", icon: "truck" },
  { key: "financiamentos", label: "Crédito", icon: "dollar-sign" },
  { key: "configuracoes", label: "Ajustes", icon: "settings" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("dashboard");
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  function handleSelectCustomer(customer: Customer) {
    setSelectedCustomer(customer);
  }

  function handleAddCustomer(newCustomer: Customer) {
    setCustomers((prev) => [newCustomer, ...prev]);
  }

  function getHeaderSubtitle() {
    if (selectedCustomer) return `Interesse: ${selectedCustomer.interest}`;
    switch (activeTab) {
      case "dashboard":
        return "Presidente Prudente, SP · Visão Geral";
      case "clientes":
        return `${customers.length} clientes cadastrados`;
      case "estoque":
        return `${inventory.length} veículos no pátio`;
      case "financiamentos":
        return `${customers.filter((c) => c.financing !== "Não iniciado").length} propostas em andamento`;
      case "configuracoes":
        return "Dados da loja e preferências";
    }
  }

  function getHeaderTitle() {
    if (selectedCustomer) return selectedCustomer.name;
    switch (activeTab) {
      case "dashboard":
        return "Saradão Veículos";
      case "clientes":
        return "Gestão de Clientes";
      case "estoque":
        return "Estoque de Veículos";
      case "financiamentos":
        return "Financiamentos";
      case "configuracoes":
        return "Configurações";
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.slate} />

      {/* Header Superior Nativo */}
      <View style={styles.header}>
        <View style={styles.logoBadge}>
          <Feather name="truck" size={18} color="#ffffff" />
        </View>
        <View style={styles.headerTextWrap}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {getHeaderTitle()}
          </Text>
          <Text style={styles.headerSubtitle} numberOfLines={1}>
            {getHeaderSubtitle()}
          </Text>
        </View>
        <View style={styles.userAvatar}>
          <Text style={styles.userAvatarText}>SV</Text>
        </View>
      </View>

      {/* Conteúdo Principal */}
      <View style={styles.body}>
        {selectedCustomer ? (
          <ClienteDetalheScreen customer={selectedCustomer} onBack={() => setSelectedCustomer(null)} />
        ) : (
          <>
            {activeTab === "dashboard" && (
              <DashboardScreen
                customers={customers}
                onSelectCustomer={handleSelectCustomer}
                onGoToClientes={() => setActiveTab("clientes")}
              />
            )}
            {activeTab === "clientes" && (
              <ClientesScreen
                customers={customers}
                onAddCustomer={handleAddCustomer}
                onSelectCustomer={handleSelectCustomer}
              />
            )}
            {activeTab === "estoque" && <EstoqueScreen />}
            {activeTab === "financiamentos" && (
              <FinanciamentosScreen customers={customers} onSelectCustomer={handleSelectCustomer} />
            )}
            {activeTab === "configuracoes" && <ConfiguracoesScreen />}
          </>
        )}
      </View>

      {/* Barra de Navegação Inferior (Bottom Tabs) */}
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = !selectedCustomer && activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              onPress={() => {
                setSelectedCustomer(null);
                setActiveTab(tab.key);
              }}
            >
              <Feather
                name={tab.icon}
                size={20}
                color={isActive ? colors.primary : colors.mutedForeground}
              />
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.slate,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.slate,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTextWrap: {
    flex: 1,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "800",
  },
  headerSubtitle: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 1,
  },
  userAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
  },
  userAvatarText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
  },
  body: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 8,
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.mutedForeground,
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: "700",
  },
});

