import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import type { FormData } from '@/types/formMaterial';
import { GoTrash } from 'react-icons/go';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { FormField } from '@/components/FormMaterial/FormField';
import { SelectField } from '@/components/FormMaterial/SelectField';
import { ComboboxField } from '@/components/FormMaterial/ComboboxField';
import { Package } from 'lucide-react';
import { useDataMaterials } from '@/hooks/useDataMaterials';

type DataMaterialsProps = {
  readonly register: UseFormRegister<FormData>;
  readonly errors: FieldErrors<FormData>;
  readonly control: Control<FormData>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly setValue: (name: any, value: any) => void;
};

export function DataMaterials({ register, errors, control, setValue }: DataMaterialsProps) {
  const {
    fields,
    materialValues,
    openItems,
    materiaisApi,
    materiaisOptions,
    handleAppend,
    handleRemove,
    handleToggleOpen,
    handleMaterialSelect,
  } = useDataMaterials({ control, setValue });

  return (
    <div className="bg-[#eff5ff]/80 backdrop-blur-sm rounded-2xl shadow border-0 pt-6 transform hover:scale-[1.01] transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-center px-8">
        <h2 className="flex items-center space-x-2 text-xl font-semibold text-[#302b4b]">
          <div className="w-6 h-6 text-[#302b4b]">
            <Package />
          </div>
          <span>Materiais</span>
        </h2>
      </div>

      <div className="py-6 px-4 space-y-4">
        {fields.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
            <button className="flex flex-col items-center" onClick={handleAppend}>
              <div className="w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center relative">
                <div className="w-6 h-0.5 bg-gray-400 rounded absolute rotate-0"></div>
                <div className="w-0.5 h-6 bg-gray-400 rounded absolute"></div>
              </div>
              <p className="text-lg mb-2">Nenhum material adicionado ainda</p>
              <p className="text-sm">Clique para começar</p>
            </button>
          </div>
        ) : (
          <>
            {fields.map((field, index) => (
              <Collapsible
                key={field.id}
                open={openItems[index]}
                onOpenChange={(val) => handleToggleOpen(index, val)}
              >
                <CollapsibleTrigger asChild>
                  <div className="flex justify-between items-center p-4 bg-[#f0f6ff] border border-white/20 rounded-xl cursor-pointer shadow">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-md font-semibold text-[#302b4b]">
                        {materialValues[index]?.name || `Material ${index + 1}`}
                      </h3>
                    </div>
                    <GoTrash color="red" onClick={() => handleRemove(index)} />
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-[#f0f6ff]/80 rounded-xl border border-white/20 shadow">
                    {materiaisApi.length > 0 ? (
                      <ComboboxField
                        id={`material-name-${index}`}
                        label="Nome do Material *"
                        value={materialValues[index]?.name ?? ''}
                        onChange={(val) => handleMaterialSelect(index, val)}
                        error={errors.materials?.[index]?.name}
                        options={materiaisOptions}
                        placeholder="Digite ou selecione um material"
                      />
                    ) : (
                      <FormField<FormData>
                        id={`material-name-${index}`}
                        name={`materials.${index}.name`}
                        label="Nome do Material *"
                        placeholder="Ex: Cabo de rede"
                        register={register}
                        error={errors.materials?.[index]?.name}
                      />
                    )}

                    <FormField<FormData>
                      id={`material-code-${index}`}
                      name={`materials.${index}.code`}
                      label="Código"
                      placeholder="Ex: 102030"
                      maxLength={12}
                      register={register}
                      error={errors.materials?.[index]?.code}
                    />

                    <SelectField<FormData>
                      id={`material-unit-${index}`}
                      name={`materials.${index}.unit`}
                      label="Unidade *"
                      register={register}
                      error={errors.materials?.[index]?.unit}
                      options={[
                        { value: 'unidade', label: 'Unidade' },
                        { value: 'metro', label: 'Metro' },
                      ]}
                    />

                    <FormField<FormData>
                      id={`material-quantity-${index}`}
                      name={`materials.${index}.quantity`}
                      label="Quantidade *"
                      type="number"
                      min={field.unit === 'unidade' ? 1 : 0.01}
                      step={field.unit === 'unidade' ? 1 : 0.01}
                      placeholder="0"
                      register={register}
                      registerOptions={{ valueAsNumber: true }}
                      error={errors.materials?.[index]?.quantity}
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}

            <div className="flex justify-center pt-[20px]">
              <button
                type="button"
                onClick={handleAppend}
                className="w-[120px] h-[36px] sm:w-auto sm:h-auto sm:px-4 sm:py-2 bg-[#302b4b] text-white rounded-xl hover:bg-[#4a3f6b] transition-colors flex items-center justify-center text-md sm:text-base font-semibold"
              >
                <span className="sm:hidden">+</span>
                <span className="hidden sm:flex sm:items-center">+ Adicionar Material</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
