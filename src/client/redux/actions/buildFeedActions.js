export function addFeedItem(item){
	return {
		type: "ADD_FEED_ITEM",
		payload: {
			item : item
		}
	}
}

export function addAllFeedItems(items){
	return {
		type: "ADD_ALL_FEED_ITEMS",
		payload: {
			items : items
		}
	}
}

export function addCurrentBuildStatus(item){
	return {
		type: "ADD_CURRENT_BUILD_STATUS",
		payload: {
			item : item
		}
	}
}