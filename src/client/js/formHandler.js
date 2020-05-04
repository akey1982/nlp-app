import { urlChecker } from "./urlChecker";
//Globals
const testUrl = "http://localhost:3000/test";
const baseUrl = "http://localhost:3000/send";
let urlData = {};




/**
 * @description handle data from frontend
 * @param {url} event opject
 */
async function handleSubmit(event) {
  event.preventDefault();
  // get value from input field
  let urlTosend = document.getElementById("name").value;

  if (urlChecker(urlTosend)) {
    urlData.url = urlTosend;
    const res = await postUrl(baseUrl, urlData);
    document.getElementById(
      "results"
    ).innerHTML = `Polarity is ${res.respdata.polarity} and Poloarity Confidence is ${res.respdata.polarityConfidence}`;
  } else {
    document.getElementById("results").innerHTML = "URL IS NOT VALID";
  }
}


/**
 * @description post data to server
 * @param {data} object with url data
 * @param {url} string url 
 */
async function postUrl(url, data = {}) {
  const serverRes = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const response = await serverRes.json();

  console.log(response);

  return response;
}

export { handleSubmit };
