onetype.AddonReady('onetype.emitters', function(emitters)
{
    emitters.ItemAdd({
        id: 'forge.packages.create',
        description: 'Fires after a package is registered for development.',
        metadata: { addon: 'forge.packages' },
        config: {
            id: {
                type: 'string',
                description: 'Id of the created package.'
            }
        }
    });
});
