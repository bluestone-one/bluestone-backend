const express = require('express');
const { generateNonce, SiweMessage } = require('siwe');
const httpStatus = require('http-status');
const { userService, tokenService } = require('../../services');

const router = express.Router();

// router
//   .route('/')
//   .post(auth('manageUsers'), validate(userValidation.createUser), userController.createUser)
//   .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);

// router
//   .route('/:userId')
//   .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
//   .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
//   .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

router.get('/nonce', function (_, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.send(generateNonce());
});

router.post('/verify', async function (req, res) {
  const { message, signature } = req.body;
  const siweMessage = new SiweMessage(message);
  await siweMessage.verify({ signature });
  let user = await userService.getUserByWalletAddress(message?.address);
  try {
    if (!user) {
      user = await userService.createUserByAddress(message?.address);
    }
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
    // res.send(true);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
