elements.ItemAdd({
	id: 'forge-workbench',
	icon: 'construction',
	name: 'Forge Workbench',
	description: 'The Forge screen: Orah-Forge chat on the left, the live remote instance in an iframe on the right.',
	category: 'Forge',
	metadata: { addon: 'forge' },
	config: {},
	render: function()
	{
		return `
			<div class="box">
				<div class="chat">
					<div class="empty">
						<div class="mark"><i>construction</i></div>
						<span class="lead">Forge is not wired up yet.</span>
						<span class="hint">Orah-Forge and the development team will chat here.</span>
					</div>
				</div>
				<div class="preview">
					<div class="empty">
						<div class="mark"><i>web</i></div>
						<span class="lead">No instance connected.</span>
						<span class="hint">The live remote instance will render here.</span>
					</div>
				</div>
			</div>
		`;
	}
});
