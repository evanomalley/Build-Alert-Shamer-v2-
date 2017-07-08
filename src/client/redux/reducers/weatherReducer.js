export default function reducer( state={
		weather: {}
	}, action) {

	switch(action.type){
		case 'SET_WEATHER': {
			return Object.assign({},
				state,
			{ weather: action.payload.results});
		}
	}
	return state;
}