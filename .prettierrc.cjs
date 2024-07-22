module.exports = {
	singleQuote: false,
	jsxSingleQuote: false,
	printWidth: 120,
	semi: true,
	trailingComma: "none",
	plugins: ["prettier-plugin-sh", "prettier-plugin-toml"],
	overrides: [
		{
			files: "*.code-workspace",
			options: {
				parser: "json"
			}
		}
	]
};
