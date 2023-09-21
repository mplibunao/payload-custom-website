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

## Fix li, ul, ol styles

- Seems like the default styles adds some padding and margin (even shadcn does this)
- So it's our job to overwrite this for our use-cases
- Unfortunately removed it before


	
### Image preload notes

- with fetchpriority and decoding

Queued at 37.41 ms
Started at 59.55 ms

- without fetchpriority and decoding

Queued at 47.61 ms
Started at 567.27 ms

Queued at 43.39 ms
Started at 84.32 ms

Queued at 30.59 ms
Started at 71.25 ms

- with preload (no fetchpriority and decoding)

Queued at 47.43 ms
Started at 51.76 ms

Queued at 42.08 ms
Started at 46.02 ms

- with preload, fetchpriority and decoding

Queued at 46.42 ms
Started at 50.55 ms

Queued at 30.48 ms
Started at 36.06 ms

Queued at 31.62 ms
Started at 36.70 ms

#### Notes

It seems preloading dynamic hero image still improves LCP by a bit

Even if we use meta which waits for the queries we still preload

However, the bottleneck here is the server/db. If the loader is slow, then adding the preload link becomes slow as well and we might get the benefit of preload

That being said, for slow clients it's still totally worth it

Worst case, we just fallback to highpriority and decode sync
