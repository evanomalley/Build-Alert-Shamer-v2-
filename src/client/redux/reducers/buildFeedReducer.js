export default function reducer( state={
		count: 0, 
		results: [],
		currentBuildStatus: {}
	}, action) {

	switch(action.type){
		case 'ADD_FEED_ITEM': {
			return Object.assign({},
				state,
			{ count: state.count+=1, 
			  results: state.results.concat(action.payload.item),
			  currentBuildStatus: action.payload.item});
		}
		case 'ADD_ALL_FEED_ITEMS': {
			return Object.assign({},
				state,
			{ count: action.payload.items.length, 
			  results: state.results.concat(action.payload.items),
			  currentBuildStatus: action.payload.items[action.payload.items.length - 1]});
		}
		case 'ADD_CURRENT_BUILD_STATUS': {
			return Object.assign({},
				state,
				{	count: state.count,
					results: state.results,
					currentBuildStatus: action.payload.item});
		}
	}
	return state;
}