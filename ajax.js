code="JT0PU6abc123";
url="http://gamf.nhely.hu/ajax1/";
var xmlHttp=new XMLHttpRequest();

function read() {
  document.getElementById("code").innerHTML="code="+code;
  xmlHttp.open("POST",url,true);
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  var params = "code="+code+"&op=read";
  xmlHttp.onreadystatechange = () => {
    if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      let data = xmlHttp.responseText;
      data = JSON.parse(data);
      let list = data.list;

      let sum = 0;
      let max = -Infinity;
      let count = 0;

      let str = "<h1>Read</h1>";
      str += "<p>Number of records: " + data.rowCount + "</p>";
      str += "<p>Last max " + data.maxNum + " records:</p>";
      str += `
        <table class="table table-striped table-bordered align-middle text-center">
          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>Név</th>
              <th>Súly</th>
              <th>Magasság</th>
              <th>Kód</th>
            </tr>
          </thead>
          <tbody>
      `;

      for(let i=0; i<list.length; i++) {
        let height = parseFloat(list[i].phone);
        if (!isNaN(height)) {
          sum += height;
          if (height > max) max = height;
          count++;
        }
        str += "<tr><td>" + list[i].id + "</td><td>" + list[i].name + "</td><td>" + list[i].city + "</td><td>" + list[i].phone + "</td><td>" + list[i].code + "</td></tr>";
      }

      str += "</tbody></table>";

      let avg = count > 0 ? (sum / count).toFixed(2) : 0;

      str += `
        <h2>Magasság statisztikák</h2>
        <table class="table table-bordered text-center">
          <thead class="table-secondary">
            <tr>
              <th>Összeg</th>
              <th>Átlag</th>
              <th>Legnagyobb</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${sum.toFixed(2)}</td>
              <td>${avg}</td>
              <td>${max}</td>
            </tr>
          </tbody>
        </table>
      `;

      document.getElementById("readDiv").innerHTML = str;
    }
  };
  xmlHttp.send(params);
}

function create(){
  nameStr = document.getElementById("name1").value;
  city = document.getElementById("city1").value;
  phone = document.getElementById("phone1").value;
  if(nameStr.length>0 && nameStr.length<=30 && city.length>0 && city.length<=30 && phone.length>0 && phone.length<=30 && code.length<=30){
    xmlHttp.open("POST",url,true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var params = "code="+code+"&op=create&name="+nameStr+"&city="+city+"&phone="+phone;
    xmlHttp.onreadystatechange = () => {
      if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        let data = xmlHttp.responseText;
        let str = data > 0 ? "Create successful!" : "Create NOT successful!";
        document.getElementById("createResult").innerHTML = str;
        document.getElementById("name1").value = "";
        document.getElementById("city1").value = "";
        document.getElementById("phone1").value = "";
        read();
      }
    };
    xmlHttp.send(params);
  } else {
    document.getElementById("createResult").innerHTML = "Validation error!!";
  }
}

function getDataForId() {
  xmlHttp.open("POST",url,true);
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  var params = "code="+code+"&op=read";
  xmlHttp.onreadystatechange = () => {
    if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      let data = xmlHttp.responseText;
      data = JSON.parse(data);
      let list = data.list;
      for(let i=0; i<list.length; i++) {
        if(list[i].id == document.getElementById("idUpd").value){
          document.getElementById("name2").value = list[i].name;
          document.getElementById("city2").value = list[i].city;
          document.getElementById("phone2").value = list[i].phone;
        }
      }
    }
  };
  xmlHttp.send(params);
}

function update(){
  id = document.getElementById("idUpd").value;
  nameStr = document.getElementById("name2").value;
  city = document.getElementById("city2").value;
  phone = document.getElementById("phone2").value;
  if(id.length>0 && id.length<=30 && nameStr.length>0 && nameStr.length<=30 && city.length>0 && city.length<=30 && phone.length>0 && phone.length<=30 && code.length<=30){
    xmlHttp.open("POST",url,true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var params = "code="+code+"&op=update&id="+id+"&name="+nameStr+"&city="+city+"&phone="+phone;
    xmlHttp.onreadystatechange = () => {
      if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        let data = xmlHttp.responseText;
        let str = data > 0 ? "Update successful!" : "Update NOT successful!";
        document.getElementById("updateResult").innerHTML = str;
        document.getElementById("idUpd").value = "";
        document.getElementById("name2").value = "";
        document.getElementById("city2").value = "";
        document.getElementById("phone2").value = "";
        read();
      }
    };
    xmlHttp.send(params);
  } else {
    document.getElementById("updateResult").innerHTML = "Validation error!!";
  }
}

function deleteF(){
  id = document.getElementById("idDel").value;
  if(id.length>0 && id.length<=30){
    xmlHttp.open("POST",url,true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var params = "code="+code+"&op=delete&id="+id;
    xmlHttp.onreadystatechange = () => {
      if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        let data = xmlHttp.responseText;
        let str = data > 0 ? "Delete successful!" : "Delete NOT successful!";
        document.getElementById("deleteResult").innerHTML = str;
        document.getElementById("idDel").value = "";
        read();
      }
    };
    xmlHttp.send(params);
  } else {
    document.getElementById("deleteResult").innerHTML = "Validation error!!";
  }
}

window.onload = function() {
  read();
};
