import React, { useState } from 'react';

const mockAccounts = [
  { username: 'Khoa Le', password: '123', email: 'yeunhamvoban@gmail.com', phone: '01923092123', role: 'Student' },
  { username: 'admin', password: '123123', email: 'lequang@gmail.com', phone: '09123891237', role: 'Admin' },
  { username: 'Khoano1', password: '123', email: 'lehoangvu@gmail.com', phone: '0905126376', role: 'Student' },
  { username: 'admin2', password: '123123', email: 'levi@gmail.com', phone: '01234888999', role: 'Admin' },
  { username: 'admin3', password: '123123', email: 'lequang3222@gmail.com', phone: '21323123123123', role: 'Admin' },
  { username: 'admin5', password: '123', email: 'nguyensonghao@gmail.com', phone: '0988222333', role: 'Student' },
  { username: 'Valorant123', password: '123', email: 'levuxuan@gmail.com', phone: '0908777666', role: 'Student' },
  { username: 'Ronaldo123', password: '123', email: 'ronal@gmail.com', phone: '0983333666', role: 'Student' },
  { username: 'Vantung', password: '123', email: 'vantung@gmail.com', phone: '0905126378', role: 'Student' },
];

const AllAccount = () => {
  const [filters, setFilters] = useState({ username: '', email: '', phone: '', role: '' });
  const [accounts, setAccounts] = useState(mockAccounts);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = () => {
    setAccounts(
      mockAccounts.filter(acc =>
        acc.username.toLowerCase().includes(filters.username.toLowerCase()) &&
        acc.email.toLowerCase().includes(filters.email.toLowerCase()) &&
        acc.phone.toLowerCase().includes(filters.phone.toLowerCase()) &&
        (filters.role === '' || acc.role === filters.role)
      )
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn">
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={filters.username}
          onChange={handleChange}
          className="border rounded px-3 py-2 min-w-[160px]"
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={filters.email}
          onChange={handleChange}
          className="border rounded px-3 py-2 min-w-[160px]"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={filters.phone}
          onChange={handleChange}
          className="border rounded px-3 py-2 min-w-[160px]"
        />
        <select
          name="role"
          value={filters.role}
          onChange={handleChange}
          className="border rounded px-3 py-2 min-w-[160px]"
        >
          <option value="">-- Role --</option>
          <option value="Student">Student</option>
          <option value="Admin">Admin</option>
        </select>
        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 transition-all"
        >
          🔍 Lọc
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-black">
              <th className="px-4 py-2 border">Username</th>
              <th className="px-4 py-2 border">Password</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc, idx) => (
              <tr key={idx} className="text-center border-b hover:bg-gray-50">
                <td className="px-4 py-2 border">{acc.username}</td>
                <td className="px-4 py-2 border">{acc.password}</td>
                <td className="px-4 py-2 border">{acc.email}</td>
                <td className="px-4 py-2 border">{acc.phone}</td>
                <td className="px-4 py-2 border">{acc.role}</td>
                <td className="px-4 py-2 border flex gap-2 justify-center">
                  <button className="bg-cyan-500 text-white px-3 py-1 rounded hover:bg-cyan-600 transition-all">Details</button>
                  <button className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition-all">Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAccount; 