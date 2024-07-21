export function createToggle(initialState: boolean) {
	let isActive = $state(initialState);

	return {
		get isActive() {
			return isActive;
		},
		toggle: function () {
			isActive = !isActive;
		},
		enable: function () {
			isActive = true;
		},
		disable: function () {
			isActive = false;
		}
	};
}

export type Toggle = ReturnType<typeof createToggle>;
