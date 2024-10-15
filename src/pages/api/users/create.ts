/**
 * @api {get} /api/users/create Create User
 *
 * Resolva o exercício aqui:
 *
 * - Crie uma API que registre um usuário no array users
 * - A request deve receber apenas o método POST
 * - A request deve receber um body com os dados do usuário
 * - O body vai seguir a interface IUserCreate, removendo o id
 * - Você deve corrigir a interface IUserCreate em src/types/user.d.ts
 */

import { NextApiRequest, NextApiResponse } from 'next/types'

import { IUser, IUserCreate, userCreateSchema } from '@/types/user.d'
import { ZodError } from 'zod'
import { ApiMethod } from '@/decorators/method'
import { users } from '@/pages/api/users/index'

export default ApiMethod('POST')(async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body) return res.status(400).json(undefined)
  userCreateSchema
    .parseAsync(req.body)
    .then((user: IUserCreate) => {
      const createdUser: IUser = { id: users.length + 1, name: user.name, email: user.email }
      users.push(createdUser)
      return res.status(200).json(users)
    })
    .catch((e: ZodError) => {
      console.log(e)
      return res.status(400).json({ errors: e.issues })
    })
})
