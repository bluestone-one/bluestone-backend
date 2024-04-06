const mongoose = require('mongoose');
const { toJSONDate } = require('./plugins');
const { ticketTypes } = require('../config/tickets');

// allow_price_range: false
// calendar_api_id: null
// calendar_to_submit_to_api_id: null
// cover_url: "https://cdn.lu.ma/event-defaults/1-1/standard1.png"
// crypto_token_requirements: []
// description_mirror: {type: "doc", content: [{type: "paragraph", content: [{type: "text", text: "12"}]}]}
// duration_interval: "PT1H"
// event_type: "independent"
// font_title: null
// geo_address_json: {type: "manual", address: "asd"}
// geo_address_visibility: "public"
// geo_latitude: null
// geo_longitude: null
// location_type: "offline"
// max_capacity: null
// min_ticket_price_cents: null
// name: "123123"
// one_to_one: true
// require_rsvp_approval: false
// session_price_cents: null
// start_at: "2024-03-22T14:30:00.000Z"
// theme: "legacy"
// theme_meta: null
// ticket_currency: "eur"
// ticket_price_cents: null
// timezone: "Asia/Shanghai"
// tint_color: "#de3163"
// visibility: "public"
// waitlist_enabled: false
// zoom_creation_method: null
// zoom_meeting_id: null
// zoom_meeting_password: null
// zoom_meeting_url: null
// zoom_session_type: null

const ticketSchema = mongoose.Schema(
  {
    creator: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    creatorWalletAddress: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: false,
    },
    endTime: {
      type: Date,
      required: false,
    },
    timezone: {
      type: String,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: [ticketTypes.PRIVATE, ticketTypes.PUBLIC],
      required: true,
    },
    // expires: {
    //   type: Date,
    //   required: true,
    // },
    // blacklisted: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
ticketSchema.plugin(toJSONDate);

/**
 * @typedef Ticket
 */
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
