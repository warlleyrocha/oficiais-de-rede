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

export const serviceSchema = z.object({
  supervisor: z.string().min(1, 'Nome do supervisor é obrigatório'),
  date: z.string().min(1, 'Data é obrigatória'),
  hour: z.string().min(1, 'Hora é obrigatória'),
  location: z.string().min(1, 'Localização é obrigatória'),
  typeService: z.string().min(1, 'Tipo de serviço é obrigatório'),
  team: z.string().min(1, 'Equipe é obrigatória'),
  timeDeparture: z.string().min(1, 'Hora do deslocamento é obrigatória'),
  timeArrival: z.string().min(1, 'Hora da chegada é obrigatória'),
  timeTests: z.string().min(1, 'Hora dos testes é obrigatória'),
  timeFaultIdentified: z.string().min(1, 'Hora da identificação da falha é obrigatória'),
  causeFailure: z.string().min(1, 'Causa da falha é obrigatória'),
  faultAdress: z.string().min(1, 'Endereço da falha é obrigatório'),
  timeNormalized: z.string().min(1, 'Hora da normalização é obrigatória'),
  testBy: z.string().optional(),
  numberCableFault: z.string().optional(),
  batch: z.string().optional(),
  initialLength: z.string().optional(),
  finalLength: z.string().optional(),
  total: z.string().optional(),
  materials: z.array(materialSchema).min(1, 'Adicione pelo menos 1 material'),
  pending: z.string().optional(),
  comments: z.string().optional(),
});
