/**
 * Formulário
 *
 * - Primeiramente vá até /src/pages/api/users/create.ts e implemente a API
 * - Deve ser implementado utilizando a lib react-hook-form
 * - O formulário deve ter os seguintes campos: nome, e-mail
 * - Os dois campos são obrigatórios e precisam de validação
 * - Ao dar 'submit', deve ser feito uma request para /api/users/create
 * - Lide com os possíveis erros
 */

import styles from '@/styles/formulario.module.css'
import { useForm } from 'react-hook-form'
import { IUserCreate, userCreateSchema } from '@/types/user.d'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/contexts/ToastContext'

export default function Form() {
  const { addToast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserCreate>({
    mode: 'onChange',
    resolver: zodResolver(userCreateSchema),
  })

  async function onSubmit(data: IUserCreate) {
    try {
      const result = await fetch('/api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      console.log(await result.json())
      addToast('sucesso!', 'success', 5000)
    } catch (error) {
      console.error(error)
    }
    console.log('submit')
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Name" {...register('name')} />
          {errors.name && <span>{errors.name.message}</span>}
          <input type="email" placeholder="E-mail" {...register('email')} />
          {errors.email && <span>{errors.email.message}</span>}
          <button type="submit" data-type="confirm">
            Enviar
          </button>
        </form>
      </div>
    </div>
  )
}
