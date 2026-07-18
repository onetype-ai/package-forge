import onetype from '@onetype/framework';

onetype.AddonReady('forge', (forge) =>
{
	forge.packages = onetype.Addon('forge.packages', (addon) =>
	{
		addon.Table('forge_packages');

		addon.Field('id', {
			type: 'string',
			description: 'Unique row id, a bigint the database returns as a string.'
		});

		addon.Field('slug', {
			type: 'string',
			required: true,
			description: 'Unique identifier for the package being developed. Letters and numbers only, no dashes, slashes or other characters.'
		});

		addon.Field('name', {
			type: 'string',
			required: true,
			description: 'Human readable name shown in the UI.'
		});

		addon.Field('description', {
			type: 'string',
			description: 'One line about what this package is.'
		});

		addon.Field('updated_at', {
			type: 'string',
			description: 'Timestamp of the last change.'
		});

		addon.Field('created_at', {
			type: 'string',
			description: 'Timestamp of when the package was registered.'
		});

		addon.Schema('id bigserial primary key');
		addon.Schema('slug varchar(255) not null');
		addon.Schema('name varchar(255) not null');
		addon.Schema('description text');
		addon.Schema('updated_at timestamptz not null default now()');
		addon.Schema('created_at timestamptz not null default now()');
		addon.Schema('unique (slug)');

		addon.Expose({
			filter: ['id', 'slug', 'created_at'],
			sort: ['id', 'name', 'created_at'],
			select: ['id', 'slug', 'name', 'description', 'created_at'],
			find: function()
			{
				return this.http && this.http.state.user ? true : 'Sign in to view packages.';
			}
		});
	});
});
