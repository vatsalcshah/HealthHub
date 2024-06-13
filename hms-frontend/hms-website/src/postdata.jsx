export function PostData(userData, BaseUrl) {
    return new Promise((resolve, reject) => {
      fetch(BaseUrl, {
        method: "POST",
        body: userData
      })
        .then(response => response.json())
        .then(responseJson => {
          resolve(responseJson);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  
  /* export function PostData(userData) {
    let BaseUrl = "http://localhost/login/api/demo.php";
       var formData = new FormData();
    formData.append("content", "test2", "ds", "test2");
  
    return new Promise((resolve, reject) => {
      fetch(BaseUrl, {
        method: "POST",
        body: JSON.stringify(userData)
      })
        .then(response => response.json())
        .then(responseJson => {
          resolve(responseJson);
        })
        .catch(error => {
          reject(error);
        });
    });
  } */
  