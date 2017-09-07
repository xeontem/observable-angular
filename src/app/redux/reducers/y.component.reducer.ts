import { Action } from '@ngrx/store';

export const STORE_PREFWITH = 'STORE_PREFWITH';

//----------------------------------------- Y component reducer -------------------------------
export interface YComponentState {
    perfWith: number;
    withValue: number;
}

const Y_component_state = {
    perfWith: 0,
    withValue: 0
}

export function YComponentReducer(state:YComponentState = Y_component_state, action: Action) {
	console.log(action.type, state);
	switch (action.type) {
		case STORE_PREFWITH: return Object.assign({}, state, action['payload']);
		default: return state;
	}
}
