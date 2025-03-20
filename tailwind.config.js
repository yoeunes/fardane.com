/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './_includes/**/*.{html,liquid}',
        './_layouts/**/*.{html,liquid}',
        './_pages/**/*.{html,md,liquid}',
        './_posts/**/*.{html,md,liquid}',
        './assets/js/**/*.js',
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
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'wave': 'wave 15s linear infinite',
                'appear': 'appear 0.7s ease-out forwards',
                'slide-up': 'slideUp 0.7s ease-out forwards',
                'slide-right': 'slideRight 0.7s ease-out forwards',
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
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'pattern': "url('/assets/img/patterns/subtle-pattern.png')",
                'islamic-pattern': "url('/assets/img/patterns/islamic-pattern.svg')",
            },
        },
    },
    plugins: [],
}
