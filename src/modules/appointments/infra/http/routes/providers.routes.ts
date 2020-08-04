import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController'
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController'
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController'

const providersController = new ProvidersController()
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController()
const providerDayAvailabilityController = new ProviderDayAvailabilityController()

const providersRouter = Router()

providersRouter.use(ensureAuthenticated)

providersRouter.get('/', providersController.index)
providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
)
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
)

export default providersRouter
