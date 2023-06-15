import "./styles.css";

const table = document.getElementById("table");

async function getData() {
  const url =
    "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
  const dataPromise = await fetch(url);
  const dataJson = await dataPromise.json();

  const employmentUrl =
    "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065";
  const emplymentPromise = await fetch(employmentUrl);
  const employmentJson = await emplymentPromise.json();
  console.log(employmentJson);

  const municipality = Object.values(
    dataJson.dataset.dimension.Alue.category.label
  );
  const population = dataJson.dataset.value;
  const employment = employmentJson.dataset.value;

  for (let i = 0; i < 10; i++) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");

    td1.innerHTML = municipality[i];
    td2.innerHTML = population[i];
    td3.innerText = employment[i];
    td4.innerText = ((employment[i] / population[i]) * 100).toFixed(2) + "%";
    if (((employment[i] / population[i]) * 100).toFixed(2) > 45.0) {
      tr.setAttribute("class", "bigger");
    }

    if (((employment[i] / population[i]) * 100).toFixed(2) < 25.0) {
      tr.setAttribute("class", "smaller");
    }

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    table.appendChild(tr);
  }
}

getData();
