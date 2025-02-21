import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'


let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(gymsRepository)
    })
    it('should be able to create gym', async () => {
        const { gym } = await sut.execute({
            title: 'JS Gym',
            description: null,
            phone: null,
            latitude: -27.2092052,
            Longitude: -49.6401091,
        })

        expect(gym.id).toEqual(expect.any(String))
    })
})