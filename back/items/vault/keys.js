onetype.AddonReady('vault.categories', (categories) =>
{
	categories.Item({
		id: 'forge',
		name: 'Forge',
		description: 'Token the development agent on your machine authenticates the gRPC connection with.',
		icon: 'construction',
		order: 5
	});
});

onetype.AddonReady('vault.keys', (keys) =>
{
	keys.Item({
		key: 'FORGE_SECRET',
		name: 'Forge Token',
		description: 'Shared secret the Forge agent on your machine presents when it connects. Fill in a long random value before running the agent.',
		category: 'forge',
		group: 'Forge',
		secret: true
	});
});
