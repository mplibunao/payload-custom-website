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
