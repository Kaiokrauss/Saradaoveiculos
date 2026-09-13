export type CustomerStatus = "Lead" | "Em Negociação" | "Proposta Enviada" | "Vendido";
export type FinancingStatus = "Não iniciado" | "Em análise" | "Aprovado" | "Recusado";

export type Interaction = {
  id: string;
  kind: "Ligação" | "WhatsApp" | "E-mail" | "Visita" | "Test Drive";
  date: string;
  note: string;
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  interest: string;
  status: CustomerStatus;
  financing: FinancingStatus;
  budget: string;
  lastContact: string;
  notes: string;
  interactions: Interaction[];
};

export const customers: Customer[] = [
  {
    id: "1",
    name: "Ricardo Almeida",
    phone: "(18) 99812-4477",
    email: "ricardo.almeida@email.com",
    city: "Presidente Prudente, SP",
    interest: "Toyota Corolla 2022",
    status: "Em Negociação",
    financing: "Em análise",
    budget: "R$ 135.000",
    lastContact: "Hoje, 09:20",
    notes: "Quer avaliar o Onix 2019 dele na troca.",
    interactions: [
      { id: "a1", kind: "WhatsApp", date: "Hoje, 09:20", note: "Enviada simulação de financiamento em 48x." },
      { id: "a2", kind: "Test Drive", date: "Ontem, 16:00", note: "Test drive do Corolla XEI, gostou do acabamento." },
      { id: "a3", kind: "Ligação", date: "10/09, 11:05", note: "Primeiro contato pelo anúncio do site." },
    ],
  },
  {
    id: "2",
    name: "Fernanda Souza",
    phone: "(18) 99730-2211",
    email: "fer.souza@email.com",
    city: "Álvares Machado, SP",
    interest: "Jeep Compass 2021",
    status: "Proposta Enviada",
    financing: "Aprovado",
    budget: "R$ 158.000",
    lastContact: "Hoje, 08:40",
    notes: "Aprovada no banco, aguardando definição de entrada.",
    interactions: [
      { id: "b1", kind: "E-mail", date: "Hoje, 08:40", note: "Proposta formal enviada com entrada de R$ 40 mil." },
      { id: "b2", kind: "Visita", date: "09/09, 14:30", note: "Visitou a loja com o marido." },
    ],
  },
  {
    id: "3",
    name: "Marcos Vinícius Lima",
    phone: "(18) 99145-8890",
    email: "marcos.lima@email.com",
    city: "Presidente Prudente, SP",
    interest: "Fiat Toro Volcano 2023",
    status: "Lead",
    financing: "Não iniciado",
    budget: "R$ 175.000",
    lastContact: "Ontem, 18:10",
    notes: "Chegou por indicação, prefere contato à noite.",
    interactions: [
      { id: "c1", kind: "WhatsApp", date: "Ontem, 18:10", note: "Pediu fotos do interior e histórico de revisões." },
    ],
  },
  {
    id: "4",
    name: "Juliana Prado",
    phone: "(18) 99604-7712",
    email: "juliana.prado@email.com",
    city: "Martinópolis, SP",
    interest: "Honda HR-V EXL 2022",
    status: "Vendido",
    financing: "Aprovado",
    budget: "R$ 149.900",
    lastContact: "08/09, 15:00",
    notes: "Entrega realizada, indicar para pós-venda em 30 dias.",
    interactions: [
      { id: "d1", kind: "Visita", date: "08/09, 15:00", note: "Assinatura do contrato e entrega do veículo." },
      { id: "d2", kind: "Ligação", date: "05/09, 10:15", note: "Confirmação de documentação do financiamento." },
    ],
  },
  {
    id: "5",
    name: "Alexandre Bueno",
    phone: "(18) 99388-1204",
    email: "alexandre.bueno@email.com",
    city: "Regente Feijó, SP",
    interest: "VW T-Cross Highline 2023",
    status: "Em Negociação",
    financing: "Em análise",
    budget: "R$ 142.000",
    lastContact: "Ontem, 11:45",
    notes: "Negociando desconto de R$ 4 mil à vista.",
    interactions: [
      { id: "e1", kind: "Ligação", date: "Ontem, 11:45", note: "Pediu prazo até sexta para decidir." },
    ],
  },
  {
    id: "6",
    name: "Patrícia Nogueira",
    phone: "(18) 99271-6633",
    email: "patricia.n@email.com",
    city: "Presidente Prudente, SP",
    interest: "Hyundai Creta 2021",
    status: "Lead",
    financing: "Não iniciado",
    budget: "R$ 118.000",
    lastContact: "07/09, 09:30",
    notes: "Primeiro carro da filha, foco em segurança.",
    interactions: [
      { id: "f1", kind: "WhatsApp", date: "07/09, 09:30", note: "Perguntou sobre garantia estendida." },
    ],
  },
  {
    id: "7",
    name: "Diego Ferraz",
    phone: "(18) 99012-4501",
    email: "diego.ferraz@email.com",
    city: "Pirapozinho, SP",
    interest: "Ranger XLS 2020",
    status: "Proposta Enviada",
    financing: "Recusado",
    budget: "R$ 189.000",
    lastContact: "06/09, 17:20",
    notes: "Crédito recusado no banco principal, tentar outra financeira.",
    interactions: [
      { id: "g1", kind: "E-mail", date: "06/09, 17:20", note: "Reenvio de proposta com entrada maior." },
    ],
  },
];

export const inventory = [
  { id: "v1", model: "Toyota Corolla XEI", year: 2022, km: "38.400 km", price: "R$ 135.900", status: "Disponível" },
  { id: "v2", model: "Jeep Compass Longitude", year: 2021, km: "52.100 km", price: "R$ 158.500", status: "Reservado" },
  { id: "v3", model: "Fiat Toro Volcano", year: 2023, km: "14.900 km", price: "R$ 175.000", status: "Disponível" },
  { id: "v4", model: "Honda HR-V EXL", year: 2022, km: "41.700 km", price: "R$ 149.900", status: "Vendido" },
  { id: "v5", model: "VW T-Cross Highline", year: 2023, km: "22.300 km", price: "R$ 142.000", status: "Disponível" },
  { id: "v6", model: "Ford Ranger XLS", year: 2020, km: "78.600 km", price: "R$ 189.000", status: "Disponível" },
];

export const metrics = [
  { label: "Total de Clientes", value: "248", delta: "+12 esta semana" },
  { label: "Negociações Ativas", value: "37", delta: "+5 vs. semana passada" },
  { label: "Test Drives Agendados", value: "9", delta: "3 para hoje" },
  { label: "Vendas no Mês", value: "R$ 1,42 mi", delta: "18 veículos entregues" },
];
