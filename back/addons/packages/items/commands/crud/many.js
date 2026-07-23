import commands from 'addon-commands';
import forge from '#forge/addon.js';

commands.Item({
    id: 'forge:packages:many',
    exposed: true,
    method: 'GET',
    endpoint: '/api/forge/packages',
    description: 'Lists every package registered for development through Forge.',
    metadata: { addon: 'forge.packages' },
    condition: function()
    {
        if(!this.http || !this.http.state.user)
        {
            return 'Sign in to view packages.';
        }
    },
    out: {
        packages: {
            type: 'array',
            each: {
                type: 'object',
                config: 'forge.package'
            },
            description: 'The registered packages, newest first.'
        }
    },
    callback: async function(properties, resolve)
    {
        const items = await forge.packages.Find().sort('id', 'desc').limit(100).many();
        const packages = items.map((item) => item.GetData());

        items.forEach((item) => forge.packages.ItemRemove(item.Get('id'), false));

        resolve({ packages });
    }
});
