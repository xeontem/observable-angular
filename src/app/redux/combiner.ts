import { ActionReducer, Action, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';

import { reducers } from './state';

const developmentReducer: ActionReducer<Object> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<Object> = combineReducers(reducers);

export function combiner(state: any, action: any) {
  if (environment.production) {
      return productionReducer(state, action);
  } else {
      console.log('--------------------- main ----------------------');
      console.log(developmentReducer(state, action)['main']);
      return developmentReducer(state, action);
  }
}