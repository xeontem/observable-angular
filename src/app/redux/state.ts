import { MainComponentState, MainComponentReducer } from './reducers/main.component.reducer';
import { YComponentState, YComponentReducer } from './reducers/y.component.reducer';

export interface AppState {
	combiner: {
		main: MainComponentState;
		y: YComponentState;
	}
}

//------------------- AppState -------------------
export const reducers = {// see combiner
	main: MainComponentReducer,
	y: YComponentReducer
};


