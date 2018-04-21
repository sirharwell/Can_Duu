# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180412215211) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bid_requests", force: :cascade do |t|
    t.string "worker_ids"
    t.bigint "job_id"
    t.string "status", default: "awaiting reply"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["job_id"], name: "index_bid_requests_on_job_id"
  end

  create_table "bids", force: :cascade do |t|
    t.integer "price"
    t.string "start_date"
    t.string "end_date"
    t.text "milestones"
    t.text "comments"
    t.string "status"
    t.string "length"
    t.bigint "worker_id"
    t.bigint "job_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["job_id"], name: "index_bids_on_job_id"
    t.index ["worker_id"], name: "index_bids_on_worker_id"
  end

  create_table "jobs", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.boolean "urgent"
    t.boolean "insurance"
    t.boolean "bbb_approved"
    t.string "category"
    t.integer "distance"
    t.integer "rating"
    t.string "photos"
    t.bigint "user_id"
    t.string "status"
    t.boolean "active"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "location"
    t.index ["user_id"], name: "index_jobs_on_user_id"
  end

  create_table "notifications", force: :cascade do |t|
    t.integer "to"
    t.integer "from"
    t.text "message"
    t.text "data"
    t.boolean "viewed"
    t.string "direction"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "image"
    t.string "email"
    t.string "first_name"
    t.string "last_name"
    t.string "username"
    t.string "phone_number"
    t.string "security_question"
    t.string "security_answer"
    t.string "street"
    t.string "zip"
    t.string "city"
    t.string "state"
    t.string "bank_account"
    t.text "favorites"
    t.boolean "worker_profile"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  create_table "workers", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "phone_number"
    t.boolean "insurance"
    t.boolean "bbb_approved"
    t.string "hours"
    t.string "service_area"
    t.string "category"
    t.string "logo"
    t.text "bio"
    t.string "street"
    t.string "zip"
    t.string "city"
    t.string "state"
    t.bigint "user_id"
    t.string "bank_account"
    t.integer "rating"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_workers_on_user_id"
  end

  add_foreign_key "bid_requests", "jobs"
  add_foreign_key "bids", "jobs"
  add_foreign_key "bids", "workers"
  add_foreign_key "jobs", "users"
  add_foreign_key "workers", "users"
end
