export default function reducer( state={
		count: 0, 
		results: []
	}, action) {

	switch(action.type){
		case 'ADD_FEED_ITEM': {
			return Object.assign({},
				state,
			{ count: state.count+=1, 
			  results: state.results.concat(action.payload.item)});
		}
	}
	return state;
}