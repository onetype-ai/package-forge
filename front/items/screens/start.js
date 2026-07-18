onetype.AddonReady('ui.screens', (screens) =>
{
	screens.Item({
		id: 'forge.start',
		route: '/forge/start',
		app: 'forge',
		metadata: { addon: 'forge' }
	});
});
