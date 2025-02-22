"use client";
import { useState } from "react";
interface User {
  id: number;
  name: string;
}
export default function UserForm() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Amy" },
    { id: 2, name: "Bravo" },
    { id: 3, name: "Charlie" },
  ]);

  const [newUser, setNewUser] = useState({
    name: "",
  });
  const updateUser = (id: number, p0: string, value: string) => {
    setUsers((prevUsers) => prevUsers.map((user) => (user.id === id ? { ...user, [p0]: value } : user)));
  };
  const addUser = () => {
    if (newUser.name.trim() !== "") {
        setUsers((prevUsers) => [...prevUsers, { id: prevUsers.length + 1, name: newUser.name }]);
        setNewUser({ name: "" });
        console.log("add user to users");
    }
  };
    const deleteUser = (id: number) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    }

  return (
    <div className="m-[15px] font-sans font-normal text-[12px]">
      <h3>Name</h3>
      <div className="flex mt-[10px] mb-[20px] space-x-[10px]">
        <input
          type="text"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          placeholder="New user name"
          className="p-[6px] bg-white text-center border border-black rounded-md"
        />
        <button onClick={addUser} className="p-[6px] bg-[#7CB9E8] border border-black rounded-md">
          Add User
        </button>
      </div>
      <h3>List of users</h3>
      <div className="flex flex-col mt-[10px] space-y-[10px]">
        {users.map((user) => (
          <div key={user.id} className="flex space-x-[10px]">
            <input
              type="text"
              value={user.name}
              onChange={(e) => updateUser(user.id, "name", e.target.value)}
              className="p-[6px] border border-black rounded-md bg-white text-center"
            />
            <button
              onClick={() => deleteUser(user.id)}
              className="p-[6px] bg-red-500 text-white border border-black rounded-md"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
