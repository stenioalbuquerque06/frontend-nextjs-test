/**
 * Lista
 *
 * - Primeiramente vá até /src/pages/api/users/index.ts e implemente a API
 * - Obter a lista de usuários da API
 * - Renderizar a lista de usuários
 */

import { useEffect, useState } from 'react'

import styles from '@/styles/lista.module.css'
import { IUser } from '@/types/user'

export default function Lista() {
  const [users, setUsers] = useState<Array<IUser>>([])
  const [loading, setLoading] = useState(false)

  async function getUsersList() {
    try {
      setLoading(true)
      const response = await fetch('/api/users')
      const data = await response.json()
      if (!response.ok) throw new Error('Erro ao obter os dados')
      return data
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUsersList().then((r: IUser[]) => setUsers(r))
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Lista de usuários</h2>
        <div data-list-container>
          {!loading && !users.length && <p>Ainda não tem tenhum usuário... Que tal criar um no próximo passo?</p>}
          {users.map((user: IUser) => {
            return (
              <div data-list-item key={user.id}>
                {' '}
                ID: {user.id} - {user.name} ({user.email}){' '}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
