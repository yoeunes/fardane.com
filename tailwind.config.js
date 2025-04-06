/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './_site/**/*.{html,js}',
        './_includes/**/*.{html,liquid,js}',
        './_layouts/**/*.{html,liquid,js}',
        './pages/**/*.{html,md,liquid}',
        './_posts/**/*.{html,md,liquid}',
        './_assets/**/*.{js,pcss}',
        // '!./_site/dist/**/*',
        // '!./node_modules/**',
        // '!./dist/**',
    ],
    theme: {
        extend: {
            fontFamily: {
                'kufi': ['Noto Kufi Arabic', 'sans-serif'],
            },
            colors: {
                sand: {
                    50: '#fcf9f1',
                    100: '#f9f2e0',
                    200: '#f3e4c3',
                    300: '#ead09b',
                    400: '#e1b567',
                    500: '#d8994d',
                    600: '#cb7c3e',
                    700: '#a85e33',
                    800: '#864c31',
                    900: '#693e2c',
                    950: '#3a1f16',
                },
                amber: {
                    50: '#fff8eb',
                    100: '#ffebc6',
                    200: '#ffd382',
                    300: '#ffbd4f',
                    400: '#ffa41c',
                    500: '#fa8300',
                    600: '#dd5f00',
                    700: '#b64302',
                    800: '#953807',
                    900: '#7a2f0a',
                    950: '#461500',
                },
                paper: {
                    50: '#ffffff',
                    100: '#fefefe',
                    200: '#f9f8f6',
                    300: '#f4f2ee',
                    400: '#e8e5dc',
                    500: '#dcd8cc',
                    600: '#c2beb2',
                    700: '#a8a395',
                    800: '#8f8a7c',
                    900: '#6c6859',
                },
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'wave': 'wave 15s linear infinite',
                'appear': 'appear 0.7s ease-out forwards',
                'slide-up': 'slideUp 0.7s ease-out forwards',
                'slide-right': 'slideRight 0.7s ease-out forwards',
                'slide-left': 'slideLeft 0.7s ease-out forwards',
                'fade-in': 'fadeIn 1s ease-out forwards',
                'scale-up': 'scaleUp 0.5s ease-out forwards',
                'bounce-soft': 'bounceSoft 2s ease infinite',
                'spin-slow': 'spin 8s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': {transform: 'translateY(0)'},
                    '50%': {transform: 'translateY(-20px)'},
                },
                shimmer: {
                    '100%': {transform: 'translateX(100%)'},
                },
                wave: {
                    '0%': {transform: 'translateX(0)'},
                    '100%': {transform: 'translateX(-100%)'},
                },
                appear: {
                    '0%': {opacity: '0'},
                    '100%': {opacity: '1'},
                },
                slideUp: {
                    '0%': {transform: 'translateY(50px)', opacity: '0'},
                    '100%': {transform: 'translateY(0)', opacity: '1'},
                },
                slideRight: {
                    '0%': {transform: 'translateX(-50px)', opacity: '0'},
                    '100%': {transform: 'translateX(0)', opacity: '1'},
                },
                slideLeft: {
                    '0%': {transform: 'translateX(50px)', opacity: '0'},
                    '100%': {transform: 'translateX(0)', opacity: '1'},
                },
                fadeIn: {
                    '0%': {opacity: '0'},
                    '100%': {opacity: '1'},
                },
                scaleUp: {
                    '0%': {transform: 'scale(0.8)', opacity: '0'},
                    '100%': {transform: 'scale(1)', opacity: '1'},
                },
                bounceSoft: {
                    '0%, 100%': {transform: 'translateY(0)'},
                    '50%': {transform: 'translateY(-10px)'},
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'pattern': "url('/dist/images/patterns/subtle-pattern.png')",
                'islamic-pattern': "url('/dist/images/patterns/islamic-pattern.svg')",
                'paper-texture': "url('/dist/images/textures/paper-texture.png')",
                'sand-texture': "url('/dist/images/textures/sand-texture.png')",
                'arabesque': "url('/dist/images/patterns/arabesque.svg')",
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '100%',
                        color: 'var(--tw-prose-body)',
                        fontFamily: 'var(--font-family)',
                    },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
            transitionDuration: {
                '2000': '2000ms',
                '3000': '3000ms',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
