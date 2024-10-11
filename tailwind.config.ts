import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            width: {
                "main": "var(--width-main)"
            },
            height: {
                "header": "var(--height-header)",
                "torso": "var(--height-torso)"
            },
            colors: {
                "color-1": "var(--color-1)",
                "color-2": "var(--color-2)",
                "color-3": "var(--color-3)",
                "color-4": "var(--color-4)",
                "accent": "var(--color-accent)",
                "danger": "var(--color-danger)",
                "warn": "var(--color-warn)",
                "safe": "var(--color-safe)",
                "glass": "var(--color-glass)"
            },
            lineHeight: {
                "fit": "var(--line-height-fit)"
            },
            borderRadius: {
                "default": "var(--border-radius-default)"
            }
        }
    },
    plugins: []
};
export default config;
