
		<form class="flex gap-4">
			<Input
				placeholder="Search timers..."
				oninput={(e) => debouncedInputChange((e.target as HTMLInputElement).value)}
			/>

			<Select.Root>
				<Select.Trigger class="hidden w-72 lg:flex">
					<Select.Value placeholder="Sort by {data.dashboard?.sortBy}" />
				</Select.Trigger>
				<Select.Content class="mt-4">
					<Select.Group>
						{#each sortByOptions as sortByOption}
							<Select.Item
								value={sortByOption.parameter.value}
								label="Sort by {sortByOption.parameter.value}"
								class="p-2"
								onclick={() => {
									setQueryParameter(sortByOption.parameter.name, sortByOption.parameter.value);
								}}>Sort by {sortByOption.parameter.value}</Select.Item
							>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>

			<div class="hidden gap-4 lg:flex">
				{#each viewOptions as viewOption}
					<Button
						aria-label={viewOption.parameter.value}
						variant="outline"
						class="p-2"
						onclick={() => {
							setQueryParameter(viewOption.parameter.name, viewOption.parameter.value);
						}}><Icon src={viewOption.icon} class="pointer-events-none size-4" /></Button
					>
				{/each}
			</div>

			<Drawer.Root>
				<Drawer.Trigger asChild let:builder>
					<Button
						aria-label="Dashboard Settings"
						builders={[builder]}
						variant="outline"
						class="lg:hidden"><Icon src={AdjustmentsHorizontal} class="size-5" /></Button
					>
				</Drawer.Trigger>
				<Drawer.Content>
					<Drawer.Header>
						<Drawer.Title>Dashboard Options</Drawer.Title>
					</Drawer.Header>
					<div class="flex flex-col gap-4">
						{#each sortByOptions as sortByOption}
							<Button
								class="flex"
								variant="link"
								onclick={() => {
									setQueryParameter(sortByOption.parameter.name, sortByOption.parameter.value);
								}}
								><Icon src={sortByOption.icon} class="mr-2 w-fit" />
								<span class="flex-1">{sortByOption.parameter.value}</span>
							</Button>
						{/each}

						<Separator />

						{#each viewOptions as viewOption}
							<Button
								variant="link"
								onclick={() => {
									setQueryParameter(viewOption.parameter.name, viewOption.parameter.value);
								}}
								><Icon src={viewOption.icon} class="pointer-events-none mr-2 w-fit" /><span
									class="flex-1">{viewOption.parameter.value}</span
								>
							</Button>
						{/each}
					</div>

					<Drawer.Footer>
						<Button>Submit</Button>
						<Drawer.Close>Cancel</Drawer.Close>
					</Drawer.Footer>
				</Drawer.Content>
			</Drawer.Root>

			<AlertDialog.Root closeOnOutsideClick={true}>
				<AlertDialog.Trigger asChild let:builder>
					<Button aria-label="Create Timer" builders={[builder]}
						><span class="hidden lg:inline">Create Timer</span>
						<Icon src={Plus} /></Button
					>
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Header>
						<div class="flex items-center justify-between">
							<AlertDialog.Title>Create Timer</AlertDialog.Title>
							<AlertDialog.Cancel aria-label="Close Dialog"><Icon src={XMark} /></AlertDialog.Cancel
							>
						</div>
					</AlertDialog.Header>
					{#if data.intervalTimerFormSchema}
						<CreateIntervalTimerForm intervalTimerFormSchema={data.intervalTimerFormSchema} />
					{/if}
				</AlertDialog.Content>
			</AlertDialog.Root>
		</form>
