import forge from '#forge/addon.js';

/* Letters and numbers only — no dashes, slashes or anything else, so the
   slug can double as a folder name and a DB key without escaping. */

forge.packages.Fn('slug', function(slug)
{
	return /^[a-zA-Z0-9]+$/.test(slug || '');
});
