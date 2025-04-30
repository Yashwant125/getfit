import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewMembers = ({ members, setMembers }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/members');
        setMembers(res.data);
      } catch (error) {
        console.error('Error fetching members:', error);
        setError(error.response?.data?.error || 'Failed to load members data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setMembers]);

  const handleEditMember = (member) => {
    setEditingMember({
      ...member,
      startDate: member.startDate?.slice(0, 10),
      membershipDuration: getMonthDifference(member.startDate, member.endDate),
    });
  };

  const getMonthDifference = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return (
      endDate.getMonth() -
      startDate.getMonth() +
      12 * (endDate.getFullYear() - startDate.getFullYear())
    );
  };

  const handleSaveEdit = async () => {
    try {
      const updatedMember = {
        ...editingMember,
        amountPaid: Number(editingMember.amountPaid),
        membershipDuration: Number(editingMember.membershipDuration),
        status: editingMember.status?.toLowerCase(),
      };

      const res = await axios.put(`http://localhost:5000/api/members/${updatedMember._id}`, updatedMember);

      setMembers((prev) =>
        prev.map((m) => (m._id === updatedMember._id ? { ...m, ...res.data } : m))
      );
      setEditingMember(null);
    } catch (error) {
      console.error('Error updating member:', error);
      alert(error.response?.data?.error || 'Failed to update member.');
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this member?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/members/${id}`);
      setMembers((prev) => prev.filter((m) => m._id !== id));
    } catch (error) {
      console.error('Error deleting member:', error);
      alert(error.response?.data?.error || 'Failed to delete member.');
    }
  };

  if (loading) return <p>Loading members...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>All Members</h2>
      {members.length === 0 ? (
        <p>No members found.</p>
      ) : (
        members.map((member) => (
          <div
            key={member._id}
            style={{
              border: '1px solid #ddd',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
            }}
          >
            {editingMember && editingMember._id === member._id ? (
              <div>
                <label>
                  <strong>Reg No:</strong>
                  <input
                    type="text"
                    value={editingMember.registrationNumber}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, registrationNumber: e.target.value })
                    }
                  />
                </label>
                <br />
                <label>
                  <strong>Name:</strong>
                  <input
                    type="text"
                    value={editingMember.name}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, name: e.target.value })
                    }
                  />
                </label>
                <br />
                <label>
                  <strong>Phone:</strong>
                  <input
                    type="text"
                    value={editingMember.phone}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, phone: e.target.value })
                    }
                  />
                </label>
                <br />
                <label>
                  <strong>Membership:</strong>
                  <input
                    type="text"
                    value={editingMember.membershipType}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, membershipType: e.target.value })
                    }
                  />
                </label>
                <br />
                <label>
                  <strong>Start Date:</strong>
                  <input
                    type="date"
                    value={editingMember.startDate}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, startDate: e.target.value })
                    }
                  />
                </label>
                <br />
                <label>
                  <strong>Duration (months):</strong>
                  <input
                    type="number"
                    value={editingMember.membershipDuration}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, membershipDuration: e.target.value })
                    }
                  />
                </label>
                <br />
                <label>
                  <strong>Amount Paid:</strong>
                  <input
                    type="number"
                    value={editingMember.amountPaid}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, amountPaid: e.target.value })
                    }
                  />
                </label>
                <br />
                <label>
                  <strong>Status:</strong>
                  <select
                    value={editingMember.status}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, status: e.target.value })
                    }
                  >
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                    <option value="partially paid">Partially Paid</option>
                  </select>
                </label>
                <br />
                <button onClick={handleSaveEdit} style={{ backgroundColor: '#28a745', color: '#fff' }}>
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingMember(null)}
                  style={{
                    backgroundColor: '#6c757d',
                    color: '#fff',
                    marginLeft: '10px',
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <p><strong>Reg No:</strong> {member.registrationNumber}</p>
                <p><strong>Name:</strong> {member.name}</p>
                <p><strong>Phone:</strong> {member.phone}</p>
                <p><strong>Membership:</strong> {member.membershipType}</p>
                <p><strong>Valid From:</strong> {member.startDate?.slice(0, 10)}</p>
                <p><strong>Valid To:</strong> {member.endDate?.slice(0, 10)}</p>
                <p><strong>Amount Paid:</strong> ₹{member.amountPaid || 0}</p>
                <p><strong>Status:</strong> {member.status}</p>

                <button
                  onClick={() => handleEditMember(member)}
                  style={{
                    marginRight: '10px',
                    backgroundColor: '#ffc107',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  ✏️ Edit
                </button>

                <button
                  onClick={() => handleDelete(member._id)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ViewMembers;
