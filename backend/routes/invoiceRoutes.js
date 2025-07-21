const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

// POST: Generate invoice
router.post('/generate', invoiceController.generateInvoice);

// GET: All invoices by admin
router.get('/all/:adminId', invoiceController.getAllInvoices);

// GET: Single invoice
router.get('/:invoiceId', invoiceController.getInvoiceById);

module.exports = router;
