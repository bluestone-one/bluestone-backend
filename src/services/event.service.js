/*
 * @Author: sansx
 * @Date: 2024-03-22 22:47:52
 * @LastEditors: sansx
 * @LastEditTime: 2024-04-08 19:15:27
 */

const httpStatus = require('http-status');
// const { isAddress } = require('ethers');
const { Event } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a event
 * @param {Object} userBody
 * @returns {Promise<eventBody>}
 */
const createEvent = async (eventBody) => {
  return Event.create(eventBody);
};

/**
 * @description: getEventById
 * @param {*} id
 * @return {*}
 */
const getEventById = async (id) => {
  return Event.findById(id);
};

/**
 * @description: getEvents
 * @param {*} id
 * @return {*}
 */
const getEvents = async () => {
  return Event.find().sort({ _id: -1 }).limit(10);
};

/**
 * @description: getEventsByCreatorId
 * @param {*} creatorId
 * @return {*}
 */
const getEventsByCreatorId = async (creatorId) => {
  return Event.find({ creator: creatorId });
};

/**
 * @description: updateEventById
 * @param {*} eventId
 * @param {*} updateBody
 * @return {*}
 */
const updateEventById = async (eventId, updateBody) => {
  const event = await getEventById(eventId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }

  Object.assign(event, updateBody);
  await event.save();
  return event;
};

module.exports = {
  createEvent,
  getEventById,
  getEventsByCreatorId,
  updateEventById,
  getEvents,
};
