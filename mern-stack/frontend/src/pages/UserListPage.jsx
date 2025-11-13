import React, { useEffect, useState } from "react";
import instance from "~/api";
import { useNavigate } from "react-router-dom";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await instance.get("/users");

        // Đảm bảo res.data luôn là mảng
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
          ? res.data.data
          : [];

        setUsers(data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách user:", err);
        if (err.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [navigate]);

  if (loading)
    return <p className="text-center mt-10">⏳ Đang tải dữ liệu...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Danh sách người dùng</h1>
      <table className="w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Tên hiển thị</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Vai trò</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((u, i) => (
              <tr key={u._id || i} className="hover:bg-gray-50">
                <td className="border p-2 text-center">{i + 1}</td>
                <td className="border p-2">{u.displayName}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2 text-center">{u.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
                Không có người dùng nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserListPage;
