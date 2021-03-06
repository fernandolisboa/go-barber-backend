import { Request, Response } from 'express'
import { container } from 'tsyringe'

import FindAllAppointmentsService from '@modules/appointments/services/FindAllAppointmentsService'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

class AppointmentsController {
  public async index(_request: Request, response: Response): Promise<Response> {
    const findAllAppointments = container.resolve(FindAllAppointmentsService)
    const appointments = await findAllAppointments.execute()

    return response.json(appointments)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const customer_id = request.user.id
    const { provider_id, date } = request.body

    const createAppointment = container.resolve(CreateAppointmentService)

    const appointment = await createAppointment.execute({
      provider_id,
      customer_id,
      date,
    })

    return response.json(appointment)
  }
}

export default AppointmentsController
