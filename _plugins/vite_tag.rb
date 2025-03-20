require 'json'

module Jekyll
  class ViteTag < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @text = text.strip
    end

    def render(context)
      # In development mode
      if Jekyll.env == 'development'
        return "http://localhost:5173#{@text}"
      end

      # In production mode
      manifest_path = File.join(context.registers[:site].source, "assets", "dist", ".vite", "manifest.json")

      if File.exist?(manifest_path)
        manifest = JSON.parse(File.read(manifest_path))

        # Remove leading slash and /assets/ prefix if present
        asset_key = @text.sub(/^\//, '').sub(/^assets\//, '')

        if manifest.key?(asset_key)
          entry = manifest[asset_key]

          # Get base url
          baseurl = context.registers[:site].config["baseurl"] || ""

          # Handle JS
          if entry["file"].end_with?('.js')
            return "#{baseurl}/assets/dist/#{entry["file"]}"
          end

          # Handle CSS imported in JS
          if entry["css"] && !entry["css"].empty?
            css_paths = entry["css"].map { |css| "#{baseurl}/assets/dist/#{css}" }
            return css_paths.first if @text.end_with?('.css')
          end

          # Return JS by default
          return "#{baseurl}/assets/dist/#{entry["file"]}"
        end
      end

      # Fallback
      "#{@text}"
    end
  end
end

Liquid::Template.register_tag('vite', Jekyll::ViteTag)
