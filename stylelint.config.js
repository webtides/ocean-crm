module.exports = {
	extends: ['stylelint-prettier/recommended'],
	rules: {
		'prettier/prettier': true,
	},
	// overrides: [
	// 	{
	// 		files: ['*.md', '**/*.md'],
	// 		customSyntax: false,
	// 	},
	// ],
	ignoreFiles: ['**/*.md'],
};
