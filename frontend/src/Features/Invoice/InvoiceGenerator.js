import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const InvoiceGenerator = () => {
  const invoiceRef = useRef();
  const [isEditMode, setIsEditMode] = useState(true);

  const [invoiceData, setInvoiceData] = useState({
    admissionNo: "",
    date: "",
    paymentMode: "",
    receivedFrom: "",
    sumOfRupees: "",
    validFrom: "",
    validUpto: "",
    paidDate: "",
    type: "", // Monthly, Quarterly etc.
    total: "",
    signature: "",
    membershipType: "", // new or renewal
  });

  const handleChange = (field, value) => {
    setInvoiceData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFeeTypeChange = (value) => {
    setInvoiceData((prev) => ({ ...prev, type: value }));
  };

  const handleMembershipChange = (value) => {
    setInvoiceData((prev) => ({ ...prev, membershipType: value }));
  };

  const downloadPDF = async () => {
    const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save(`Invoice_${invoiceData.admissionNo || "Receipt"}.pdf`);
  };

  return (
    <div style={styles.wrapper}>
      <div ref={invoiceRef} style={styles.invoiceContainer}>
        {/* Header */}
        <div style={styles.header}>
          <img src="/images/goldenpic.jpg" alt="Gym Logo" style={styles.logo} />
          <div style={styles.headerText}>
            <p>Address: Opp. Value Zone, Nacharam, Secunderabad, Telangana</p>
            <p>Cell: 9666534222, 9948919835</p>
          </div>
        </div>

        <hr style={styles.separator} />

        {/* Invoice Meta */}
        <div style={styles.metaRow}>
          <div>
            <strong>Admission No:</strong>{" "}
            {isEditMode ? (
              <input value={invoiceData.admissionNo} onChange={(e) => handleChange("admissionNo", e.target.value)} />
            ) : (
              invoiceData.admissionNo
            )}
          </div>
          <div>
            <strong>Date:</strong>{" "}
            {isEditMode ? (
              <input type="date" value={invoiceData.date} onChange={(e) => handleChange("date", e.target.value)} />
            ) : (
              invoiceData.date
            )}
          </div>
          <div>
            <strong>Payment Mode:</strong>{" "}
            {isEditMode ? (
              <select value={invoiceData.paymentMode} onChange={(e) => handleChange("paymentMode", e.target.value)}>
                
                <option value="Cash">Cash</option>
                <option value="Online">Online</option>
              </select>
            ) : (
              invoiceData.paymentMode
            )}
          </div>
        </div>

        {/* Membership Type */}
        <div style={styles.checkboxRow}>
          <label>
            <input
              type="radio"
              name="membership"
              checked={invoiceData.membershipType === "New"}
              onChange={() => handleMembershipChange("New")}
              disabled={!isEditMode}
            />
            New
          </label>
          <label>
            <input
              type="radio"
              name="membership"
              checked={invoiceData.membershipType === "Renewal"}
              onChange={() => handleMembershipChange("Renewal")}
              disabled={!isEditMode}
            />
            Renewal
          </label>
        </div>

        {/* Editable Fields */}
        <div style={styles.formGroup}>
          {[
            ["receivedFrom", "Received from"],
            ["sumOfRupees", "A sum of rupees"],
            ["validFrom", "Valid from"],
            ["validUpto", "Valid upto"],
            ["paidDate", "Paid date"],
          ].map(([field, label], index) => (
            <div key={index} style={styles.formRow}>
              <div style={styles.formLabel}>{label}:</div>
              {isEditMode ? (
                <input
                  type={["validFrom", "validUpto", "paidDate"].includes(field) ? "date" : "text"}
                  value={invoiceData[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  style={{ flex: 1, border: "none", borderBottom: "1px solid #222", height: "25px" }}
                />
              ) : (
                <div>{invoiceData[field]}</div>
              )}
            </div>
          ))}
        </div>

        {/* Fees Table */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHead}>Fees Type</th>
              <th style={styles.tableHead}>Select</th>
            </tr>
          </thead>
          <tbody>
            {["Monthly", "Quarterly", "Half Yearly", "Annual", "Other Fee"].map((type, i) => (
              <tr key={i}>
                <td style={styles.tableCell}>{type}</td>
                <td style={styles.tableCell}>
                  {isEditMode ? (
                    <input
                      type="radio"
                      name="feesType"
                      checked={invoiceData.type === type}
                      onChange={() => handleFeeTypeChange(type)}
                    />
                  ) : invoiceData.type === type ? (
                    "✔"
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <td style={{ ...styles.tableCell, fontWeight: "bold" }}>Total</td>
              <td style={styles.tableCell}>
                {isEditMode ? (
                  <input
                    type="text"
                    value={invoiceData.total}
                    onChange={(e) => handleChange("total", e.target.value)}
                    style={{ border: "none", borderBottom: "1px solid #222" }}
                  />
                ) : (
                  invoiceData.total
                )}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Notes and Signature */}
        <div style={styles.noteSignWrapper}>
          <div style={styles.notes}>
            <strong>Note:</strong>
            <ul style={styles.noteList}>
              <li>Management will not be responsible for any loss.</li>
              <li>Vehicles to be parked at owner's risk.</li>
              <li>For any complaints/suggestions, please contact management.</li>
              <li>Please take receipt when you pay the fees.</li>
            </ul>
          </div>
          <div style={styles.signature}>
            Signature:
            <div style={{ marginTop: "8px" }}>
              {isEditMode ? (
                <input
                  type="text"
                  value={invoiceData.signature}
                  onChange={(e) => handleChange("signature", e.target.value)}
                  style={{ border: "none", borderBottom: "1px solid #000", width: "100%" }}
                />
              ) : (
                <div style={{ borderBottom: "1px solid #000" }}>{invoiceData.signature}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div>
        <button onClick={() => setIsEditMode(!isEditMode)} style={styles.editButton}>
          {isEditMode ? "Save" : "Edit"}
        </button>
        <button onClick={downloadPDF} style={styles.downloadButton}>Download PDF</button>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#f2f2f2",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  invoiceContainer: {
    width: "210mm",
    minHeight: "297mm",
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    color: "#000",
  },
  header: {
    textAlign: "center",
    marginBottom: "0px",
  },
  logo: {
    width: "180px",
    marginBottom: "4px",
  },
  headerText: {
    fontSize: "14px",
    lineHeight: "1.4",
  },
  separator: {
    border: "none",
    borderTop: "2px solid #222",
    margin: "10px 0 20px",
  },
  metaRow: {
    fontSize: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    marginBottom: "15px",
  },
  checkboxRow: {
    display: "flex",
    gap: "40px",
    fontSize: "14px",
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  formRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  formLabel: {
    width: "35%",
    fontWeight: "500",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  tableHead: {
    background: "#e6e6e6",
    padding: "10px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  tableCell: {
    padding: "10px",
    border: "1px solid #ccc",
    fontSize: "13px",
    textAlign: "center",
  },
  noteSignWrapper: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
  },
  notes: {
    width: "60%",
    fontSize: "13px",
  },
  noteList: {
    paddingLeft: "20px",
    marginTop: "8px",
  },
  signature: {
    width: "30%",
    fontSize: "13px",
    textAlign: "right",
  },
  downloadButton: {
    marginTop: "20px",
    padding: "10px 25px",
    fontSize: "15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginLeft: "10px",
  },
  editButton: {
    marginTop: "20px",
    padding: "10px 25px",
    fontSize: "15px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default InvoiceGenerator;
