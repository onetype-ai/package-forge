onetype.AddonReady('admin.screens', (screens) =>
{
    screens.Item({
        id: 'forge',
        route: '/forge',
        app: 'forge',
        isDefault: true,
        metadata: { addon: 'forge' }
    });
});
