import { Gym } from '@prisma/client';
import { GymsRepository } from '@/repositories/gyms-repository';

interface CreateGymUseCaseRequest {
    title: string
    description: string | null
    phone: string | null
    latitude: number
    Longitude: number
}

interface CreateGymUseCaseResponse {
    gym: Gym
}

export class CreateGymUseCase {
    constructor(private gymsRepository: GymsRepository) { }
    async execute({
        title,
        description,
        phone,
        latitude,
        Longitude

    }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
        const gym = await this.gymsRepository.create({
            title,
            description,
            phone,
            latitude,
            Longitude
        })
        return {
            gym,
        }
    }
}

