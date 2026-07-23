forge.packages.Fn('delete', async function(id)
{
    const { data, message, code } = await $ot.command('forge:packages:delete', { id }, true);

    if(code !== 200)
    {
        throw onetype.Error(code, message);
    }

    this.ItemRemove(id, false);

    onetype.emitters.fire('forge.packages.delete', { id });

    return data;
});
