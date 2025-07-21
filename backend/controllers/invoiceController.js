const Invoice = require('../models/Invoice');

// POST /api/invoice/generate
exports.generateInvoice = async (req, res) => {
  try {
    const { memberId, memberName, phone, plan, amount, createdBy } = req.body;

    const count = await Invoice.countDocuments();
    const invoiceNumber = `INV-${new Date().getFullYear()}-${count + 1}`;

    const newInvoice = new Invoice({
      invoiceNumber,
      memberId,
      memberName,
      phone,
      plan,
      amount,
      createdBy,
    });

    await newInvoice.save();
    res.status(201).json({ message: 'Invoice created', invoice: newInvoice });
  } catch (error) {
    res.status(500).json({ error: 'Invoice creation failed' });
  }
};

// GET /api/invoice/all/:adminId
exports.getAllInvoices = async (req, res) => {
  try {
    const { adminId } = req.params;
    const invoices = await Invoice.find({ createdBy: adminId }).populate('memberId');
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching invoices' });
  }
};

// GET /api/invoice/:invoiceId
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.invoiceId).populate('memberId');
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve invoice' });
  }
};
