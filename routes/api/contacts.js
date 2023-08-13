const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/contacts/index');
const ctrlWrapper = require('../../helpers/ctrlWrapper');
const validateBody = require('../../middlewares/validateBody');
const addSchema = require('../../schemas/contacts');

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validateBody(addSchema), ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.removeById));

router.put(
    '/:contactId',
    validateBody(addSchema),
    ctrlWrapper(ctrl.updateById)
);

module.exports = router;
