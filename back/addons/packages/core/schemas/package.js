import onetype from '@onetype/framework';

onetype.DataSchema('forge.package', {
	id: {
		type: 'string',
		description: 'Package id.'
	},
	slug: {
		type: 'string',
		description: 'Unique identifier, letters and numbers only.'
	},
	name: {
		type: 'string',
		description: 'Human readable name.'
	},
	description: {
		type: 'string',
		description: 'One line about what this package is.'
	},
	updated_at: {
		type: 'string',
		description: 'Timestamp of the last change.'
	},
	created_at: {
		type: 'string',
		description: 'Timestamp of when the package was registered.'
	}
});
