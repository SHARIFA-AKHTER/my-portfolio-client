
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { getContacts } from "../../../../actions/getContacts";

// export default async function DashboardContacts() {
//   let contacts: any[] = [];

//   try {
//     contacts = await getContacts();
//   } catch (error: any) {
//     return (
//       <p className="text-center text-red-500 py-10">
//         Error: {error.message}
//       </p>
//     );
//   }

//   if (contacts.length === 0) {
//     return (
//       <p className="text-center text-gray-500 py-10">
//         No contacts found.
//       </p>
//     );
//   }

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">📩 All Contact Messages</h1>
//       <div className="overflow-x-auto shadow rounded-lg">
//         <table className="min-w-full border border-gray-200 text-sm">
//           <thead className="bg-gray-100 text-gray-800">
//             <tr>
//               <th className="px-4 py-2 text-left">Name</th>
//               <th className="px-4 py-2 text-left">Email</th>
//               <th className="px-4 py-2 text-left">Subject</th>
//               <th className="px-4 py-2 text-left">Message</th>
//               <th className="px-4 py-2 text-left">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {contacts.map((c) => (
//               <tr key={c.id} className="border-t hover:bg-gray-50">
//                 <td className="px-4 py-2">{c.name}</td>
//                 <td className="px-4 py-2">{c.email}</td>
//                 <td className="px-4 py-2">{c.subject}</td>
//                 <td className="px-4 py-2">{c.message}</td>
//                 <td className="px-4 py-2">
//                   {new Date(c.createdAt).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
import { getContacts } from "../../../../actions/getContacts";

export default async function DashboardContacts() {
  let contacts: any[] = [];

  try {
    contacts = await getContacts();
  } catch (error: any) {
    return (
      <p className="text-center text-red-500 py-10">
        Error: {error.message}
      </p>
    );
  }

  if (contacts.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">
        No contacts found.
      </p>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📩 All Contact Messages</h1>
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Subject</th>
              <th className="px-4 py-2 text-left">Message</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2">{c.email}</td>
                <td className="px-4 py-2">{c.subject}</td>
                <td className="px-4 py-2">{c.message}</td>
                <td className="px-4 py-2">
                  {new Date(c.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
