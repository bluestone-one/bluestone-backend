const express = require('express');
const httpStatus = require('http-status');
const { isAddress } = require('ethers');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');

const auth = require('../../middlewares/auth');

const { eventService, userService } = require('../../services');

const router = express.Router();

router.get('/all', async function (_, res) {
  console.log('resres', await eventService.getEvents());

  res.status(httpStatus.OK).send(await eventService.getEvents());
});

router.route('/:eventId').get(async function (req, res) {
  if (req?.params?.eventId === undefined) throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  res.status(httpStatus.OK).send(await eventService.getEventById(req.params.eventId));
});
// .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
// .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

router.post(
  '/create',
  auth(),
  catchAsync(async function (req, res) {
    if (!isAddress(req.body.creatorWalletAddress)) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    const user = await userService.getUserByWalletAddress(req.body.creatorWalletAddress);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

    console.log('user', user);

    const ticket = await eventService.createEvent({ ...req.body, creator: user._id });

    res.status(httpStatus.CREATED).send(ticket);
  })
);

router.post(
  '/update',
  auth(),
  catchAsync(async function (req, res) {
    if (!isAddress(req.body.creatorWalletAddress)) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

    if (!(await userService.getUserByWalletAddress(req.body.creatorWalletAddress)))
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

    if (!req.query.id) throw new ApiError(httpStatus.NOT_FOUND, 'ticket not found');

    const ticket = await eventService.updateEventById(req.query.id, req.body);

    res.status(httpStatus.CREATED).send(ticket);
  })
);

// router.post('/send-verification-email', auth(), () => {});

module.exports = router;
