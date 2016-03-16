module ApplicationHelper
  def html_mark(text)
    renderer = Redcarpet::Render::HTML.new(render_options = {safe_links_only: true, hard_wrap: true, no_styles: true, no_images: true, filter_html: true})
    markdown = Redcarpet::Markdown.new(renderer, autolink: true, tables: true)
    markdown.render(text.force_encoding("UTF-8")).html_safe
  end
end
