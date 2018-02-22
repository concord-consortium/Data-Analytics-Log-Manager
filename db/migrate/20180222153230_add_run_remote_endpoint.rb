class AddRunRemoteEndpoint < ActiveRecord::Migration
  def change
    add_column :logs, :run_remote_endpoint, :string
    add_index :logs, :run_remote_endpoint
    # need to run a command to migrate data into this new field
    # syntax is 'hstore ? key' to check if it has the key
    reversible do |dir|
      dir.up do
        Log.where("parameters ? run_remote_endpoint").update_all("run_remote_endpoint = parameters -> run_remote_endpoint")
        Log.where("extras ? run_remote_endpoint").update_all("run_remote_endpoint = extras -> run_remote_endpoint")
      end
    end
  end
end
