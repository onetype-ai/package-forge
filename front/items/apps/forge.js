onetype.AddonReady('ui.apps', (apps) =>
{
	apps.Item({
		id: 'forge',
		name: 'Forge',
		icon: 'construction',
		color: 'rgba(251, 146, 60, 1)',
		description: 'The remote development workbench. Chat with a development team of agents that edit a package live while you watch the real instance update.',
		isVisible: false,
		order: 6
	});
});
