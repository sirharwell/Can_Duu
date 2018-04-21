require 'test_helper'

class Api::ProfileControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get api_profile_show_url
    assert_response :success
  end

  test "should get update" do
    get api_profile_update_url
    assert_response :success
  end

end
