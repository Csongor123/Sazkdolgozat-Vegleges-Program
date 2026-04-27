async function apiGet(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("API hiba");
  return res.json();
}

async function apiSend(url, method, body) {
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) throw new Error("API hiba");
  return res.json();
}


function getActiveUser() {
  return localStorage.getItem("activeUser") || "Vendég";
}
function setActiveUser(name) {
  localStorage.setItem("activeUser", name);
}

/*User lista: szerver*/ 
async function getUserList() {
  const users = await apiGet("/api/users");
  /*ha nincs még user, Vendéget mutat*/
  return users.length ? users : ["Vendég"];
}

async function createUser(name) {
  await apiSend("/api/users", "POST", { name });
}

async function deleteUserFromStorage(name) {
  await fetch(`/api/users/${encodeURIComponent(name)}`, { method: "DELETE" });
}

/*Progress: szerver*/ 
async function loadProgress() {
  const user = getActiveUser();
  if (!user) return {};
  return apiGet(`/api/progress/${encodeURIComponent(user)}`);
}

async function saveProgress(data) {
  const user = getActiveUser();
  await apiSend(`/api/progress/${encodeURIComponent(user)}`, "POST", data);
}

async function resetProgressStorage() {
  const user = getActiveUser();
  await apiSend(`/api/progress/${encodeURIComponent(user)}/reset`, "POST");
}
