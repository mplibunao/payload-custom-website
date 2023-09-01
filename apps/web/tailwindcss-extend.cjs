const handler = (api) => {
	api.addBase({"*":{"@apply border-border":true},"html":{"@apply scroll-smooth bg-antique text-lg leading-5 text-gray mix-blend-normal selection:bg-red selection:text-white md:text-sm":true,"textRendering":"optimizeLegibility","fontSynthesis":"none"},"a":{"WebkitTapHighlightColor":"transparent"},"h1":{"@apply h1":true},"h2":{"@apply h2":true},"h3":{"@apply h3":true},"h4":{"@apply h4":true},"h5":{"@apply h5":true},"p":{"@apply p":true},"blockquote":{"@apply blockquote":true},"ol":{"padding":"0 0 0 1.1111111111111112rem","margin":"0 0 1.1111111111111112rem 0"},"ul":{"padding":"0 0 0 1.1111111111111112rem","margin":"0 0 1.1111111111111112rem 0"},"li":{"@apply leading-[2.077777777777778rem] tracking-[0.5px] md:text-lg":true},"code":{"@apply relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold":true},":root":{"--font-sans":"Lausanne, Lausanne Fallback","--antique":"32 100% 98%","--white":"0 0% 100%","--gray":"0 0% 9%","--light-gray":"0 0% 16.86%","--highlight-gray":"0 0% 20.78%","--red":"2 100% 59%","--blue":"187 43% 73%","--yellow":"54 100% 68%","--orange":"36, 97%, 64%","--background":"0 0% 100%","--foreground":"0 0% 3.9%","--card":"0 0% 100%","--card-foreground":"0 0% 3.9%","--popover":"0 0% 100%","--popover-foreground":"0 0% 3.9%","--primary":"0 0% 9%","--primary-foreground":"0 0% 98%","--secondary":"0 0% 96.1%","--secondary-foreground":"0 0% 9%","--muted":"0 0% 96.1%","--muted-foreground":"0 0% 45.1%","--accent":"0 0% 96.1%","--accent-foreground":"0 0% 9%","--destructive":"0 84.2% 60.2%","--destructive-foreground":"0 0% 98%","--border":"0 0% 89.8%","--input":"0 0% 89.8%","--ring":"0 0% 3.9%","--radius":"0.5rem"},".dark":{"--background":"0 0% 3.9%","--foreground":"0 0% 98%","--card":"0 0% 3.9%","--card-foreground":"0 0% 98%","--popover":"0 0% 3.9%","--popover-foreground":"0 0% 98%","--primary":"0 0% 98%","--primary-foreground":"0 0% 9%","--secondary":"0 0% 14.9%","--secondary-foreground":"0 0% 98%","--muted":"0 0% 14.9%","--muted-foreground":"0 0% 63.9%","--accent":"0 0% 14.9%","--accent-foreground":"0 0% 98%","--destructive":"0 62.8% 30.6%","--destructive-foreground":"0 0% 98%","--border":"0 0% 14.9%","--input":"0 0% 14.9%","--ring":"0 0% 83.1%"}});
		api.addComponents({".h1":{"@apply mx-0 mb-[2.2222222222222223rem] mt-0 text-5xl/[4.155555555555556rem] font-normal md:text-[5.75rem]/[4.722222222222222rem] xl:text-[6.25rem]/[5.555555555555555rem]":true},".h2":{"@apply mx-0 my-[2.2222222222222223rem] text-[2.5rem]/[3.388888888888889rem] font-normal md:text-7xl/[4.166666666666667rem] xl:text-8xl/[5.555555555555555rem]":true},".h3":{"@apply mx-0 mb-[1.6666666666666667rem] mt-[2.2222222222222223rem] text-4xl/[2.9555555555555557rem] font-normal md:text-6xl/[3.7rem] xl:text-7xl/[4.444444444444445rem]":true},".h4":{"@apply mx-0 mb-[1.1111111111111112rem] mt-[1.6666666666666667rem] text-3xl/[2.966666666666667rem] font-normal md:text-5xl/[2.9444444444444446rem]":true},".h5":{"@apply mx-0 mb-[0.5555555555555556rem] mt-[1.1111111111111112rem] text-2xl/[2.6666666666666665rem] font-normal md:text-[2rem]/[2.5rem]":true},".p":{"@apply leading-[2.077777777777778rem] tracking-[0.5px] md:text-lg":true},".large":{"@apply mx-0 my-[0.5555555555555556rem] text-2xl leading-[2.066666666666667rem] md:leading-[2.5rem]":true},".label":{"@apply text-base uppercase leading-[2.6666666666666665rem] tracking-[2.5px]":true},".blockquote":{"@apply mt-6 border-l-2 pl-6 italic":true},".lead":{"@apply text-xl text-muted-foreground":true},".small":{"@apply text-sm font-medium leading-none":true},".muted":{"@apply text-sm text-muted-foreground":true},".disabled":{"@apply cursor-not-allowed border-neutral-200 bg-neutral-50 text-neutral-500 opacity-60":true},".pointer-events-all":{"pointerEvents":"all"},".pt-header":{"@apply pt-[6.5rem] md:pt-[8.5rem]":true},".rotating-text":{"@apply absolute bottom-0 left-0 right-0 top-0 h-full w-full animate-spin text-antique transition-opacity duration-300 ease-linear":true,"animationDuration":"20s"},".arrow-animate":{"transform":"rotate(-45deg) translate3d(25%, 0, 0)"},".red-underline":{"backgroundSize":"300px 6px"},".red-underline-in":{"transition":"background-position 600ms 600ms cubic-bezier(0.4, 0, 0.2, 1),\n\t\t\tcolor 600ms cubic-bezier(0.4, 0, 0.2, 1)"},".red-underline-out":{"transition":"background-position 600ms cubic-bezier(0.4, 0, 0.2, 1),\n\t\t\tcolor 300ms 100ms cubic-bezier(0.4, 0, 0.2, 1)"}});
};

const config = {};

module.exports = {
	handler,
	config,
};