import { useForm } from 'react-hook-form';
import { useState, type ReactNode } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SuccessFeedback } from '@/components/SuccessFeedback';

type BaseFormProps = {
  readonly schema: any;
  readonly defaultValues: any;
  readonly onSubmit: (data: any) => Promise<void> | void;
  readonly children: (props: {
    register: any;
    errors: any;
    control: any;
    setValue: any;
  }) => ReactNode;
  readonly submitButtonText?: string;
  readonly submitButtonTextInvalid?: string;
};

export function BaseForm({
  schema,
  defaultValues,
  onSubmit: handleFormSubmit,
  children,
  submitButtonText = 'Enviar',
  submitButtonTextInvalid = 'Preencha todos os campos',
}: BaseFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = async (data: any) => {
    setError(null);
    try {
      await handleFormSubmit(data);
      setShowSuccess(true);
      reset();
    } catch (error) {
      console.error('Erro ao processar formulário: ', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro ao processar formulário';
      setError(errorMessage);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 rounded-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {children({ register, errors, control, setValue })}

        {/* Botão de submissão */}
        <div className="flex justify-center bg-[#f4f9fd]/80 backdrop-blur-sm rounded-2xl shadow border-0 p-6 space-y-6 transform hover:scale-[1.01] transition-all duration-300 hover:shadow-lg">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={!isValid}
            className={`h-12 px-6 rounded-xl font-medium transition-colors text-white ${
              isValid ? 'bg-[#302b4b] hover:bg-[#4a3f6b]' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {isValid ? submitButtonText : submitButtonTextInvalid}
          </button>
        </div>
      </form>

      {/* Feedback de Sucesso */}
      <SuccessFeedback isVisible={showSuccess} onClose={() => setShowSuccess(false)} />
    </div>
  );
}
