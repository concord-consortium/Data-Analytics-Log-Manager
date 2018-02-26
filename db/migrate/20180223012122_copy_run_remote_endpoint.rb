class CopyRunRemoteEndpoint < ActiveRecord::Migration
  disable_ddl_transaction!
  
  def change
    reversible do |dir|
      dir.up do
        # this takes a long time I'm not sure how how long though
        # it is less than 3 hours though
        Log.where("extras ? 'run_remote_endpoint'").update_all("run_remote_endpoint = extras -> 'run_remote_endpoint'")
      end
    end
  end
end
