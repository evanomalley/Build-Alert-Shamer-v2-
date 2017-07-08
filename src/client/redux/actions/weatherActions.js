export function setWeather(item){
	return {
		type: "SET_WEATHER",
		payload: {
			results : item
		}
	}
}