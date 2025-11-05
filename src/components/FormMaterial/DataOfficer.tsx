import { SelectField } from './SelectField';
import { FormField } from './FormField';
import type { FormData } from '../../types/formMaterial';
import { TEAM } from '@/constants/teams';
import { Users } from 'lucide-react';
import type { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

type DataOfficerProps = {
  readonly register: UseFormRegister<FormData>;
  readonly errors: FieldErrors<FormData>;
  readonly setValue: UseFormSetValue<FormData>;
};

export function DataOfficer({ register, errors, setValue }: DataOfficerProps) {
  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const team = TEAM.find((eq) => eq.value === e.target.value);

    if (team) {
      setValue('officer.registration', team.registration);
    } else {
      // Limpa os campos se nenhuma equipe for selecionada
      setValue('officer.registration', '');
    }
  };

  const teamPlaceholder = [
    { value: '', label: 'Selecione uma equipe' },
    ...TEAM.map((eq) => ({ value: eq.value, label: eq.label })),
  ];

  return (
    <div className="bg-[#f4f9fd]/80 backdrop-blur-sm rounded-2xl shadow border-0 p-6 space-y-6 transform hover:scale-[1.01] transition-all duration-300 hover:shadow-lg">
      <div className="pb-4">
        <h2 className="flex items-center space-x-2 text-xl font-semibold text-[#302b4b]">
          <div className="w-6 h-6 text-[#302b4b]">
            <Users />
          </div>
          <span>Dados dos Técnicos</span>
        </h2>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Seleção de Equipes */}
          <SelectField<FormData>
            id="officer-name"
            name="officer.name"
            label="Equipe *"
            options={teamPlaceholder}
            register={register}
            required
            onChange={handleTeamChange}
            error={errors.officer?.name}
          />

          {/* Matrícula */}
          <FormField<FormData>
            id="officer-registration"
            name="officer.registration"
            label="Matrícula *"
            maxLength={25}
            placeholder="Ex: 301021/301022"
            register={register}
            required
            error={errors.officer?.registration}
          />
        </div>
      </div>
    </div>
  );
}
