- [pricingsaas saas pricing models](https://pricingsaas.com/saas-pricing-models.html)
- [reddit r web_design comments x0knh7 subscription_fee_vs_flat_rate](https://www.reddit.com/r/web_design/comments/x0knh7/subscription_fee_vs_flat_rate/)

# No metering

- Infra is expensive and time consuming to build
- Need a lot of requests to gain more profit which for a freelance project probably won't be much

## Monthly Hosting

> This does not include cost for building the website

- $20/month base cost
- Unlimited seats
- Free subdomain
- DIY page management
- Analytics
- Maintenance and security updates
- Lifetime access to new components and features added to our CMS
- Page view usage based pricing:
	- $0.0000640 per page view up to 2.5 million visits 
	- $0.0000420 per page view for 2.5 million visits and above

### Add-ons

- Open AI GPT-3.5 Integration: $10/mo
- Open AI GPT-4 Integration: $20/mo
- Unlimited edits and page management: $100/mo 
- Unlimited edits with A/B testing: $200/mo (if we can implement a hands-off approach)
- SEO, Branding, Marketing campaign: Contact Us
- Personalized Recommendations:
	- Basic:
		- $15 for 10,000 recommendations
		- $1 for every 1000 recommendations after
	- Pro:
		- $60 for 100,000 recommendations
		- $1 for every 2000 recommendations after

#### Notes
		
- Page view: $0.0000320/page view
	- cloudrun x2 price as base price including cloudflare
	- 10 images (should have thick profits here)
	- 10 api requests
- Page view: $0.0000640/page view
	- should give enough profit to cover for other infra 
	- can give discount to big clients up to $.0000320
	- 2678400 (seconds in month) results in $171.4176

### Pitch

- Built on biggest cloud providers like Cloudflare, Google, Amazon, and Microsoft that provide enterprise grade security as well as amazing price to performance ratio due to economies of scale that will benefit business of all sizes
	- Poor security can be a potential source of headache and costs to address but by following industry best practices, you avoid these potential pitfalls and opportunity costs
	- Running our own services and infra on lower level cloud primitives is more difficult and time-consuming but gives us economies of scale which allow us to pass cost saving to users compared to relying Software as a Service companies which becomes exponentially expensive as you scale
- Unparalleled scalability and availability using cutting edge serverless technologies that both scale up thousands of instances to meet demand and down to 0 when no users are using the website or app
- Optimized for e-commerce
	- Lots of studies show that slow websites in e-commerce massively increases bounce rate
		- Optimal load times for peak conversions ranged from 1.8 to 2.7 seconds across device types
		- Just a 100-millisecond delay in load time hurt conversion rates by up to 7% 
		- Optimal load times for lowest bounce rates ranged from 700ms to 1.2s across all device types
		- A two-second delay in load time hurt bounce rates by up to 103% 
		- Pages with the lowest bounce rates had start render times ranging from 0.9 to 1.5 seconds
		- A two-second delay correlated with up to a 51% decrease in session length
		- [s3 amazonaws sofist marketing State+of+Online+Retail+Performance+Spring+2017+ +Akamai+and+SOASTA+2017 pdf](https://s3.amazonaws.com/sofist-marketing/State+of+Online+Retail+Performance+Spring+2017+-+Akamai+and+SOASTA+2017.pdf)
	- Uses qwik city, a next generation framework which is one of the fastest tools for building e-commerce sites and dynamic web applications
	- Runs your code at more than 300 locations across the globe providing the lowest latency possible
	- Our noctus image optimization service increase performance of image heavy sites by optimizing quality, converting to next generation formats like Avif and Webp, and serving the smallest image resolution possible based on the user's device. All that for a portion of the cost of other similar service providers like [cloudinary](https://cloudinary.com/pricing) which start out cheap but get crazy expensize as you scale
- Optimized for Search Engine Optimization (SEO)
	- High core web vitals provide a good baseline for search engine rankings
	- Actual SEO work (marketing campaign, content creation, etc) not included

# Metering more profit

- $5-30/mo for db, devops, portal fee
	- try to get atleast $15-20 base to cover for expenses sufficiently 
- free unlimited DIY edits
- free unlimited DIY creation of new static pages
- usage based pricing. Pay for resources you use
	- Requests: $0.80/million requests or 0.0000008/request
	- Duration: 0.00003/second request duration
	- Shared CMS:
	- Dedicated Website:
		- Requests: $0.0000006/request
		- CPU Usage: $0.00000004/ms of cpu usage
	
# Metering

- Have a metering class or something
- add response time middleware to express that adds duration to headers
	- we only measure duration and requests. But include the cpu and memory in the pricing (markup)
	- this comes out as less than .80/million request which is what I want anyway
- get value from headers in pages then store in class state
- get cloudflare to send it after request
	- if we using postgres, use ~pubsub~ cloud tasks api to queue the writes 
		- [postgresql message id CAKhTGFWrx06KXEzS4K3Z1aCcEsqB3f62pbNdrpyJUOo7QD7k3w%40mail gmail com](https://www.postgresql.org/message-id/CAKhTGFWrx06KXEzS4K3Z1aCcEsqB3f62pbNdrpyJUOo7QD7k3w%40mail.gmail.com)
			- [reddit r devops comments oikwu7 comment h4x5znu utm_source share utm_medium web2x context 3](https://www.reddit.com/r/devops/comments/oikwu7/comment/h4x5znu/?utm_source=share&utm_medium=web2x&context=3)
			- See [../../../../../vimwiki/TIL/postgresql/Writing sql/Database Design.md#Horizontal partitioning: an example](../../../../../vimwiki/TIL/postgresql/Writing sql/Database Design.md#Horizontal partitioning: an example)
			- Then create a task that moves request data into a daily data or move to bigquery
		- mongodb is also an option but kinda prefer relational


- $5-30/mo for db, devops, portal fee
	- try to get atleast $15-20 base to cover for expenses sufficiently 
- free unlimited DIY edits
- free unlimited DIY creation of new static pages
- unlimited number of users
- usage based pricing. Pay for resources you use
	- Shared CMS:
		- Requests: $0.0000004/request
		- Duration: $0.00003/second request duration
	- Dedicated Website:
		- Requests: $0.0000003/request
		- CPU Usage: $0.00000002/ms of cpu usage
	- Dedicated Image Service:
		- Requests: $0.40/million requests
		- CPU: $0.00002400/vCPU-second
		- Memory: $0.00000250/GiB-second
		- Image storage cost depends on how often images are accessed and what devices your users are using (mobile devices, older browsers vs latest browsers)
			- For more info regarding the storage free see [cloud google storage pricing](https://cloud.google.com/storage/pricing)
		- Image caching cost: $0.15/GB
			- This reduces requests, cpu, memory charges to almost nothing so bulk of costs for images goes to this and storage
- Built on biggest cloud providers like Cloudflare, Google, Amazon, and Microsoft that provide enterprise grade security as well as amazing price to performance ratio due to economies of scale
	- And since our pricing is based on the underlying provider, you can benefit from these extremely low prices as well whether you're a small business with a few users per month to a millions of users per month.
- unparalleled performance using cutting edge serverless technologies like:
	- cloudflare workers which run your code at more than 300 locations across the globe [cloudflare network](https://www.cloudflare.com/network/) and allow scaling up to thousands of instances back down to 0 
	- serverless containers which allow our servers to scale up and down to accomodate traffic. Scaling to 0 allows you to only pay for resources you use
	- self-hosted imagor service which reduce the costs of optimizing images compared to outsourcing to companies like [cloudinary pricing](https://cloudinary.com/pricing) which start out cheap but get crazy expensive as you scale
- Optimized for e-commerce
	- [PUT ECOM STATS]
	- Uses qwik city, a next generation framework which is one of the fastest tools for building e-commerce sites
- Optimized for Search Engine Optimization (SEO)
	- High core web vitals provide a good baseline for search engine rankings
	- Actual SEO work (marketing campaign, content creation, etc) not included
- Add-ons:
	- $100/mo for unlimited edits by us
	- Open AI Integration:
		- $10/mo: GPT-3.5 model
		- $20/mo: GPT-4 (open AI's most capable model)
	- SEO, Branding, Marketing campaign
