import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
    theme: {
        tokens: {
            fonts: {
                // For headings (h1, h2, h3, etc.)
                heading: { value: `'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif` },
                // For body text and most UI elements
                body: { value: `'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif` },
                // For monospace text (code, numbers)
                mono: { value: `'JetBrains Mono', 'Fira Code', 'Consolas', monospace` },
            },
        },
 
    },
    globalCss: {
        html: {
            colorPalette: "teal",
        }
    }
})

export const system = createSystem(defaultConfig, config)