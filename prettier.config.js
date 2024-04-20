/** @type {import("prettier").Config} */
module.exports = {
    tabWidth: 4,
    useTabs: false,
    plugins: [
        "prettier-plugin-jinja-template",
        "prettier-plugin-tailwindcss"
    ],
    overrides: [
        {
            files: ["*.html"],
            options: {
                parser: "jinja-template",
                htmlWhitespaceSensitivity: "ignore",
                bracketSameLine: true,
            },
        },
    ],
};
