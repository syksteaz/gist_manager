class AddColumnsGithubToUsers < ActiveRecord::Migration
  def change
    add_column :users, :name, :string
    add_column :users, :github, :string
    add_column :users, :picture, :string
  end
end
