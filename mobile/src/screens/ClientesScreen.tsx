import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
  Linking,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Customer, CustomerStatus } from "../data/crm-data";
import { StatusBadge } from "../components/StatusBadge";
import { colors } from "../theme/colors";

type Props = {
  customers: Customer[];
  onAddCustomer: (customer: Customer) => void;
  onSelectCustomer: (customer: Customer) => void;
};

const filters: (CustomerStatus | "Todos")[] = [
  "Todos",
  "Lead",
  "Em Negociação",
  "Proposta Enviada",
  "Vendido",
];

export function ClientesScreen({ customers, onAddCustomer, onSelectCustomer }: Props) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todos");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "",
    notes: "",
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return customers.filter(
      (c) =>
        (filter === "Todos" || c.status === filter) &&
        (!q || c.name.toLowerCase().includes(q) || c.interest.toLowerCase().includes(q)),
    );
  }, [customers, query, filter]);

  function handleSave() {
    if (!form.name.trim() || !form.phone.trim()) {
      Alert.alert("Campos obrigatórios", "Informe pelo menos o nome e o telefone do cliente.");
      return;
    }

    const novo: Customer = {
      id: String(Date.now()),
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || "nao-informado@email.com",
      city: "Presidente Prudente, SP",
      interest: form.interest.trim() || "A definir",
      status: "Lead",
      financing: "Não iniciado",
      budget: "—",
      lastContact: "Agora",
      notes: form.notes.trim() || "Cliente cadastrado pelo aplicativo mobile.",
      interactions: [
        {
          id: "n1",
          kind: "WhatsApp",
          date: "Agora",
          note: form.notes.trim() || "Cliente cadastrado no CRM Mobile.",
        },
      ],
    };

    onAddCustomer(novo);
    setForm({ name: "", phone: "", email: "", interest: "", notes: "" });
    setModalOpen(false);
  }

  function openWhatsApp(phone: string) {
    const digits = phone.replace(/\D/g, "");
    Linking.openURL(`https://wa.me/55${digits}`);
  }

  return (
    <View style={styles.container}>
      {/* Barra de Busca + Botão Novo Cliente */}
      <View style={styles.topBar}>
        <View style={styles.searchBox}>
          <Feather name="search" size={16} color={colors.mutedForeground} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar nome ou veículo..."
            placeholderTextColor={colors.mutedForeground}
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={() => setModalOpen(true)}>
          <Feather name="plus" size={18} color="#ffffff" />
          <Text style={styles.addBtnText}>Novo</Text>
        </TouchableOpacity>
      </View>

      {/* Filtros horizontais */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersRow}>
          {filters.map((f) => {
            const active = filter === f;
            return (
              <TouchableOpacity
                key={f}
                onPress={() => setFilter(f)}
                style={[styles.filterChip, active && styles.filterChipActive]}
              >
                <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>{f}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Lista de Clientes com FlatList (componente nativo essencial em React Native) */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>Nenhum cliente encontrado para esta busca.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.customerCard} onPress={() => onSelectCustomer(item)}>
            <View style={styles.cardHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.customerName}>{item.name}</Text>
                <Text style={styles.customerCity}>{item.city}</Text>
              </View>
              <StatusBadge status={item.status} />
            </View>

            <View style={styles.cardBody}>
              <View style={styles.infoRow}>
                <Feather name="truck" size={14} color={colors.mutedForeground} />
                <Text style={styles.infoText}>{item.interest}</Text>
              </View>
              <View style={styles.infoRow}>
                <Feather name="phone" size={14} color={colors.mutedForeground} />
                <Text style={styles.infoText}>{item.phone}</Text>
              </View>
            </View>

            <View style={styles.cardActions}>
              <TouchableOpacity style={styles.actionBtnOutline} onPress={() => openWhatsApp(item.phone)}>
                <Feather name="message-circle" size={15} color={colors.foreground} />
                <Text style={styles.actionBtnOutlineText}>WhatsApp</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtnPrimary} onPress={() => onSelectCustomer(item)}>
                <Feather name="eye" size={15} color={colors.primary} />
                <Text style={styles.actionBtnPrimaryText}>Ver Ficha</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Modal para Adicionar Novo Cliente */}
      <Modal visible={modalOpen} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Adicionar Novo Cliente</Text>
              <TouchableOpacity onPress={() => setModalOpen(false)}>
                <Feather name="x" size={20} color={colors.mutedForeground} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalForm}>
              <Text style={styles.label}>Nome *</Text>
              <TextInput
                style={styles.input}
                value={form.name}
                onChangeText={(v) => setForm({ ...form, name: v })}
                placeholder="Ex.: João Batista"
              />

              <Text style={styles.label}>Telefone / WhatsApp *</Text>
              <TextInput
                style={styles.input}
                value={form.phone}
                onChangeText={(v) => setForm({ ...form, phone: v })}
                placeholder="(18) 99999-0000"
                keyboardType="phone-pad"
              />

              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                value={form.email}
                onChangeText={(v) => setForm({ ...form, email: v })}
                placeholder="cliente@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={styles.label}>Veículo de Interesse</Text>
              <TextInput
                style={styles.input}
                value={form.interest}
                onChangeText={(v) => setForm({ ...form, interest: v })}
                placeholder="Ex.: Toyota Corolla 2022"
              />

              <Text style={styles.label}>Observações</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={form.notes}
                onChangeText={(v) => setForm({ ...form, notes: v })}
                placeholder="Preferências, forma de pagamento..."
                multiline
              />
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalOpen(false)}>
                <Text style={styles.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveBtnText}>Salvar cliente</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: "row",
    padding: 16,
    paddingBottom: 10,
    gap: 10,
    backgroundColor: colors.card,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: colors.foreground,
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    borderRadius: 10,
    gap: 6,
  },
  addBtnText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 13,
  },
  filtersContainer: {
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filtersRow: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.mutedForeground,
  },
  filterChipTextActive: {
    color: "#ffffff",
  },
  listContent: {
    padding: 16,
    gap: 12,
    paddingBottom: 32,
  },
  customerCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  customerName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.foreground,
  },
  customerCity: {
    fontSize: 12,
    color: colors.mutedForeground,
    marginTop: 2,
  },
  cardBody: {
    gap: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoText: {
    fontSize: 13,
    color: colors.foreground,
  },
  cardActions: {
    flexDirection: "row",
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  actionBtnOutline: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionBtnOutlineText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.foreground,
  },
  actionBtnPrimary: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
  },
  actionBtnPrimaryText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primary,
  },
  emptyBox: {
    padding: 32,
    alignItems: "center",
  },
  emptyText: {
    color: colors.mutedForeground,
    fontSize: 14,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "88%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.foreground,
  },
  modalForm: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.foreground,
    marginBottom: 6,
    marginTop: 10,
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
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  modalFooter: {
    flexDirection: "row",
    gap: 10,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
  },
  cancelBtnText: {
    fontWeight: "600",
    color: colors.foreground,
  },
  saveBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  saveBtnText: {
    fontWeight: "700",
    color: "#ffffff",
  },
});

