/* =========================================================
   CDNO - LocalStorage Persistence Layer
   ========================================================= */


function initDB() {
  if (!localStorage.getItem("cdno_db")) {
    const initialDB = {
      contacts: [],
      actions: [],
      history: [],
      preferences: {
        context: "work"
      }
    };
    localStorage.setItem("cdno_db", JSON.stringify(initialDB));
  }
}


initDB();


function getDB() {
  return JSON.parse(localStorage.getItem("cdno_db"));
}


function saveDB(data) {
  localStorage.setItem("cdno_db", JSON.stringify(data));
}


function saveContact(name, email, message) {
  const db = getDB();
  const contact = {
    id: Date.now(),
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  };
  db.contacts.push(contact);
  saveDB(db);
}


function saveAction(type, description) {
  const db = getDB();
  db.actions.push({
    id: Date.now(),
    type,
    description,
    createdAt: new Date().toISOString()
  });
  saveDB(db);
}


function saveHistory(context, notifications) {
  const db = getDB();
  db.history.unshift({
    id: Date.now(),
    context,
    notifications,
    createdAt: new Date().toLocaleString()
  });
  saveDB(db);
}


function setContextPreference(context) {
  const db = getDB();
  db.preferences.context = context;
  saveDB(db);
}


function getContextPreference() {
  return getDB().preferences.context || "work";
}


function getHistory() {
  return getDB().history || [];
}