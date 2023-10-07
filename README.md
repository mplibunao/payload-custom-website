# TODO

## Reduce json size

- remove none color
- remove none padding
- remove none overlap
- remove none ctagrid.actions.icon
- undefined should be enough
- don't forget to change the seed data to remove the value as well

## SEO

- Use seo plugin to be able to derive title and description from specific fields
- Make description optional

## Error pages

- Add error pages

## Studies

- Rename to case studies
- Move main case studies page to use pages
- Add `case-studies` in links relation so we can link from main case studies page to `case-studies/$slug`
- Refactor SiteLink to include new relations

## Google analytics

- Use homu as reference
- Look into preconnect link

## Sitemap and robots.txt

- See epic stack for implementation


# Add cspotsourcemap


# Preload css and preconnect (we don't have any) using early hints

- [github remix run remix discussions](https://github.com/remix-run/remix/discussions/5378)
- defer this as it might get implemented in remix

# Visual regression testing

- [playwright docs test snapshots](https://playwright.dev/docs/test-snapshots)

# Client hints

- Using kent dodds approach
- See if you can prevent reload
- defer as library might get published

# Hono

- Use timing middleware in addition to our custom utils


# Cloudflare

## Page Rule

- Cache Everything (tf) allows cloudflare to cache html using cache-control headers. Probably `url/*` is good enough as we let the origin server decide whether to cache

# Streaming

## Header

- Separate socialMedia and megaMenu components so we can suspend them
- Pass as children is easier (check rerenders)
	- Pass `MegaMenuDialog` tree
- Or move out `DialogPrimitive.Root` outside and render the jsx inline
	- Might actually be worse for rerenders since state changes causes whole root to rerender
	- Plus more messy
- 
