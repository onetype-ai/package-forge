onetype.AddonReady('admin.layouts', (layouts) =>
{
    layouts.Item({
        id: 'forge.start',
        isActive: true,
        screen: ['forge.start'],
        zone: 'root',
        slot: 'center',
        render: function()
        {
            return `
                <div class="ot-flex-center" style="width: 100%; height: 100%;">
                    <div class="ot-container-s">
                        <e-admin-status-empty
                            icon="psychology"
                            title="Nothing to preview yet"
                            description="Talk to Orah about the package you want to build or change — the moment
                                it starts working, you'll watch it happen right here."
                            background="0"
                        ></e-admin-status-empty>
                    </div>
                </div>
            `;
        }
    });
});
