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

    if user_signed_in?
      @current_user_gists = []
      api_url = "https://api.github.com/users/#{current_user.username}/gists"
      open(api_url) do |stream|
        @current_user_gists << JSON.parse(stream.read)
      end
      @current_user_gists.flatten!
    end

  end

end
