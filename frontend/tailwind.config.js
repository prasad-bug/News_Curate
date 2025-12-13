/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
                hindu: {
                    red: '#C9041E',
                    'red-dark': '#A00318',
                    text: '#000000',
                    'text-light': '#333333',
                    'gray-light': '#E5E5E5',
                    'gray-medium': '#999999',
                    'gray-dark': '#666666',
                },
            },
            fontFamily: {
                sans: ['Inter', 'Helvetica Neue', 'Arial', 'system-ui', 'sans-serif'],
                serif: ['Merriweather', 'Georgia', 'Times New Roman', 'serif'],
            },
            letterSpacing: {
                wider: '0.05em',
                widest: '0.1em',
            },
        },
    },
    plugins: [],
}
