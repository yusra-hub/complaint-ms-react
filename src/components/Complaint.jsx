
import React, { useState } from "react";
import { addComplaint } from "./complaintsStore";


function Complaint() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !category || !description) {
      alert("Please fill all required fields.");
      return;
    }

    addComplaint({
      studentId: "STUDENT-001",
      student: "John Doe",
      title,
      category,
      priority,
      description
    });

    alert("Complaint submitted successfully!");

    setTitle("");
    setCategory("");
    setPriority("Medium");
    setDescription("");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Submit Complaint
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Complaint Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-3 rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="Academic">Academic</option>
          <option value="Administration">Administration</option>
          <option value="Facilities">Facilities</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border p-3 rounded"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <textarea
          placeholder="Describe your complaint"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-3 rounded"
          rows="5"
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          Submit Complaint
        </button>

      </form>
    </div>
  );
}

export default Complaint;
