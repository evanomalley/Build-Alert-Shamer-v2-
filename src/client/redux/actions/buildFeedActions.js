export function addFeedItem(item){
	return {
		type: "ADD_FEED_ITEM",
		payload: {
			item : item
		}
	}
}