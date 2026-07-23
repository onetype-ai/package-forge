forge.packages.Fn('list', async function()
{
    const { data, message, code } = await $ot.command('forge:packages:many', {}, true);

    if(code !== 200)
    {
        throw onetype.Error(code, message);
    }

    this.ItemsRemove(false);
    this.ItemsAdd(data.packages);

    return data.packages;
});
