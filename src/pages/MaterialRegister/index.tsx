// MaterialRegister.tsx
import { generateWhatsAppText } from '@/utils/whatsapp/generateWhatsAppText';
import { shareWhatsApp } from '@/utils/whatsapp/shareWhatsApp';
import { saveLaunchFromForm } from '@/services/storage/launchStorage';
import { formSchema } from '@/types/formMaterial';
import type { FormData } from '@/types/formMaterial';
import { DataOfficer } from '@/components/FormMaterial/DataOfficer';
import { DataMaterials } from '@/components/FormMaterial/DataMaterials';
import { DataLocation } from '@/components/FormMaterial/DataLocation';
import { DataService } from '@/components/FormMaterial/DataService';
import { BaseForm } from '@/components/BaseForm';

type FormProps = {
  readonly onNewLaunch?: (launch: any) => void;
};

const defaultValues: FormData = {
  officer: {
    name: '',
    registration: '',
    city: '',
    state: 'MG',
    street: '',
    number: '',
    hood: '',
    date: '',
    activity: '',
  },
  materials: [{ name: '', code: '', unit: 'unidade', quantity: 1 }],
};

export function MaterialRegister({ onNewLaunch }: FormProps) {
  const handleSubmit = async (data: FormData) => {
    const text = generateWhatsAppText(data);
    const newLaunch = saveLaunchFromForm(data);
    onNewLaunch?.(newLaunch);

    await shareWhatsApp({
      text,
      title: 'Baixa de Material',
    });
  };

  return (
    <BaseForm
      schema={formSchema}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      submitButtonText="Compartilhar no WhatsApp"
    >
      {({ register, errors, control, setValue }) => (
        <>
          <DataOfficer register={register} errors={errors} setValue={setValue} />
          <DataLocation register={register} errors={errors} />
          <DataService register={register} errors={errors} />
          <DataMaterials register={register} errors={errors} control={control} />
        </>
      )}
    </BaseForm>
  );
}

export default MaterialRegister;
