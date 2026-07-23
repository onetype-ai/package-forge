onetype.AddonReady('admin.screens', (screens) =>
{
    screens.Item({
        id: 'forge.package',
        route: '/forge/:id',
        app: 'forge',
        metadata: { addon: 'forge' },
        data: function()
        {
            return { forgePackage: this.id };
        }
    });
});
