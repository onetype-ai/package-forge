onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'forge-packages',
		isActive: true,
		screen: ['forge'],
		zone: 'root',
		slot: 'center',
		render: function()
		{
			return `<e-forge-packages></e-forge-packages>`;
		}
	});
});
