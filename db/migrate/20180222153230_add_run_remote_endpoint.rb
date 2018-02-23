class AddRunRemoteEndpoint < ActiveRecord::Migration
  def change
    add_column :logs, :run_remote_endpoint, :string
    # this takes a about 5 minutes to run on the 35 million row log manager database
    # during this time the table will be locked for writes
    add_index :logs, :run_remote_endpoint
  end
end
