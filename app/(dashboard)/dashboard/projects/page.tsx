/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { Edit, Trash2 } from "lucide-react";
// import { deleteProject } from "../../../../actions/projects";
// import { getAllProjects } from "../../../../lib/project";

// export default function DashboardProjectsPage() {
//   const [projects, setProjects] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getAllProjects();
//       setProjects(data);
//       setLoading(false);
//     };
//     fetchData();
//   }, []);

//   const handleDelete = async (id: number) => {
//     if (!confirm("Are you sure?")) return;
//     try {
//       await deleteProject(id);
//       setProjects((prev) => prev.filter((p) => p.id !== id));
//       alert("✅ Deleted!");
//     } catch (err: any) {
//       alert(err.message || "Delete failed");
//     }
//   };

//   if (loading) return <p>Loading projects...</p>;

//   return (
//     <div className="p-6 flex-1">
//       <h1 className="text-3xl font-bold mb-6">📦 Manage Projects</h1>
//       <Link
//         href="/dashboard/create-project"
//         className="inline-block mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//       >
//         + Add New Project
//       </Link>

//       {projects.length === 0 ? (
//         <p>No projects found.</p>
//       ) : (
//         <table className="w-full table-auto border border-gray-300">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="px-4 py-2 border">ID</th>
//               <th className="px-4 py-2 border">Title</th>
//               <th className="px-4 py-2 border">Slug</th>
//               <th className="px-4 py-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {projects.map((p) => (
//               <tr key={p.id} className="hover:bg-gray-100">
//                 <td className="px-4 py-2 border">{p.id}</td>
//                 <td className="px-4 py-2 border">{p.title}</td>
//                 <td className="px-4 py-2 border">{p.slug}</td>
//                 <td className="px-4 py-2 border flex gap-2">
//                   <Link
//                     href={`/dashboard/projects/${p.id}`}
//                     className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//                   >
//                     <Edit className="h-4 w-4" /> Edit
//                   </Link>
//                   <button
//                     onClick={() => handleDelete(p.id)}
//                     className="flex items-center gap-1 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//                   >
//                     <Trash2 className="h-4 w-4" /> Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import { deleteProject } from "../../../../actions/projects";
import { getAllProjects } from "../../../../lib/project";

export default function DashboardProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProjects();
      setProjects(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      const token = localStorage.getItem("token");
      await deleteProject(id, token || undefined);
      setProjects(prev => prev.filter(p => p.id !== id));
      alert("✅ Deleted!");
    } catch (err: any) {
      alert(err.message || "Delete failed");
    }
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="p-6 flex-1">
      <h1 className="text-3xl font-bold mb-6">📦 Manage Projects</h1>
      <Link href="/dashboard/create-project" className="inline-block mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        + Add New Project
      </Link>

      {projects.length === 0 ? <p>No projects found.</p> : (
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Slug</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{p.id}</td>
                <td className="px-4 py-2 border">{p.title}</td>
                <td className="px-4 py-2 border">{p.slug}</td>
                <td className="px-4 py-2 border flex gap-2">
                  <Link href={`/dashboard/projects/${p.id}`} className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                    <Edit className="h-4 w-4"/> Edit
                  </Link>
                  <button onClick={() => handleDelete(p.id)} className="flex items-center gap-1 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                    <Trash2 className="h-4 w-4"/> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
