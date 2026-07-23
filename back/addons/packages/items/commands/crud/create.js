import commands from 'addon-commands';
import forge from '#forge/addon.js';

commands.Item({
    id: 'forge:packages:create',
    exposed: true,
    method: 'POST',
    endpoint: '/api/forge/packages',
    description: 'Registers a package being developed through Forge.',
    metadata: { addon: 'forge.packages' },
    condition: function()
    {
        if(!this.http || !this.http.state.user)
        {
            return 'Sign in to register a package.';
        }
    },
    in: {
        slug: {
            type: 'string',
            required: true,
            description: 'Unique identifier, letters and numbers only.'
        },
        name: {
            type: 'string',
            required: true,
            description: 'Human readable name.'
        },
        description: {
            type: 'string',
            description: 'One line about what this package is.'
        }
    },
    out: {
        id: {
            type: 'string',
            description: 'Id of the created package.'
        }
    },
    callback: async function(properties, resolve)
    {
        if(!forge.packages.Fn('slug', properties.slug))
        {
            return resolve(null, 'Slug :slug: must be letters and numbers only, no dashes or slashes.'.replace(':slug:', properties.slug), 400);
        }

        const existing = await forge.packages.Find().filter('slug', properties.slug).one();

        if(existing)
        {
            return resolve(null, 'Slug :slug: is already taken.'.replace(':slug:', properties.slug), 409);
        }

        const item = forge.packages.Item({
            slug: properties.slug,
            name: properties.name,
            description: properties.description || null
        });

        await item.Create();

        forge.packages.ItemRemove(item.Get('id'), false);

        resolve({ id: item.Get('id') }, 'Package registered.');
    }
});
