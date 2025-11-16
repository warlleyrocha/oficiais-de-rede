// services/storage/serviceReportStorage.ts
import type { z } from 'zod';
import { serviceSchema } from '@/types/serviceReport';
import type { ServiceReport } from '@/types/history';

const STORAGE_KEY = 'service-reports';

type ServiceFormData = z.infer<typeof serviceSchema>;

/**
 * Recupera todos os relatórios de serviço do localStorage
 */
export function getServiceReports(): ServiceReport[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Erro ao recuperar relatórios de serviço:', error);
    return [];
  }
}

/**
 * Converte dados do formulário para o formato ServiceReport
 */
export function createServiceReportFromFormData(data: ServiceFormData): ServiceReport {
  const now = new Date();

  // Combina a data informada no form com a hora atual
  const [year, month, day] = data.date.split('-');
  const dateWithTime = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
  );

  return {
    id: crypto.randomUUID(),
    type: 'service',
    supervisor: data.supervisor,
    date: dateWithTime.toISOString(),
    hour: data.hour,
    location: data.location,
    typeService: data.typeService,
    team: data.team,
    timeDeparture: data.timeDeparture,
    timeArrival: data.timeArrival,
    timeTests: data.timeTests,
    timeFaultIdentified: data.timeFaultIdentified,
    causeFailure: data.causeFailure,
    faultAdress: data.faultAdress,
    timeNormalized: data.timeNormalized,
    testBy: data.testBy || '',
    numberCableFault: data.numberCableFault || '',
    batch: data.batch || '',
    initialLength: data.initialLength || '',
    finalLength: data.finalLength || '',
    total: data.total || '',
    materials: data.materials.map((mat) => ({
      id: crypto.randomUUID(),
      name: mat.name,
      code: mat.code,
      unit: mat.unit,
      quantity: mat.quantity,
    })),
    pending: data.pending,
    comments: data.comments,
  };
}

/**
 * Salva um novo relatório de serviço no localStorage
 */
export function saveServiceReport(report: ServiceReport): void {
  try {
    const reports = getServiceReports();
    reports.push(report);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  } catch (error) {
    console.error('Erro ao salvar relatório de serviço:', error);
    throw new Error('Falha ao salvar dados');
  }
}

/**
 * Salva relatório de serviço a partir dos dados do formulário
 * @returns O relatório criado
 */
export function saveServiceReportFromForm(data: ServiceFormData): ServiceReport {
  const report = createServiceReportFromFormData(data);
  saveServiceReport(report);
  return report;
}

