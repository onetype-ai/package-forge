onetype.AddonReady('ui.screens', (screens) =>
{
	screens.Item({
		id: 'forge',
		route: '/forge',
		app: 'forge',
		isDefault: true,
		metadata: { addon: 'forge' }
	});
});
