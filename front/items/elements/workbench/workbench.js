elements.ItemAdd({
	id: 'forge-workbench',
	icon: 'construction',
	name: 'Forge Workbench',
	description: 'The Forge screen: Orah-Forge chat on the left, the live remote instance in an iframe on the right.',
	category: 'Forge',
	metadata: { addon: 'forge' },
	config: {
		id: {
			type: 'string',
			description: 'Id of the package being developed in this workbench.'
		}
	},
	render: function()
	{
		if(onetype.iframe)
		{
			return `
				<div class="blocked">
					<div class="ot-container-s">
						<e-status-error
							icon="web_asset_off"
							title="Forge is not available inside a preview"
							description="This screen loads the instance in an iframe, so opening it from inside one would nest forever. Open Forge in the top level window instead."
							action=""
						></e-status-error>
					</div>
				</div>
			`;
		}

		return `
			<div class="box">
				<div class="chat">
					<e-orah-chat background="1" agent="forge" name="Forge"></e-orah-chat>
				</div>
				<e-forge-preview></e-forge-preview>
			</div>
		`;
	}
});
