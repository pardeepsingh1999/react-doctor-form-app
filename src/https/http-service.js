import { getToken } from "./token-interceptor";

// const structureQueryParams = params => {
//     let queryStrings = "?";
//     const keys = Object.keys(params);
//     keys.forEach((key, index) => {
//       queryStrings += key + "=" + params[key];
//       if (params[keys[index + 1]]) {
//         queryStrings += "&";
//       }
//     });
//     return queryStrings;
// };

export const makePostRequest = async (
    url,
    attachToken = false,
    body = {}
  ) => {
    
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    if (attachToken) {
      try {
        const authToken = await getToken();
        if (authToken) {
          // console.log(authToken);
          headers["Authorization"] = "Bearer " + authToken;
        }
      } catch (e) {
        console.log(e);
      }
    }
    return new Promise((resolve, reject) => {
      try {
        fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body)
        })
          .then(res => res.json())
          .then(jsonResponse => {
            if (jsonResponse.error === false) { // change this condition according to response structure
              resolve(jsonResponse);
            } else {
              console.log(jsonResponse);
              reject(jsonResponse);
            }
          })
          .catch(e => {
            console.log("XHR GET Error: ", e);
            reject(e);
          });
      } catch (e) {
        console.log(e);
        reject();
      }
    });
};
  
  