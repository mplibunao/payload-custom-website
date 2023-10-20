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

## Images

- Remove picture element and let auto-avif/webp handle that
- Set quality to 50. Let the jpeg and webp users suffer
- Check in image component if responsive width/height is bigger than original width/height. Don't generate the responsive url if so

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

# Handle nested slugs

- Check out nested docs plugin

# Add cspotsourcemap

- Might not be needed since we're migrating to cf workers


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

- Enable crawler hints when it lands on tf
- Enable cloudflare argo routing $5
- Enable reserve cache around $5

# Streaming

## Caching

- **Note**: Streaming prevents caching
- Prefer loading everything than streaming since it's hard to predict what kind of data the page will need
	- Client can suddenly add price which requires streaming or short cache
	- Better to just rely on current cache config than streaming
	- If we have a really **slow** and **private** query, create a dedicated route using file-based routing to stream it or create a dedicated collection so that user can still edit the slug

- Another option is to create a separate collection for streaming like `PersonalizedPages` but we can't duplicate from one collection to another
	- This is a good approach since authed/private pages are usually the one that benefits from streaming as private cache is not useful
	- **Note**: For simple auth components like `logged in` in navbar, you can just hydrate it as client component and make it fetch so we still get to cache and save on resources
		- You can also stream which might help with core-web vitals but not sure since svelte is fast and with csr, the rest of the page is really fast because of caching even if the nav is slower (have to test)
	- **Warning**: Good idea but hard to execute since we can't know whethere a route is a `Page` or `PersonalizedPage`. We can query both I guess
		- Hard to optimize querying both. Usual problem of not knowing whether to stream, pull from kv or what.

- If we don't use `PersonalizedPages` collection, add an option in `contentType` called `private` so we can still identify whether to cache on cdn

- It's hard to identify whether to cache in redis/kv unlike with cache control headers because with cache-control headers we already have the data
	- What we can do is add an env variable called `ENABLE_KV_CACHING`, this is rough and not granular as even one page with dynamic data will disable caching
	- Or just disable clients creating new page and editing the slug. So we can create dedicated routes will specific caching behaviour for each page

### TLDR

- Disable clients creating new page and editing the slug. So we can create dedicated routes will specific caching behaviour for each page
	- This gives us the control we need for caching while still enabling the clients to update their page
- ContentType:
	- 3 options: `dynamic`, `static`, `personalized`
	- Lock and if possible hide from users
	- Let it determine which options appear. Eg. Lock inventory count and price to `display: false` when `ContentType: static`. This forces clients to need us to change settings and make necessary adjustments on caching
	
## Header

- Separate socialMedia and megaMenu components so we can suspend them
- Pass as children is easier (check rerenders)
	- Pass `MegaMenuDialog` tree
- Or move out `DialogPrimitive.Root` outside and render the jsx inline
	- Might actually be worse for rerenders since state changes causes whole root to rerender
	- Plus more messy
- 


## Invalidated

- store image count in state
	- we only measure requests not duration since we assume reqs to be fast after the first transformation since we store in gcs
	- separate gcs buckets so we can measure storage costs per tenant
	- _means we need separate server like rsc or islands for secret_
	- **on second thought, just deploy separate imagor instances per client since image count is not a good metric to capture due to caching**
		- also you can only set one result storage url per imagor instances so sharing imagor instances will also share the result storage resulting in losing the ability to bill storage granularly
