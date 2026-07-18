import commands from '@onetype/framework/commands';
import forge from '#forge/addon.js';

commands.Item({
	id: 'forge:packages:delete',
	exposed: true,
	method: 'POST',
	endpoint: '/api/forge/packages/delete',
	description: 'Removes a package from the list Forge can work on.',
	metadata: { addon: 'forge.packages' },
	condition: function()
	{
		if(!this.http || !this.http.state.user)
		{
			return 'Sign in to remove a package.';
		}
	},
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'Id of the package to remove.'
		}
	},
	out: {
		success: {
			type: 'boolean',
			description: 'Whether the package was removed.'
		}
	},
	callback: async function(properties, resolve)
	{
		const item = await forge.packages.Find().filter('id', properties.id).one();

		if(!item)
		{
			return resolve(null, 'Package not found.', 404);
		}

		await item.Delete();

		resolve({ success: true }, 'Package removed.');
	}
});
