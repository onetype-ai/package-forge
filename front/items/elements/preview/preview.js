elements.ItemAdd({
	id: 'forge-preview',
	icon: 'web',
	name: 'Forge Preview',
	description: 'Live preview of the instance being developed, in an iframe with a small address bar.',
	category: 'Forge',
	metadata: { addon: 'forge' },
	config: {
		url: {
			type: 'string',
			value: 'http://localhost:3000/forge/start',
			description: 'URL of the instance to preview.'
		}
	},
	render: function()
	{
		this.address = this.url;
		this.loading = true;
		this.frame = this.url;

		this.input = ({ value }) =>
		{
			this.address = value;
		};

		this.go = () =>
		{
			const value = this.address.trim();

			if(!value)
			{
				return;
			}

			this.loading = true;
			this.frame = value.includes('://') ? value : 'https://' + value;
		};

		this.key = ({ event }) =>
		{
			if(event.key === 'Enter')
			{
				this.go();
			}
		};

		this.refresh = () =>
		{
			this.loading = true;
			this.frame = this.frame + '';
			this.Update();

			requestAnimationFrame(() =>
			{
				const frame = this.Element && this.Element.querySelector('iframe');

				frame && frame.contentWindow && frame.contentWindow.location.reload();
			});
		};

		this.open = () =>
		{
			window.open(this.frame, '_blank');
		};

		this.loaded = () =>
		{
			this.loading = false;
		};

		this.Compute(() =>
		{
			requestAnimationFrame(() =>
			{
				const iframe = this.Element && this.Element.querySelector('iframe');

				iframe && (iframe.onload = this.loaded);
			});
		});

		return `
			<div class="box">
				<div class="bar">
					<div class="dot" :class="loading ? 'busy' : 'ready'"></div>
					<input class="address" :value="address" spellcheck="false" ot-input="input" ot-keydown="key">
					<button class="action" ot-tooltip="Reload" ot-click="refresh"><i>refresh</i></button>
					<button class="action" ot-tooltip="Open in new tab" ot-click="open"><i>open_in_new</i></button>
				</div>
				<div class="frame">
					<iframe :src="frame"></iframe>
				</div>
			</div>
		`;
	}
});
