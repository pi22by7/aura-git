const CreateMarker = ({ url, title, navigate }) => {
  console.log(url, title, navigate);
  const ele = document.createElement("div");
  ele.style.cursor = "pointer";
  ele.style.color = "red";
  ele.style.width = "35px";
  ele.title = title;

  // create a image element
  // const img = document.createElement("img");
  // img.src = "../marker.png";
  // img.style.width = "100%";
  // img.style.height = "100%";
  // img.style.objectFit = "contain";

  // ele.appendChild(img);

  // on click, navigate to the url
  ele.addEventListener("click", () => {
    navigate(url);
  });

  // on mouse over, show the details
  // ele.addEventListener("mouseover", () => {
  //   detRef.current.classList.remove("hidden");
  // });

  // on mouse out, hide the details
  // ele.addEventListener("mouseout", () => {
  //   detRef.current.classList.add("hidden");
  // });

  return ele;
};

export default CreateMarker;
