
const STORAGE_KEY = "educare_complaints";

export const getComplaints = () => {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error getting complaints:", error);
    return [];
  }
};

const saveComplaints = (complaints) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
    window.dispatchEvent(new Event("complaintsUpdated"));
  } catch (error) {
    console.error("Error saving complaints:", error);
  }
};

export const initializeComplaints = (initialData = []) => {
  if (localStorage.getItem(STORAGE_KEY) === null) {
    saveComplaints(initialData);
  }

  return getComplaints();
};

export const addComplaint = (complaint) => {
  const complaints = getComplaints();

  const studentId = String(
    localStorage.getItem("studentId") || ""
  ).trim();

  const studentEmail = String(
    localStorage.getItem("studentEmail") || ""
  ).trim().toLowerCase();

  const newComplaint = {
    ...complaint,
    studentId: String(complaint.studentId || studentId).trim(),
    studentEmail: String(
      complaint.studentEmail || studentEmail
    ).trim().toLowerCase(),
    id: Date.now(),
    date: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }),
    status: "Pending"
  };

  saveComplaints([newComplaint, ...complaints]);

  return newComplaint;
};

export const updateComplaintStatus = (id, status) => {
  const complaints = getComplaints().map((complaint) =>
    String(complaint.id) === String(id)
      ? { ...complaint, status }
      : complaint
  );

  saveComplaints(complaints);
  return complaints;
};

export const removeComplaint = (id) => {
  const complaints = getComplaints().filter(
    (complaint) => String(complaint.id) !== String(id)
  );

  saveComplaints(complaints);
  return complaints;
};

export const subscribeToComplaints = (callback) => {
  window.addEventListener("complaintsUpdated", callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("complaintsUpdated", callback);
    window.removeEventListener("storage", callback);
  };
};
