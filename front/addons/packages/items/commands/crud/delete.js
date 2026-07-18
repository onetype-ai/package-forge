commands.Item({
	id: 'forge:packages:delete',
	description: 'Removes a package from the list Forge can work on.',
	metadata: { addon: 'forge.packages' },
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
		resolve(await forge.packages.Fn('delete', properties.id), 'Package removed.');
	}
});
