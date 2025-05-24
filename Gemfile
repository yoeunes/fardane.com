# To install or upgrade the gems in this Gemfile, run: bundle install or bundle update
source "https://rubygems.org"

# Jekyll and GitHub Pages
gem "github-pages", group: :jekyll_plugins

# Jekyll Plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-sitemap", "~> 1.4"
  gem "jekyll-archives", "~> 2.2.1"
end

# Platform-specific dependencies for Windows and JRuby
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
  gem "wdm", "~> 0.1"
  gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
end

# Gems for development or external data fetching (outside :jekyll_plugins)
gem "webrick", "~> 1.9"

gem "faraday-retry", "~> 2.2"
