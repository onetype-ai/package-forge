onetype.AddonReady('onetype.emitters', function(emitters)
{
    emitters.ItemAdd({
        id: 'forge.packages.delete',
        description: 'Fires after a package is removed.',
        metadata: { addon: 'forge.packages' },
        config: {
            id: {
                type: 'string',
                description: 'Id of the removed package.'
            }
        }
    });
});
