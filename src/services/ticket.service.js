/*
 * @Author: sansx
 * @Date: 2024-03-22 22:47:52
 * @LastEditors: sansx
 * @LastEditTime: 2024-04-05 18:31:19
 */

const httpStatus = require('http-status');
// const { isAddress } = require('ethers');
const { Ticket } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a ticket
 * @param {Object} userBody
 * @returns {Promise<ticketBody>}
 */
const createTicket = async (ticketBody) => {
  return Ticket.create(ticketBody);
};

/**
 * @description: getTicketById
 * @param {*} id
 * @return {*}
 */
const getTicketById = async (id) => {
  return Ticket.findById(id);
};

/**
 * @description: getTickets
 * @param {*} id
 * @return {*}
 */
const getTickets = async () => {
  return Ticket.find().sort({ _id: -1 }).limit(10);
};

/**
 * @description: getTicketsByCreatorId
 * @param {*} creatorId
 * @return {*}
 */
const getTicketsByCreatorId = async (creatorId) => {
  return Ticket.find({ creator: creatorId });
};

/**
 * @description: updateTicketById
 * @param {*} ticketId
 * @param {*} updateBody
 * @return {*}
 */
const updateTicketById = async (ticketId, updateBody) => {
  const ticket = await getTicketById(ticketId);
  if (!ticket) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ticket not found');
  }

  Object.assign(ticket, updateBody);
  await ticket.save();
  return ticket;
};

module.exports = {
  createTicket,
  getTicketById,
  getTicketsByCreatorId,
  updateTicketById,
  getTickets,
};
