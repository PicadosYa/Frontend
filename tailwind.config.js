/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
    	extend: {
    		fontFamily: {
    			exo: ['Exo', 'sans-serif']
    		},
    		colors: {
    			'orange-light': '#FF6341',
    			'orange-dark': '#ED3C16',
    			'white': '#ffffff',
    			'whatsapp': '#25D366',
    			'facebook': '#4267B2',
    			'twitter': '#1DA1F2',
    			'main-blue': '#1A39D2',
    			'dark-blue': '#111F65',
    			'main-blue-opacity': '#1A39D285',
    			'dark-blue-opacity': '#111F6585',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		backgroundImage: {
    			'custom-gradient': 'linear-gradient(90deg, #ff0000, #ff7f00, #00ff00, #0000ff)'
    		},
    		keyframes: {
    			scroll: {
    				'0%': {
    					transform: 'translateX(-100%)'
    				},
    				'100%': {
    					transform: 'translateX(0)'
    				}
    			}
    		},
    		animation: {
    			'scroll-slow': 'scroll 56s linear infinite'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },
    plugins: [require("tailwindcss-animate")],
};
