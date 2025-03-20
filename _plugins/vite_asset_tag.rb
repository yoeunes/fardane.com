require 'json'

module Jekyll
  class ViteAssetTag < Liquid::Tag
    def initialize(tag_name, asset_path, liquid_options)
      super
      @asset_path = asset_path.strip
    end

    def render(context)
      site = context.registers[:site]

      if Jekyll.env == 'development'
        # In development, use the Vite dev server
        dev_server = 'http://localhost:5173'
        return "#{dev_server}#{@asset_path}"
      else
        # In production, use the built assets
        manifest_path = File.join(site.source, 'assets', 'dist', '.vite', 'manifest.json')

        if File.exist?(manifest_path)
          manifest = JSON.parse(File.read(manifest_path))
          asset_name = @asset_path.sub(/^\/assets\//, '')

          if manifest[asset_name]
            return "/assets/dist/#{manifest[asset_name]['file']}"
          else
            return @asset_path
          end
        else
          Jekyll.logger.warn "Vite Manifest:", "Could not find manifest file at #{manifest_path}"
          return @asset_path
        end
      end
    end
  end
end

Liquid::Template.register_tag('vite_asset', Jekyll::ViteAssetTag)
