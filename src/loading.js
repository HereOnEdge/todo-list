export default function loader() {
  document.querySelector(".main-screen").style.display = "flex";
  document.querySelector(".loader").remove();
}

export function startLoading() {
  const main = document.querySelector("main");
  const loadingContainer = document.createElement("div");
  loadingContainer.classList.add("loader");
  const loading1 = document.createElement("div");
  loading1.classList.add("loading");
  loading1.id = "loading1";
  const loading2 = document.createElement("div");
  loading2.classList.add("loading");
  loading2.id = "loading2";
  const loading3 = document.createElement("div");
  loading3.classList.add("loading");
  loading3.id = "loading3";
  loadingContainer.appendChild(loading1);
  loadingContainer.appendChild(loading2);
  loadingContainer.appendChild(loading3);
  main.appendChild(loadingContainer);
}
