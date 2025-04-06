document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://gamf.nhely.hu/ajax2/";
  const CODE = "JT0PU6efg456"; // Cseréld ki a sajátodra!

  const getEl = id => document.getElementById(id);

  const showResponse = (id, msg, success = true) => {
    const el = getEl(id);
    el.textContent = msg;
    el.style.color = success ? "green" : "red";
  };

  getEl("loadData").addEventListener("click", loadData);
  getEl("create").addEventListener("click", createData);
  getEl("getDataForId").addEventListener("click", getDataForId);
  getEl("update").addEventListener("click", updateData);
  getEl("delete").addEventListener("click", deleteData);

  function loadData() {
    fetch(`${API_URL}?op=read&code=${CODE}`)
      .then(res => res.text())
      .then(text => {
        if (!text.trim()) throw new Error("Üres válasz érkezett az API-tól.");
        const data = JSON.parse(text);
        const list = getEl("dataList");
        list.innerHTML = "";

        let totalHeight = 0;
        let maxHeight = 0;

        data.list.forEach(item => {
          const li = document.createElement("li");
          li.className = "list-group-item";
          li.textContent = `ID: ${item.id}, Név: ${item.name}, Magasság: ${item.height}, Súly: ${item.weight}`;
          list.appendChild(li);
          const h = parseInt(item.height) || 0;
          totalHeight += h;
          if (h > maxHeight) maxHeight = h;
        });

        const avg = (totalHeight / data.list.length).toFixed(2);
        getEl("stats").textContent = `Összmagasság: ${totalHeight}, Átlag: ${avg}, Legnagyobb: ${maxHeight}`;
      })
      .catch(err => alert("Hiba történt: " + err.message));
  }

  function validateInput(name, height, weight) {
    if (!name || !height || !weight) {
      alert("Minden mezőt ki kell tölteni!");
      return false;
    }
    if ([name, height, weight].some(x => x.length > 30)) {
      alert("A mezők maximum 30 karakter hosszúak lehetnek!");
      return false;
    }
    return true;
  }

  function createData() {
    const name = getEl("name").value.trim();
    const height = getEl("height").value.trim();
    const weight = getEl("weight").value.trim();

    if (!validateInput(name, height, weight)) return;

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `op=create&name=${name}&height=${height}&weight=${weight}&code=${CODE}`
    })
    .then(res => res.text())
    .then(res => showResponse("createResponse", res.includes("1") ? "Sikeres hozzáadás!" : "Nem sikerült!", res.includes("1")))
    .catch(err => showResponse("createResponse", err.message, false));
  }

  function getDataForId() {
    const id = getEl("updateId").value.trim();
    if (!id) {
      showResponse("updateResponse", "Adj meg egy ID-t!", false);
      return;
    }

    fetch(`${API_URL}?op=read&code=${CODE}`)
      .then(res => res.text())
      .then(text => {
        if (!text.trim()) throw new Error("Üres válasz.");
        const data = JSON.parse(text);
        const item = data.list.find(i => String(i.id) === id);
        if (item) {
          getEl("updateName").value = item.name;
          getEl("updateHeight").value = item.height;
          getEl("updateWeight").value = item.weight;
          showResponse("updateResponse", "Adat betöltve.", true);
        } else {
          showResponse("updateResponse", "Nincs ilyen ID!", false);
        }
      })
      .catch(err => showResponse("updateResponse", err.message, false));
  }

  function updateData() {
    const id = getEl("updateId").value.trim();
    const name = getEl("updateName").value.trim();
    const height = getEl("updateHeight").value.trim();
    const weight = getEl("updateWeight").value.trim();

    if (!validateInput(name, height, weight)) return;

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `op=update&id=${id}&name=${name}&height=${height}&weight=${weight}&code=${CODE}`
    })
    .then(res => res.text())
    .then(res => showResponse("updateResponse", res.includes("1") ? "Sikeres módosítás!" : "Nem sikerült!", res.includes("1")))
    .catch(err => showResponse("updateResponse", err.message, false));
  }

  function deleteData() {
    const id = getEl("deleteId").value.trim();

    if (!id) {
      showResponse("deleteResponse", "Adj meg egy ID-t!", false);
      return;
    }

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `op=delete&id=${id}&code=${CODE}`
    })
    .then(res => res.text())
    .then(res => showResponse("deleteResponse", res.includes("1") ? "Sikeres törlés!" : "Nem sikerült!", res.includes("1")))
    .catch(err => showResponse("deleteResponse", err.message, false));
  }
});
