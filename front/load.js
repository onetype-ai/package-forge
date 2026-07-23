$ot.forge = {
    packages: {
        list: () => forge.packages.Fn('list'),
        create: (slug, name, description) => forge.packages.Fn('create', slug, name, description),
        delete: (id) => forge.packages.Fn('delete', id)
    }
};
