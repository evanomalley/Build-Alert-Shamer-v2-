export function setSettings(sounds, timer){
	return {
		type: "SET_SETTINGS",
		payload: {
			sounds: sounds,
			timer: timer
		}
	}
}

export function requestSettings(){
	return
}