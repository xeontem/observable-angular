import { createSelector } from 'reselect';

import { AppState } from './state';
import { MainComponentState } from './reducers/main.component.reducer';
import { YComponentState } from './reducers/y.component.reducer';

//---------------------- AppState getters ------------------------------------------------
const getMainState = (state: AppState):MainComponentState => state.combiner.main;// get main from global store
const getYState = (state: AppState):YComponentState => state.combiner.y;// get main from global store
//------------------------------------- main component selector ----------------------------
const getMainValue = (state: MainComponentState) => state.value;// get value from main store
const getselectedEvent = (state: MainComponentState) => state.selectedEvent;// get value from main store
export const get_value = createSelector(getMainState, getMainValue);
export const get_selectedEvent = createSelector(getMainState, getselectedEvent);

//------------------------------------- Y component selector ----------------------------
const getYperfWith = (state: YComponentState) => state.perfWith;// get perfWith from Y store
const getYwithValue = (state: YComponentState) => state.withValue;// get value from Y store
export const get_perfWith = createSelector(getYState, getYperfWith);
export const get_withValue = createSelector(getYState, getYwithValue);