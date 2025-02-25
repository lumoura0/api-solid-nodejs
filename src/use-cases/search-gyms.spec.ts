import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymsUseCase(gymsRepository)
    })

    it('should be able to search for gyms', async () => {
        await gymsRepository.create({
            title: 'Js Gym',
            description: null,
            phone: null,
            latitude: -27.2092052,
            Longitude: -49.6401091,
        })

        await gymsRepository.create({
            title: 'Php Gym',
            description: null,
            phone: null,
            latitude: -27.2092052,
            Longitude: -49.6401091,
        })

        const { gyms } = await sut.execute({
            query: 'Js',
            page: 1,
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Js Gym' }),
        ])
    })

    it('should be able to fetch paginated gyms search', async () => {
        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                title: `Js Gyms ${i}`,
                description: null,
                phone: null,
                latitude: -27.2092052,
                Longitude: -49.6401091,
            })
        }

        const { gyms } = await sut.execute({
            query: 'Js',
            page: 2,
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Js Gyms 21' }),
            expect.objectContaining({ title: 'Js Gyms 22' }),
        ])
    })

})