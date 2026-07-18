onetype.AddonReady('forge', (forge) =>
{
	forge.packages = onetype.Addon('forge.packages', (addon) =>
	{
		addon.Field('id', {
			type: 'string',
			required: true,
			description: 'Unique row id.'
		});

		addon.Field('slug', {
			type: 'string',
			required: true,
			description: 'Unique identifier, letters and numbers only.'
		});

		addon.Field('name', {
			type: 'string',
			required: true,
			description: 'Human readable name.'
		});

		addon.Field('description', {
			type: 'string',
			description: 'One line about what this package is.'
		});
	});
});
