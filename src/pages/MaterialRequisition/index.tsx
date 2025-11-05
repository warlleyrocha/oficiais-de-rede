import { DataOfficer } from '@/components/FormMaterial/DataOfficer';
import { DataMaterials } from '@/components/FormMaterial/DataMaterials';
import { BaseForm } from '@/components/BaseForm';
import { FormField } from '@/components/FormMaterial/FormField';
import { Calendar1 } from 'lucide-react';
import { generateRequestText } from '@/utils/whatsapp/generateWhatsAppText';
import { shareWhatsApp } from '@/utils/whatsapp/shareWhatsApp';
import { requestSchema, type RequestFormData } from '@/types/requestMaterial';

const defaultValues: RequestFormData = {
  officer: {
    name: '',
    registration: '',
    date: '',
  },
  materials: [{ name: '', code: '', unit: 'unidade', quantity: 1 }],
};

export function RequestMaterial() {
  const handleSubmit = async (data: RequestFormData) => {
    // Gerar texto de requisição
    const text = generateRequestText(data);
    await shareWhatsApp({
      text,
      title: 'Requisição de Material',
    });
  };

  return (
    <BaseForm
      schema={requestSchema}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      submitButtonText="Exportar Mensagem"
    >
      {({ register, errors, control, setValue }) => (
        <>
          <DataOfficer register={register} errors={errors} setValue={setValue} />
          <div className="bg-[#f4f9fd]/80 backdrop-blur-sm rounded-2xl shadow border-0 p-6 pt-1 space-y-6 transform hover:scale-[1.01] transition-all duration-300 hover:shadow-lg">
            <div className="pb-4">
              <h2 className="flex items-center space-x-2 text-xl font-semibold text-[#302b4b]">
                <div className="w-6 h-6 text-[#302b4b]">
                  <Calendar1 />
                </div>
                <span>Data da Requisição</span>
              </h2>
            </div>
            <FormField<RequestFormData>
              id="officer-date"
              name="officer.date"
              label="Data *"
              type="date"
              register={register}
              error={errors.officer?.date}
            />
          </div>

          <DataMaterials register={register} errors={errors} control={control} />
        </>
      )}
    </BaseForm>
  );
}

export default RequestMaterial;
