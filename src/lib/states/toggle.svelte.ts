export function createToggle(initialState: boolean) {
	let isOn = $state(initialState);

	function toggle() {
		isOn = !isOn;
	}

	function enable() {
		isOn = true;
	}

	function disable() {
		isOn = false;
	}

	return {
		get isOn() {
			return isOn;
		},
		toggle,
		enable,
		disable
	};
}
