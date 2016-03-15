require 'json'
require 'open-uri'

class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: :home

  def home
    @gists = []
    api_url = 'https://api.github.com/gists'
    open(api_url) do |stream|
      @gists << JSON.parse(stream.read)
    end
    @gists.flatten!
  end

end
