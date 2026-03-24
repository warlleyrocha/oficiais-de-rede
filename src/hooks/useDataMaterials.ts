import { useEffect, useState } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import type { FormData } from '@/types/formMaterial';
import { getMateriais } from '@/services/api/materiais';
import type { MaterialApi } from '@/types/api/materiais';

type UseDataMaterialsProps = {
  control: Control<FormData>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: (name: any, value: any) => void;
};

export function useDataMaterials({ control, setValue }: UseDataMaterialsProps) {
  const { fields, append, remove } = useFieldArray({ control, name: 'materials' });

  const materialValues = useWatch({ control, name: 'materials', defaultValue: [] });

  const [openItems, setOpenItems] = useState<boolean[]>(fields.map((_, i) => i === 0));
  const [materiaisApi, setMateriaisApi] = useState<MaterialApi[]>([]);

  useEffect(() => {
    getMateriais()
      .then(setMateriaisApi)
      .catch(() => setMateriaisApi([]));
  }, []);

  function handleAppend() {
    append({ name: '', code: '', quantity: 1, unit: 'unidade' });
    setOpenItems((prev) => [...prev.map(() => false), true]);
  }

  function handleRemove(index: number) {
    remove(index);
    setOpenItems((prev) => prev.filter((_, i) => i !== index));
  }

  function handleToggleOpen(index: number, val: boolean) {
    setOpenItems((prev) => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  }

  function handleMaterialSelect(index: number, selectedName: string) {
    setValue(`materials.${index}.name`, selectedName);
    const found = materiaisApi.find((m) => m.nomeMaterial === selectedName);
    setValue(`materials.${index}.code`, found?.codigo ?? '');
  }

  const materiaisOptions = [
    { value: '', label: 'Selecione um material' },
    ...materiaisApi
      .map((m) => ({ value: m.nomeMaterial, label: m.nomeMaterial }))
      .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR')),
  ];

  return {
    fields,
    materialValues,
    openItems,
    materiaisApi,
    materiaisOptions,
    handleAppend,
    handleRemove,
    handleToggleOpen,
    handleMaterialSelect,
  };
}
