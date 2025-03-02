import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
    const nearbyGymsQuerySchema = z.object({
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        Longitude: z.number().refine(value => {
            return Math.abs(value) <= 100
        }),
    })

    const { latitude, Longitude } = nearbyGymsQuerySchema.parse(request.query)

    const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()

    const { gyms } = await fetchNearbyGymsUseCase.execute({
        userLatitude: latitude,
        userLongitude: Longitude,
    })

    return reply.status(201).send({
        gyms
    })
}