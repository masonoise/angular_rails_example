class ApiController < ApplicationController
  respond_to :json

  def merchants
    merchant_id = params[:id].to_i
    merchants = []
    merchants << {'name' => 'Acme Inc', 'address' => '123 Main Street'}
    merchants << {'name' => 'Yoyodyne Inc', 'address' => '42 Universe Lane'}

    sleep(3)  # In order to demonstrate the "spinner"/search indicator in the page
    if (merchant_id > 0 && merchant_id <= merchants.length)
      respond_with(merchants[merchant_id-1])
    else
      respond_with('Merchant not found', status: :not_found)
    end
  end
end
