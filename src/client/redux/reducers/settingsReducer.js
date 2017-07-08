export default function reducer( state={
	sounds: [],
	timer: null
	}, action) {

	switch(action.type){
		case 'SET_SETTINGS': {
			return Object.assign({},
				state,
			{ sounds: action.payload.sounds, 
			  timer: action.payload.timer });
		}
	}
	return state;
}