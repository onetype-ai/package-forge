elements.ItemAdd({
	id: 'forge-packages',
	icon: 'construction',
	name: 'Forge Packages',
	description: 'Lists the packages registered for development through Forge, with a form to register a new one.',
	category: 'Forge',
	metadata: { addon: 'forge.packages' },
	config: {},
	render: function()
	{
		this.loading = true;
		this.packages = [];

		this.slug = '';
		this.name = '';
		this.description = '';
		this.saving = false;

		const refresh = async () =>
		{
			this.loading = true;
			this.Update();

			try
			{
				this.packages = await $ot.forge.packages.list();
			}
			catch(error)
			{
				$ot.float.toast({ title: 'Forge', message: error.message, type: 'error' });
			}

			this.loading = false;
			this.Update();
		};

		refresh();

		this.On('forge.packages.create', () => refresh());
		this.On('forge.packages.delete', () => refresh());

		this.slugInput = ({ value }) => this.slug = value.replace(/[^a-zA-Z0-9]/g, '');
		this.nameInput = ({ value }) => this.name = value;
		this.descriptionInput = ({ value }) => this.description = value;

		this.create = async () =>
		{
			if(!this.slug || !this.name || this.saving)
			{
				return;
			}

			this.saving = true;
			this.Update();

			try
			{
				await $ot.forge.packages.create(this.slug, this.name, this.description);

				this.slug = '';
				this.name = '';
				this.description = '';

				$ot.float.toast({ title: 'Forge', message: 'Package registered.' });
			}
			catch(error)
			{
				$ot.float.toast({ title: 'Forge', message: error.message, type: 'error' });
			}

			this.saving = false;
			this.Update();
		};

		this.remove = async (event, item) =>
		{
			event.stopPropagation();

			try
			{
				await $ot.forge.packages.delete(item.id);

				$ot.float.toast({ title: 'Forge', message: item.name + ' removed.' });
			}
			catch(error)
			{
				$ot.float.toast({ title: 'Forge', message: error.message, type: 'error' });
			}
		};

		this.open = (item) =>
		{
			$ot.ui.screens.open('forge.package', { id: item.id });
		};

		return /* html */ `
			<div class="box ot-scrollbar">
				<div class="ot-container-m">
					<e-global-heading title="Forge" description="Packages registered for development. Open one to talk to Forge and watch it work."></e-global-heading>

					<div class="form">
						<e-form-input :value="slug" placeholder="Slug, letters and numbers only" :_input="slugInput"></e-form-input>
						<e-form-input :value="name" placeholder="Name" :_input="nameInput"></e-form-input>
						<e-form-input :value="description" placeholder="Description" :_input="descriptionInput"></e-form-input>
						<e-form-button icon="add" text="Register" :disabled="!slug || !name || saving" :_click="() => create()"></e-form-button>
					</div>

					<e-status-empty
						ot-if="!loading && !packages.length"
						icon="construction"
						title="No packages yet"
						description="Register the first package above to start developing it through Forge."
					></e-status-empty>

					<div ot-if="packages.length" class="list">
						<div ot-for="item in packages" :ot-key="item.id" class="row" ot-click="() => open(item)">
							<div class="tile"><i>construction</i></div>
							<span class="text">
								<span class="name">{{ item.name }}</span>
								<span class="hint">{{ item.slug }}{{ item.description ? ' · ' + item.description : '' }}</span>
							</span>
							<button class="remove" ot-tooltip="Remove" ot-click="(event) => remove(event, item)"><i>delete</i></button>
						</div>
					</div>
				</div>
			</div>
		`;
	}
});
