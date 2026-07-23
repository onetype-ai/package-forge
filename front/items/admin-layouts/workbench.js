onetype.AddonReady('admin.layouts', (layouts) =>
{
    layouts.Item({
        id: 'forge.workbench',
        isActive: true,
        screen: ['forge.package'],
        zone: 'root',
        slot: 'center',
        render: function()
        {
            return '<e-forge-workbench :id="forgePackage"></e-forge-workbench>';
        }
    });
});
