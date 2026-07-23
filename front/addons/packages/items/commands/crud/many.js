commands.Item({
    id: 'forge:packages:many',
    description: 'Lists every package registered for development through Forge.',
    metadata: { addon: 'forge.packages' },
    out: {
        packages: {
            type: 'array',
            each: {
                type: 'object'
            },
            description: 'The registered packages, newest first.'
        }
    },
    callback: async function(properties, resolve)
    {
        resolve({ packages: await forge.packages.Fn('list') });
    }
});
