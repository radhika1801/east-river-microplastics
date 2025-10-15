module.exports = function(eleventyConfig) {
  // Copy assets with proper paths
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/styles": "styles" });
  eleventyConfig.addPassthroughCopy({ "src/scripts": "scripts" });

  // Interactive stat shortcode
  eleventyConfig.addShortcode("interactiveStat", function(number, label, icon = "🔬") {
    return `<div class="stat-container interactive-element" data-hover="button">
      <div class="stat-icon">${icon}</div>
      <span class="stat-number" data-count="${number}">0</span>
      <span class="stat-label">${label}</span>
      <div class="stat-ripple"></div>
    </div>`;
  });

  // create a variable for our dev environment; production = gh-pages, nothing = local by default
  const isProduction = process.env.ELEVENTY_ENV === "production";

  // Global variable for our path prefix, remember to insert your repo name
  eleventyConfig.addGlobalData("pathPrefix", isProduction ? "/east-river-microplastics/" : "/");

  // create a filter for our url prefix 
  eleventyConfig.addFilter("prefixedUrl", (url, prefix) => {
    const finalPrefix = prefix || (isProduction ? "/east-river-microplastics/" : "/");
    return finalPrefix + url.replace(/^\/+/, "");
  });

  // Section wrappers
  eleventyConfig.addPairedShortcode("section", function(content, className = "", id = "") {
    return `<section class="enhanced-section ${className}" ${id ? `id="${id}"` : ''} data-scroll-section>
      ${content}
    </section>`;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "public"
    },
    templateFormats: ["md", "njk", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
