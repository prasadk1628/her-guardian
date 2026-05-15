import { useState } from "react";

export default function Contacts() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [priority, setPriority] = useState("1");

  const [contacts, setContacts] = useState([]);

  function handleAddContact(e) {
    e.preventDefault();

    if (!name || !phone) {
      alert("Please fill all fields");
      return;
    }

    if (contacts.length >= 5) {
          alert("Maximum 5 trusted contacts allowed");
          return;
        }

    const newContact = {
      id: Date.now(),
      name,
      phone,
      priority,
    };

    setContacts([...contacts, newContact]);

    setName("");
    setPhone("");
    setPriority("1");
  }

  function handleDelete(id) {
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== id
    );
  
    setContacts(updatedContacts);
  }    
  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl p-6">
          <h1 className="text-3xl font-bold text-pink-600 mb-6">
            Trusted Contacts
          </h1>

          <form onSubmit={handleAddContact} className="space-y-4">
            <input
              type="text"
              placeholder="Contact Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-pink-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-pink-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border border-pink-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="1">Priority 1 - Primary Contact</option>
              <option value="2">Priority 2</option>
              <option value="3">Priority 3</option>
              <option value="4">Priority 4</option>
              <option value="5">Priority 5</option>
            </select>

            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg"
            >
              Add Contact
            </button>
          </form>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Saved Contacts
            </h2>

            {contacts.length === 0 ? (
              <p className="text-gray-500">
                No contacts added yet.
              </p>
            ) : (
              <div className="space-y-3">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="bg-pink-50 border border-pink-100 rounded-lg p-4"
                  >
                    <p className="font-semibold">
                      {contact.name}
                    </p>

                    <p className="text-gray-600">
                      {contact.phone}
                    </p>
                    <p className="text-sm text-pink-600 mt-1">
                      Priority: {contact.priority}
                    </p>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}