commands.Item({
	id: 'forge:packages:create',
	description: 'Registers a package being developed through Forge.',
	metadata: { addon: 'forge.packages' },
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
		resolve(await forge.packages.Fn('create', properties.slug, properties.name, properties.description), 'Package registered.');
	}
});
