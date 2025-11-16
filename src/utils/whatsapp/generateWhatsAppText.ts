import { formatDate } from '../../utils/formatDate';
import type { FormData } from '../../types/formMaterial';
import type { RequestFormData } from '@/types/requestMaterial';
import type { z } from 'zod';
import type { serviceSchema } from '@/types/serviceReport';

type ServiceFormData = z.infer<typeof serviceSchema>;

// Função que gera o texto completo e organizado para WhatsApp
export function generateWhatsAppText(data: FormData) {
  const { officer, materials } = data;

  let text = `*BAIXA DE MATERIAIS*\n\n`;

  // Data
  text += `*DATA:* ${formatDate(officer.date)}\n\n`;

  // Técnicos
  text += `*EQUIPE:* ${officer.name}\n`;
  text += `*MATRÍCULA:* ${officer.registration}\n\n`;

  // Endereço
  text += `*CIDADE:* ${officer.city}, ${officer.state}\n`;
  text += `*RUA:* ${officer.street}, ${officer.number}\n`;
  text += `*BAIRRO:* ${officer.hood}\n\n`;

  // Atividade
  text += `*ATIVIDADE REALIZADA:* ${officer.activity}\n\n`;

  // Materiais
  text += `*MATERIAIS UTILIZADOS:*\n`;
  materials.forEach((mat, i) => {
    const unitLabel = mat.unit === 'unidade' ? 'unidade(s)' : 'metro(s)';
    text += `${i + 1}. ${mat.name} - Qtd: ${mat.quantity} ${unitLabel}\n*CÓDIGO:* ${mat.code}\n\n`;
  });

  return text.trim();
}

/**
 * Gera o texto formatado para requisição de materiais via WhatsApp
 */
export function generateRequestText(data: RequestFormData) {
  const { officer, materials } = data;

  let text = `*REQUISIÇÃO DE MATERIAIS*\n\n`;

  // Data
  text += `*DATA:* ${formatDate(officer.date)}\n\n`;
  // Técnicos
  text += `*EQUIPE:* ${officer.name}\n`;
  text += `*MATRÍCULA:* ${officer.registration}\n\n`;

  // Materiais
  text += `*MATERIAIS SOLICITADOS:*\n`;
  materials.forEach((m, i) => {
    const unitLabel = m.unit === 'unidade' ? 'unidade(s)' : 'metro(s)';
    text += `${i + 1}. ${m.name} - Qtd: ${m.quantity} ${unitLabel}\n*CÓDIGO:* ${m.code}\n\n`;
  });

  return text.trim();
}

/**
 * Gera o texto formatado para relatório de serviço via WhatsApp
 */
export function generateServiceReportText(data: ServiceFormData): string {
  let text = '';

  // Supervisor e dados iniciais
  text += `SUPERVISOR: ${data.supervisor}\n`;
  text += `*_ATRIBUIDA FFA: ${formatDate(data.date)} às ${data.hour}_*\n`;
  text += `LOCALIDADE: ${data.location}\n`;
  text += `${data.typeService}\n\n`;

  text += `Equipe: ${data.team}\n\n`;

  // Horários
  text += `HORA DO DESLOCAMENTO: ${data.timeDeparture}\n`;
  text += `HORÁRIO DE CHEGADA AO LOCAL: ${data.timeArrival}\n`;
  text += `TESTES: Começou as ${data.timeTests}\n`;
  text += `HORARIO DE IDENTIFICAÇÃO DA FALHA: ${data.timeFaultIdentified}\n\n`;

  // Detalhes da falha
  text += `CAUSA: ${data.causeFailure}\n`;
  text += `ENDEREÇO DA FALHA: ${data.faultAdress}\n`;
  text += `HORARIO DE NORMALIZAÇÃO: ${data.timeNormalized}\n`;
  text += `TESTADO POR: ${data.testBy}\n\n`;

  // Cabo e metragem
  text += `Nº do CABO em Falha: ${data.numberCableFault}\n`;
  text += `LOTE: ${data.batch}\n`;
  text += `METRAGEM INICIAL: ${data.initialLength}\n`;
  text += `METRAGEM FINAL: ${data.finalLength}\n`;
  text += `TOTAL: ${data.total}\n\n`;

  // Material gasto
  text += `MATERIAL GASTO:\n`;
  data.materials.forEach((material, index) => {
    const quantity = material.unit === 'unidade' ? `${material.quantity}` : `${material.quantity}m`;
    text += `- ${material.name} ${quantity}\n`;
    // Adiciona quebra de linha extra após o último material
    if (index === data.materials.length - 1) {
      text += '\n';
    }
  });

  // Pendências e observações
  if (data.pending) {
    text += `PENDÊNCIAS:\n${data.pending}\n\n`;
  }

  if (data.comments) {
    text += `Observações: ${data.comments}\n\n`;
  }

  return text.trim();
}
