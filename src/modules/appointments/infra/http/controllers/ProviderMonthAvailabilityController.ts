import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService'

class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProvidersMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService,
    )

    const { provider_id } = request.params
    const { month, year } = request.body

    const providers = await listProvidersMonthAvailability.execute({
      provider_id,
      month,
      year,
    })

    return response.json(providers)
  }
}

export default ProviderMonthAvailabilityController
