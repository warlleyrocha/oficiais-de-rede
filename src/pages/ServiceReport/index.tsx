// ServiceReport.tsx
import { generateServiceReportText } from '@/utils/whatsapp/generateWhatsAppText';
import { shareWhatsApp } from '@/utils/whatsapp/shareWhatsApp';
import { serviceSchema } from '@/types/serviceReport';
import type { z } from 'zod';
import { saveServiceReportFromForm } from '@/services/storage/serviceReportStorage';
import { BaseForm } from '@/components/BaseForm';
import { Users, MapPin, Clock, Wrench, ListCollapse } from 'lucide-react';
import { FormField } from '@/components/FormMaterial/FormField';
import { SelectField } from '@/components/FormMaterial/SelectField';
import { TEAM } from '@/constants/teams';
import { DataMaterials } from '@/components/FormMaterial/DataMaterials';

type ServiceFormData = z.infer<typeof serviceSchema>;

const defaultValues: ServiceFormData = {
  supervisor: '',
  date: '',
  hour: '',
  location: '',
  typeService: '',
  team: '',
  timeDeparture: '',
  timeArrival: '',
  timeTests: '',
  timeFaultIdentified: '',
  causeFailure: '',
  faultAdress: '',
  timeNormalized: '',
  testBy: '',
  numberCableFault: '',
  batch: '',
  initialLength: '',
  finalLength: '',
  total: '',
  materials: [{ name: '', code: '', unit: 'unidade', quantity: 1 }],
  pending: '',
  comments: '',
};

// Opções de equipes
const teamOptions = [
  { value: '', label: 'Selecione a equipe' },
  ...TEAM.map((team) => ({ value: team.value, label: team.label })),
];

export function ServiceReport() {
  const handleSubmit = async (data: ServiceFormData) => {
    // Salvar no storage
    saveServiceReportFromForm(data);
    
    const text = generateServiceReportText(data);
    await shareWhatsApp({
      text,
      title: 'Relatório de Serviço',
    });
  };

  return (
    <BaseForm
      schema={serviceSchema}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      submitButtonText="Compartilhar Relatório no WhatsApp"
    >
      {({ register, errors, control }) => (
        <>
          {/* Seção: Dados da Equipe */}
          <div className="bg-[#f4f9fd]/80 backdrop-blur-sm rounded-2xl shadow border-0 p-6 space-y-6 transform hover:scale-[1.01] transition-all duration-300 hover:shadow-lg">
            <div className="pb-4">
              <h2 className="flex items-center space-x-2 text-xl font-semibold text-[#302b4b]">
                <div className="w-6 h-6 text-[#302b4b]">
                  <Users />
                </div>
                <span>Dados da Equipe</span>
              </h2>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField<ServiceFormData>
                  id="supervisor"
                  name="supervisor"
                  label="Supervisor *"
                  placeholder="Nome do supervisor"
                  register={register}
                  required
                  error={errors.supervisor}
                />

                <SelectField<ServiceFormData>
                  id="team"
                  name="team"
                  label="Equipe *"
                  options={teamOptions}
                  register={register}
                  required
                  error={errors.team}
                />

                <FormField<ServiceFormData>
                  id="date"
                  name="date"
                  label="Data *"
                  type="date"
                  register={register}
                  required
                  error={errors.date}
                />

                <FormField<ServiceFormData>
                  id="hour"
                  name="hour"
                  label="Hora da Atribuição *"
                  type="time"
                  register={register}
                  required
                  error={errors.hour}
                />
              </div>
            </div>
          </div>

          {/* Seção: Localização e Tipo de Serviço */}
          <div className="bg-[#f4f9fd]/80 backdrop-blur-sm rounded-2xl shadow border-0 p-6 space-y-6 transform hover:scale-[1.01] transition-all duration-300 hover:shadow-lg">
            <div className="pb-4">
              <h2 className="flex items-center space-x-2 text-xl font-semibold text-[#302b4b]">
                <div className="w-6 h-6 text-[#302b4b]">
                  <MapPin />
                </div>
                <span>Localização e Serviço</span>
              </h2>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField<ServiceFormData>
                  id="location"
                  name="location"
                  label="Localidade *"
                  placeholder="Ex: Viçosa - MG"
                  register={register}
                  required
                  error={errors.location}
                />

                <FormField<ServiceFormData>
                  id="typeService"
                  name="typeService"
                  label="Tipo de Serviço *"
                  placeholder="Ex: RAL-20227308"
                  register={register}
                  required
                  error={errors.typeService}
                />

                <FormField<ServiceFormData>
                  id="faultAdress"
                  name="faultAdress"
                  label="Endereço da Falha *"
                  placeholder="Ex: Rua B"
                  register={register}
                  required
                  error={errors.faultAdress}
                />
              </div>
            </div>
          </div>

          {/* Seção: Horários */}
          <div className="bg-[#f4f9fd]/80 backdrop-blur-sm rounded-2xl shadow border-0 p-6 space-y-6 transform hover:scale-[1.01] transition-all duration-300 hover:shadow-lg">
            <div className="pb-4">
              <h2 className="flex items-center space-x-2 text-xl font-semibold text-[#302b4b]">
                <div className="w-6 h-6 text-[#302b4b]">
                  <Clock />
                </div>
                <span>Horários</span>
              </h2>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField<ServiceFormData>
                  id="timeDeparture"
                  name="timeDeparture"
                  label="Hora do Deslocamento *"
                  type="time"
                  register={register}
                  required
                  error={errors.timeDeparture}
                />

                <FormField<ServiceFormData>
                  id="timeArrival"
                  name="timeArrival"
                  label="Hora da Chegada *"
                  type="time"
                  register={register}
                  required
                  error={errors.timeArrival}
                />

                <FormField<ServiceFormData>
                  id="timeTests"
                  name="timeTests"
                  label="Hora dos Testes *"
                  type="time"
                  register={register}
                  required
                  error={errors.timeTests}
                />

                <FormField<ServiceFormData>
                  id="timeFaultIdentified"
                  name="timeFaultIdentified"
                  label="Hora da Identificação da Falha *"
                  type="time"
                  register={register}
                  required
                  error={errors.timeFaultIdentified}
                />

                <FormField<ServiceFormData>
                  id="timeNormalized"
                  name="timeNormalized"
                  label="Hora da Normalização *"
                  type="time"
                  register={register}
                  required
                  error={errors.timeNormalized}
                />
              </div>
            </div>
          </div>

          {/* Seção: Detalhes Técnicos */}
          <div className="bg-[#f4f9fd]/80 backdrop-blur-sm rounded-2xl shadow border-0 p-6 space-y-6 transform hover:scale-[1.01] transition-all duration-300 hover:shadow-lg">
            <div className="pb-4">
              <h2 className="flex items-center space-x-2 text-xl font-semibold text-[#302b4b]">
                <div className="w-6 h-6 text-[#302b4b]">
                  <Wrench />
                </div>
                <span>Detalhes Técnicos</span>
              </h2>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField<ServiceFormData>
                  id="causeFailure"
                  name="causeFailure"
                  label="Causa da Falha *"
                  placeholder="Ex: Fibra rompida por carga alta"
                  register={register}
                  required
                  error={errors.causeFailure}
                />

                <FormField<ServiceFormData>
                  id="testBy"
                  name="testBy"
                  label="Testado Por"
                  placeholder="Nome do responsável"
                  register={register}
                  required
                  error={errors.testBy}
                />

                <FormField<ServiceFormData>
                  id="numberCableFault"
                  name="numberCableFault"
                  label="Nº do Cabo em Falha"
                  placeholder="Número do cabo"
                  register={register}
                  required
                  error={errors.numberCableFault}
                />

                <FormField<ServiceFormData>
                  id="batch"
                  name="batch"
                  label="Lote"
                  placeholder="Número do lote"
                  register={register}
                  required
                  error={errors.batch}
                />

                <FormField<ServiceFormData>
                  id="initialLength"
                  name="initialLength"
                  label="Metragem Inicial"
                  placeholder="Ex: 100m"
                  register={register}
                  required
                  error={errors.initialLength}
                />

                <FormField<ServiceFormData>
                  id="finalLength"
                  name="finalLength"
                  label="Metragem Final"
                  placeholder="Ex: 95m"
                  register={register}
                  required
                  error={errors.finalLength}
                />

                <FormField<ServiceFormData>
                  id="total"
                  name="total"
                  label="Total"
                  placeholder="Ex: 5m"
                  register={register}
                  required
                  error={errors.total}
                />
              </div>
            </div>
          </div>

          {/* Seção: Materiais */}
          <DataMaterials register={register} errors={errors} control={control} />

          {/* Seção: Pendências e Observações */}
          <div className="bg-[#f4f9fd]/80 backdrop-blur-sm rounded-2xl shadow border-0 p-6 space-y-6 transform hover:scale-[1.01] transition-all duration-300 hover:shadow-lg">
            <div className="pb-4">
              <h2 className="flex items-center space-x-2 text-xl font-semibold text-[#302b4b]">
                <div className="w-6 h-6 text-[#302b4b]">
                  <ListCollapse />
                </div>
                <span>Pendências e Observações</span>
              </h2>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {/* Pendências */}
                <FormField<ServiceFormData>
                  id="pending"
                  name="pending"
                  label="Pendências"
                  placeholder="Descreva as pendências do serviço (opcional)"
                  register={register}
                  multiline={true}
                  error={errors.pending}
                />

                {/* Observações */}
                <FormField<ServiceFormData>
                  id="comments"
                  name="comments"
                  label="Observações"
                  placeholder="Ex: Colocado caixa de emenda e refeito as fusões"
                  register={register}
                  multiline={true}
                  error={errors.comments}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </BaseForm>
  );
}

export default ServiceReport;
