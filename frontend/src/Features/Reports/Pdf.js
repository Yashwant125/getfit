import jsPDF from "jspdf";
import "jspdf-autotable"; // just import, no need to register manually

export const generateMemberPDF = (members) => {
  const doc = new jsPDF();
  doc.text("Members Report", 14, 15);

  const rows = members.map((m, index) => [
    index + 1,
    m.registrationNumber || "-",
    m.name || "-",
    m.phone || "-",
    m.membershipType || "-",
    m.startDate?.slice(0, 10) || "-",
    m.endDate?.slice(0, 10) || "-",
    m.amountPaid || 0,
    m.status || "-",
  ]);

  doc.autoTable({
    startY: 20,
    head: [["#", "Reg No", "Name", "Phone", "Type", "Start", "End", "Paid", "Status"]],
    body: rows,
  });

  doc.save("members_report.pdf");
};

export const generateAttendancePDF = (records) => {
  const doc = new jsPDF();
  doc.text("Attendance Report", 14, 15);

  const rows = records.map((r, index) => [
    index + 1,
    r.memberId?.name || "-",
    r.memberId?.phone || "-",
    r.date || "-",
  ]);

  doc.autoTable({
    startY: 20,
    head: [["#", "Name", "Phone", "Date"]],
    body: rows,
  });

  doc.save("attendance_report.pdf");
};
