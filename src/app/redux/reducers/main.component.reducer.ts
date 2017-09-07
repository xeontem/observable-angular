import { Action } from '@ngrx/store';

export const CHANGE_OBJ_VAL = 'CHANGE_OBJ_VAL';
export const SELECT_EVENT = 'SELECT_EVENT';

//----------------------------------------- main component reducer -------------------------------
export interface MainComponentState {
  value: string;
  selectedEvent: SelectedEvent;
}

export interface SelectedEvent {
	type: string,
	title?: string,
	description?: string,
	duration?: number,
	id?: string,
	location?: string,
	resources?: Array<any>,
	speakers?: Array<any>,
};

const main_component_state = {
	value: 'test value',
	selectedEvent: {type: 'select event'}
}

export function MainComponentReducer(state:MainComponentState = main_component_state, action: Action) {
	console.log(action.type, state);
	switch (action.type) {
		case CHANGE_OBJ_VAL: return Object.assign({}, state, {value: 'changed value from reducer' + `${Math.random()}`});
		case SELECT_EVENT: return Object.assign({}, state, {selectedEvent: action['payload']});
		default: return state;
	}
}
