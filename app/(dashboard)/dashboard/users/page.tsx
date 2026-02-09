/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { 
  Trash2, User, Mail, Phone, Shield, 
  MoreVertical, Search, Filter, Loader2 
} from "lucide-react";
import { toast } from "sonner";

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // ১. Fetch Users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`);
      const result = await res.json();
      if (result.success) setUsers(result.data);
    } catch (error) {
      toast.error("Could not fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  // ২. Delete User
  const handleDelete = async (id: number | string) => {
    if (!confirm("Are you sure? This action is permanent!")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.success) {
        toast.success("User deleted!");
        setUsers(users.filter((u: any) => u.id !== id));
      }
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  const filteredUsers = users.filter((u: any) => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 space-y-6 bg-transparent min-h-screen">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            User Management
          </h1>
          <p className="text-slate-500 text-sm">Manage roles and monitor active accounts.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 ring-purple-500 outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Main Container */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 gap-3">
          <Loader2 className="animate-spin text-purple-600 w-10 h-10" />
          <p className="text-slate-500 animate-pulse">Syncing user database...</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-4xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-175">
              <thead className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="p-5 text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">User</th>
                  <th className="p-5 text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Contact</th>
                  <th className="p-5 text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Role</th>
                  <th className="p-5 text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="p-5 text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {filteredUsers.map((user: any) => (
                  <tr key={user.id} className="group hover:bg-purple-50/30 dark:hover:bg-purple-900/5 transition-all">
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-linear-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                          <p className="text-[10px] text-slate-400 uppercase font-medium">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-400">
                        <span className="flex items-center gap-2"><Mail size={12}/> {user.email}</span>
                        <span className="flex items-center gap-2"><Phone size={12}/> {user.phone}</span>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        user.role === 'ADMIN' 
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' 
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {user.role === 'ADMIN' && <Shield size={10} />}
                        {user.role}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${user.status === 'ACTIVE' ? 'bg-green-500' : 'bg-amber-500'}`} />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">{user.status}</span>
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}  