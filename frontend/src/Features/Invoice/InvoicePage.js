import React from "react";
import InvoiceGenerator from "./InvoiceGenerator";

const InvoicePage = () => {
  const invoiceData = {
    admissionNo: "",
    date: "",
    receiptNo: "",
    paymentMode: "",
    memberName: "",
    amount: "",
    validFrom: "",
    validUpto: "",
    paidDate: "",
    signedBy: "",
  };

  return (
    <div style={{ padding: "2rem" }}>
      <InvoiceGenerator invoiceData={invoiceData} />
    </div>
  );
};

export default InvoicePage;
