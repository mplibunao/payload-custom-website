# TODO

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

## See if you can convert switch components to React.lazy

- Can you do nested suspense?

## Imagor

- Switch to img
- Add preload
- Make imagor service a singleton
	- [X] Remove secret and url as constructor params
	- [X] create a function that assigns window/global values to state
	- [X] Store secret and url in script with single char variables
	- [X] Use imagor `HTTP_LOADER_BASE_URL` to set the prefix to our media url so that only our media can be used in imagor

### Web crypto

#### Size

- Full sha512 json `181 bytes`
- Sha512 40 trun `133` bytes
- Full sha215 json `133 bytes` 
- Sha256 40 trunc `133` bytes

#### Perf

sha1 x 71,754 ops/sec ±1.48% (56 runs sampled)
sha256 x 72,314 ops/sec ±0.82% (63 runs sampled)
sha512 x 70,739 ops/sec ±0.47% (64 runs sampled)
