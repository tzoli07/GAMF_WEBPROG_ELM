document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "http://gamf.nhely.hu/ajax2/";
    const CODE = "JT0PU6ukm049";

    document.getElementById("loadData").addEventListener("click", loadData);
    document.getElementById("create").addEventListener("click", createData);
    document.getElementById("getDataForId").addEventListener("click", getDataForId);
    document.getElementById("update").addEventListener("click", updateData);
    document.getElementById("delete").addEventListener("click", deleteData);

    function loadData() {
    fetch(`${API_URL}?op=read&code=${CODE}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Hiba: ${response.status} - ${response.statusText}`);
            }
            return response.text(); // Először szövegként olvassuk be
        })
        .then(text => {
            console.log("Kapott nyers válasz:", text); // Ellenőrzés a konzolon
            if (!text.trim()) {
                throw new Error("Üres válasz érkezett az API-tól.");
            }
            return JSON.parse(text); // Kézzel alakítjuk JSON-ná
        })
        .then(data => {
            if (!data.list) {
                document.getElementById("dataList").innerHTML = "Nincs adat!";
                return;
            }
            const list = document.getElementById("dataList");
            list.innerHTML = "";
            let totalHeight = 0, maxHeight = 0;
            data.list.forEach(item => {
                const li = document.createElement("li");
                li.textContent = `ID: ${item.id}, Név: ${item.name}, Magasság: ${item.height}, Súly: ${item.weight}`;
                list.appendChild(li);
                totalHeight += parseInt(item.height);
                if (parseInt(item.height) > maxHeight) maxHeight = parseInt(item.height);
            });
            document.getElementById("stats").textContent = 
                `Összmagasság: ${totalHeight}, Átlag: ${(totalHeight / data.list.length).toFixed(2)}, Legnagyobb: ${maxHeight}`;
        })
        .catch(error => console.error("Hiba történt az API hívás során:", error));
}



    function createData() {
        const name = document.getElementById("name").value;
        const height = document.getElementById("height").value;
        const weight = document.getElementById("weight").value;
        if (!validateInput(name, height, weight)) return;

        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `op=create&name=${name}&height=${height}&weight=${weight}&code=${CODE}`
        }).then(response => response.text())
          .then(result => document.getElementById("createResponse").textContent = result);
    }

    function getDataForId() {
        const id = document.getElementById("updateId").value;
        fetch(`${API_URL}?op=read&code=${CODE}`)
            .then(response => response.json())
            .then(data => {
                const item = data.list.find(item => item.id === id);
                if (item) {
                    document.getElementById("updateName").value = item.name;
                    document.getElementById("updateHeight").value = item.height;
                    document.getElementById("updateWeight").value = item.weight;
                }
            });
    }

    function updateData() {
        const id = document.getElementById("updateId").value;
        const name = document.getElementById("updateName").value;
        const height = document.getElementById("updateHeight").value;
        const weight = document.getElementById("updateWeight").value;
        if (!validateInput(name, height, weight)) return;

        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `op=update&id=${id}&name=${name}&height=${height}&weight=${weight}&code=${CODE}`
        }).then(response => response.text())
          .then(result => document.getElementById("updateResponse").textContent = result);
    }

    function deleteData() {
        const id = document.getElementById("deleteId").value;
        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `op=delete&id=${id}&code=${CODE}`
        }).then(response => response.text())
          .then(result => document.getElementById("deleteResponse").textContent = result);
    }

    function validateInput(name, height, weight) {
        if (!name || !height || !weight) {
            alert("Minden mezőt ki kell tölteni!");
            return false;
        }
        if (name.length > 30 || height.length > 30 || weight.length > 30) {
            alert("A mezők maximum 30 karakter hosszúak lehetnek!");
            return false;
        }
        return true;
    }
});
