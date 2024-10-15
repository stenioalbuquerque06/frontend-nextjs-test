import { faker } from '@faker-js/faker/locale/pt_BR'

import { ICity } from '@/types/city'

function loop(length: number) {
  return Array.from({ length }, () => 1).map((_, index) => index + 1)
}

export function getCities(length: number): ICity[] {
  const cities: ICity[] = []

  for (const _ of loop(length)) {
    cities.push({
      id: faker.string.uuid(),
      name: faker.location.city(),
    })
  }

  return cities
}
