# Saradão Veículos CRM — Versão Mobile (React Native + Expo)

Versão **Multiplataforma (React Native + Expo)** do sistema CRM da **Saradão Veículos**, desenvolvida com componentes nativos (`View`, `Text`, `FlatList`, `ScrollView`, `TouchableOpacity`, `TextInput`, `Modal`, `Switch`, `StyleSheet`).

## Como rodar a versão React Native (Expo)

No terminal, entre na pasta `mobile`:

```powershell
cd mobile
npm install
npx expo start
```

Depois de iniciar:
- **No Celular (Expo Go):** Escaneie o QR Code que aparece no terminal usando o aplicativo **Expo Go** (Android ou iOS).
- **No Emulador Android:** Pressione `a` no terminal.
- **No Navegador:** Pressione `w` no terminal.

## Estrutura do Projeto (`mobile/`)

- `App.tsx`: Navegação principal (Bottom Tabs + Header Nativo + controle de telas).
- `src/data/crm-data.ts`: Base de dados de clientes, estoque de veículos e métricas.
- `src/components/StatusBadge.tsx`: Badges de status nativos para clientes, financiamentos e veículos.
- `src/screens/DashboardScreen.tsx`: Métricas, meta do mês, últimos contatos e agenda comercial.
- `src/screens/ClientesScreen.tsx`: Busca, filtro por status, `FlatList` de clientes e `Modal` de cadastro.
- `src/screens/ClienteDetalheScreen.tsx`: Ficha completa do cliente, histórico de interações e botões de WhatsApp/Ligação (`Linking`).
- `src/screens/EstoqueScreen.tsx`: Catálogo de veículos disponíveis, reservados e vendidos.
- `src/screens/FinanciamentosScreen.tsx`: Acompanhamento de propostas de financiamento.
- `src/screens/ConfiguracoesScreen.tsx`: Formulário de dados da loja e chaves (`Switch`) de notificações.

