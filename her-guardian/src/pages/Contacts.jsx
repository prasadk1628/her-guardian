import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";

import { useAuth } from "../context/AuthContext";

export default function Contacts() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [priority, setPriority] = useState("1");
  const { user } = useAuth();

  const [editId, setEditId] = useState(null);
  const [contacts, setContacts] = useState([]);

  async function handleAddContact(e) {
    e.preventDefault();
    
    if (!name || !phone) {
      alert("Please fill all fields");
      return;
    }
  
    // Edit existing contact
    if (editId) {
    
      const contactRef = doc(
        db,
        "users",
        user.uid,
        "contacts",
        editId
      );
    
      await updateDoc(contactRef, {
        name,
        phone,
        priority,
      });
    
      const updatedContacts = contacts.map((contact) =>
        contact.id === editId
          ? {
              ...contact,
              name,
              phone,
              priority,
            }
          : contact
      );
    
      setContacts(updatedContacts);
    
      setEditId(null);
      setName("");
      setPhone("");
      setPriority("1");
    
      return;
    }
  
    // Limit contacts
    if (contacts.length >= 5) {
      alert("Maximum 5 trusted contacts allowed");
      return;
    }
  
    // Add new contact
    const contactsRef = collection(
      db,
      "users",
      user.uid,
      "contacts"
    );
  
    const newContact = {
      name,
      phone,
      priority,
    };
  
    const docRef = await addDoc(
      contactsRef,
      newContact
    );
  
    setContacts([
      ...contacts,
      {
        id: docRef.id,
        ...newContact,
      },
    ]);
  
    setName("");
    setPhone("");
    setPriority("1");
  }



  async function handleDelete(id) {

    const contactRef = doc(
      db,
      "users",
      user.uid,
      "contacts",
      id
    );

    await deleteDoc(contactRef);

    const updatedContacts = contacts.filter(
      (contact) => contact.id !== id
    );

    setContacts(updatedContacts);
  }

  useEffect(() => {

    async function fetchContacts() {

      if (!user) return;

      const contactsRef = collection(
        db,
        "users",
        user.uid,
        "contacts"
      );

      const snapshot = await getDocs(contactsRef);

      const fetchedContacts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setContacts(fetchedContacts);
    }

    fetchContacts();

  }, [user]);

  return (
    <div className="min-h-screen pb-24 bg-pink-50 p-6">
      <div className="max-w-2xl mx-auto">

        <div className="bg-white rounded-3xl border border-pink-100 p-6">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-pink-600">
              Trusted Contacts
            </h1>

            <p className="text-gray-500 mt-2">
              Add people who should receive emergency alerts.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAddContact} className="space-y-4">

            <input
              type="text"
              placeholder="Contact Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-pink-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-pink-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border border-pink-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="1">
                Priority 1 - Primary Contact
              </option>

              <option value="2">
                Priority 2
              </option>

              <option value="3">
                Priority 3
              </option>

              <option value="4">
                Priority 4
              </option>

              <option value="5">
                Priority 5
              </option>
            </select>

            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-2xl font-semibold transition"
            >
              {editId ? "Update Contact" : "Add Contact"}
            </button>

          </form>

          {/* Saved Contacts */}
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
                    className="bg-pink-50 border border-pink-100 rounded-2xl p-5"
                  >

                    <p className="font-semibold text-gray-800 text-lg">
                      {contact.name}
                    </p>

                    <p className="text-gray-500 mt-1">
                      {contact.phone}
                    </p>

                    <p className="text-sm text-pink-600 mt-2">
                      Priority: {contact.priority}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">

                      <a
                        href={`tel:${contact.phone}`}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl text-sm text-center transition"
                      >
                        Call
                      </a>

                      <button
                        onClick={() => handleEdit(contact)}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl text-sm transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-xl text-sm transition"
                      >
                        Delete
                      </button>

                    </div>

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