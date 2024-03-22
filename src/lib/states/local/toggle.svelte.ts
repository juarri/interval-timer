export function createToggle(initialState: boolean) {
	let isEnabled = $state(initialState);

	function toggle() {
		isEnabled = !isEnabled;
	}

	function enable() {
		isEnabled = true;
	}

	function disable() {
		isEnabled = false;
	}

	return {
		get isEnabled() {
			return isEnabled === true;
		},
		get isDisabled() {
			return isEnabled === false;
		},
		toggle,
		enable,
		disable
	};
}

export type Toggle = ReturnType<typeof createToggle>;
