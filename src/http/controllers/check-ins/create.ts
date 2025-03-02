import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case';

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createCheckInParamsSchema = z.object({
        gymId: z.string().uuid(),
    })

    const createCheckInBodySchema = z.object({
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        Longitude: z.number().refine(value => {
            return Math.abs(value) <= 100
        }),
    })

    const { gymId } = createCheckInParamsSchema.parse(request.body)
    const { latitude, Longitude } = createCheckInBodySchema.parse(request.body)

    const createGymUseCase = makeCheckInUseCase()

    await createGymUseCase.execute({
        gymId,
        userId: request.user.sub,
        userLatitude: latitude,
        userLongitude: Longitude
    })

    return reply.status(201).send()
}