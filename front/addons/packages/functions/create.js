forge.packages.Fn('create', async function(slug, name, description)
{
	const { data, message, code } = await $ot.command('forge:packages:create', { slug, name, description }, true);

	if(code !== 200)
	{
		throw onetype.Error(code, message);
	}

	onetype.Emit('forge.packages.create', { id: data.id });

	return data;
});
