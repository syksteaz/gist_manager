class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, omniauth_providers: [:github]



  def self.find_for_github_oauth(auth)
      where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
        user.provider = auth.provider
        user.uid = auth.uid
        user.email = auth.info.email
        user.picture = auth.info.image
        user.password = Devise.friendly_token[0,20]  # Fake password for validation
        user.username = auth.info.nickname
        user.name = auth.info.name
        user.github = auth.info.urls.GitHub
        user.token = auth.credentials.token
      end
  end

end
