export default function UserTable({ users, onEdit, onDelete }) {
  return (
    <div className="table-container">
      <h2>User Records</h2>
      {users.length === 0 ? (
        <p>No records yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Skills</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i}>
                <td>{u.firstName} {u.lastName}</td>
                <td>{u.email}</td>
                <td>{u.phoneNumber}</td>
                <td>{u.skills.join(", ")}</td>
                <td>
                  <button className="btn-edit" onClick={() => onEdit(i)}>Edit</button>
                  <button className="btn-delete" onClick={() => onDelete(i)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
