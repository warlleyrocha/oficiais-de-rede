import { z } from 'zod';

export const materialSchema = z
  .object({
    name: z.string().min(1, 'Nome do material é obrigatório'),
    code: z.string().max(12, 'Código deve ter no máximo 12 caracteres').optional(), // Código é opcional

    unit: z.enum(['unidade', 'metro'], { message: 'Selecione a unidade do material' }),
    quantity: z.number().min(0.01, 'Quantidade mínima é 0.01'),
  })
  .superRefine((obj, ctx) => {
    if (obj.unit === 'unidade' && !Number.isInteger(obj.quantity)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Quantidade deve ser um número inteiro para unidades',
        path: ['quantity'], // aponta o erro para o campo quantity
      });
    }
  });

export const formSchema = z.object({
  officer: z.object({
    name: z.string().min(1, 'Nome do técnico é obrigatório'),
    registration: z
      .string()
      .min(1, 'Matrícula do técnico é obrigatória')
      .max(10, 'Matrícula deve ter no máximo 10 caracteres'),
    city: z.string().min(1, 'Cidade é obrigatória'),
    state: z
      .string()
      .length(2, 'Estado deve ter 2 caracteres')
      .transform((val) => val.toUpperCase()),
    street: z.string().min(1, 'Rua é obrigatória'),
    number: z.string().max(5, 'Número da rua deve ter no máximo 5 caracteres').optional(), // Número da rua opcional
    hood: z.string().min(1, 'Bairro é obrigatório'),
    date: z.string().min(1, 'Data é obrigatória'),
    activity: z.string().optional(),
  }),
  materials: z.array(materialSchema).min(1, 'Adicione pelo menos 1 material'),
});

export type FormData = z.infer<typeof formSchema>;
