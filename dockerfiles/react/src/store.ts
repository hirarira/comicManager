import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router'

export default function createStore(history: any) {
  return reduxCreateStore(
      combineReducers({
          router: connectRouter(history),
      }),
      applyMiddleware(routerMiddleware(history))
  )
}
