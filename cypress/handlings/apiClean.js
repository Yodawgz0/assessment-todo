const CleanUser = () => {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer " + localStorage.getItem("seessionkey")
  );

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("https://api-nodejs-todolist.herokuapp.com/user/me", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result._id;
    })
    .catch((error) => {
      console.log("error", error);
      return false;
    });
};

export default CleanUser;
