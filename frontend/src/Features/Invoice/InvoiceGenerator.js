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
    type: "",
    total: "",
    signature: "",
    membershipType: "",
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
        <div style={styles.header}>
          <img src="/images/goldenpic.jpg" alt="Gym Logo" style={styles.logo} />
          <div style={styles.headerText}>
            <p>Address: Opp. Value Zone, Nacharam, Secunderabad, Telangana</p>
            <p>Cell: 9666534222, 9948919835</p>
          </div>
        </div>

        <hr style={styles.separator} />

        <div style={{ ...styles.flexWrap, marginBottom: "15px" }}>
          <div style={styles.flexItem}>
            <strong>Admission No:</strong>
            {isEditMode ? (
              <input value={invoiceData.admissionNo} onChange={(e) => handleChange("admissionNo", e.target.value)} />
            ) : (
              invoiceData.admissionNo
            )}
          </div>
          <div style={styles.flexItem}>
            <strong>Date:</strong>
            {isEditMode ? (
              <input type="date" value={invoiceData.date} onChange={(e) => handleChange("date", e.target.value)} />
            ) : (
              invoiceData.date
            )}
          </div>
          <div style={styles.flexItem}>
            <strong>Payment Mode:</strong>
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

        <div style={{ ...styles.flexWrap, gap: "20px", marginBottom: "15px" }}>
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

        <div>
          {["receivedFrom", "sumOfRupees", "validFrom", "validUpto", "paidDate"].map((field, index) => (
            <div key={index} style={styles.formRow}>
              <div style={styles.formLabel}>{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</div>
              {isEditMode ? (
                <input
                  type={["validFrom", "validUpto", "paidDate"].includes(field) ? "date" : "text"}
                  value={invoiceData[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  style={styles.inputLine}
                />
              ) : (
                <div>{invoiceData[field]}</div>
              )}
            </div>
          ))}
        </div>

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
                    style={styles.inputLine}
                  />
                ) : (
                  invoiceData.total
                )}
              </td>
            </tr>
          </tbody>
        </table>

        <hr style={{ margin: "10px 0", border: "none", borderTop: "1px solid #ccc" }} />



        {/* Note and Signature - moved just below the table without space */}
        <div style={{ ...styles.flexWrap, marginTop: "0px", gap: "20px" }}>
          <div style={{ flex: 1 }}>
            <strong>Note:</strong>
            <ul style={styles.noteList}>
              <li>Management will not be responsible for any loss.</li>
              <li>Vehicles to be parked at owner's risk.</li>
              <li>For any complaints/suggestions, please contact management.</li>
              <li>Please take receipt when you pay the fees.</li>
            </ul>
          </div>
          <div style={{ flex: 1 }}>
            Signature:
            <div style={{ marginTop: "8px" }}>
              {isEditMode ? (
                <input
                  type="text"
                  value={invoiceData.signature}
                  onChange={(e) => handleChange("signature", e.target.value)}
                  style={styles.inputLine}
                />
              ) : (
                <div style={{ borderBottom: "1px solid #000" }}>{invoiceData.signature}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", marginTop: "24px" }}>
        <button onClick={() => setIsEditMode(!isEditMode)} style={styles.editButton}>
          {isEditMode ? "Save" : "Edit"}
        </button>
        <button onClick={downloadPDF} style={styles.downloadButton}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    fontFamily: "'Poppins', sans-serif",
    padding: "8px",
    background: "#f5f5f5",
    minHeight: "100vh",
    boxSizing: "border-box",
  },
  invoiceContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    boxSizing: "border-box",
  },
  header: {
    textAlign: "center",
    marginBottom: "16px",
  },
  logo: {
    width: "100px",
    height: "auto",
    marginBottom: "8px",
  },
  headerText: {
    fontSize: "13px",
    color: "#444",
    lineHeight: "1.4",
  },
  separator: {
    borderTop: "2px solid #000",
    margin: "16px 0",
  },
  flexWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
  },
  flexItem: {
    flex: "1 1 100%",
    minWidth: "200px",
    fontSize: "14px",
  },
  formRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: "12px",
  },
  formLabel: {
    flex: "0 0 140px",
    fontWeight: "600",
    fontSize: "14px",
    color: "#333",
  },
  inputLine: {
    flex: 1,
    border: "none",
    borderBottom: "1px solid #444",
    padding: "6px",
    fontSize: "14px",
    background: "transparent",
    outline: "none",
    minWidth: "160px",
  },
 table: {
  transform: "scale(0.8)",
  transformOrigin: "top left",
  minHeight: "400px", // or any height you need
},

  tableHead: {
    backgroundColor: "#f0f0f0",
    padding: "8px",
    border: "1px solid #ccc",
    textAlign: "center",
  },
  tableCell: {
    padding: "8px",
    border: "1px solid #ccc",
    textAlign: "center",
  },
  noteList: {
    fontSize: "13px",
    paddingLeft: "16px",
    marginTop: "4px", // tightened spacing
    color: "#444",
  },
  editButton: {
    padding: "10px 20px",
    fontSize: "14px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    maxWidth: "240px",
  },
  downloadButton: {
    padding: "10px 20px",
    fontSize: "14px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    maxWidth: "240px",
  },
};

export default InvoiceGenerator;
