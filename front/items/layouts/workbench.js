onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'forge-workbench',
		isActive: true,
		screen: ['forge'],
		zone: 'root',
		slot: 'center',
		render: function()
		{
			return `<e-forge-workbench></e-forge-workbench>`;
		}
	});
});
