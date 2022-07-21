import { DeserializeUserMiddleware } from './DeserializeUserMiddleware'
import { RequireUserMiddleware } from './RequireUserMiddleware'

const requireUserMiddleware = new RequireUserMiddleware().execute
const deserializeUserMiddleware = new DeserializeUserMiddleware().execute

export {
  requireUserMiddleware,
  deserializeUserMiddleware
}