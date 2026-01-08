module.exports = function (eleventyConfig) {
  // Copy CSS to output
  eleventyConfig.addPassthroughCopy("src/css");

  // Copy your whitepaper markdown
  eleventyConfig.addPassthroughCopy("src/GPCS-White-Paper.md");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
  };
};
