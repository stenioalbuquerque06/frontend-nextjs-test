/**
 * Página estática
 *
 * - Atualmente o conteúdo é gerado no momento em que a requisição é feita
 * - Você deve transformar essa página em uma página estática
 * - A página deve ser gerada no momento da build
 * - A página deve ser atualizada a cada 1 minuto
 */
import { useEffect, useState } from 'react'

import styles from '@/styles/lista.module.css'
import { ICity } from '@/types/city.d'
import { InferGetStaticPropsType } from 'next'
import { getCities } from '@/mocks/api/cities'

const secondsInMs = 60 * 1000

export default function Lista({ cities }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [citiesList, setCities] = useState<Array<ICity>>([...cities])

  useEffect(() => {
    setInterval(() => {
      const newData = getCities(10)
      setCities(newData)
    }, secondsInMs)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Lista de cidades</h2>

        <div data-list-container>
          {citiesList.map(city => (
            <div data-list-item key={city.id}>
              {city.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const cities = getCities(10)
  console.log(cities)
  return {
    props: {
      cities,
    },
    revalidate: 60,
  }
}
