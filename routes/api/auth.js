const express = require('express');
const validateBody = require('../../middlewares/validateBody');
const authenticate = require('../../middlewares/authenticate');
const ctrlWrapper = require('../../helpers/ctrlWrapper');
const { schemas } = require('../../models/user');
const ctrl = require('../../controllers/auth');
const router = express.Router();

router.post(
    '/register',
    validateBody(schemas.registerSchema),
    ctrlWrapper(ctrl.register)
);

router.post(
    '/login',
    validateBody(schemas.loginSchema),
    ctrlWrapper(ctrl.login)
);

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));

router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));

router.patch(
    '/users/:id/subscription',
    authenticate,
    validateBody(schemas.subscriptionSchema),
    ctrlWrapper(ctrl.subscription)
);

module.exports = router;
