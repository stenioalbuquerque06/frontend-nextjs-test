import { string, z } from 'zod'

export interface IUser {
  id: number
  name: string
  email: string
}

export const userCreateSchema = z.object({
  name: string().min(1, 'O nome é obrigatório'),
  email: string().min(1, 'O email é obrigatório').email('Email inválido'),
})

export type IUserCreate = z.infer<typeof userCreateSchema>
