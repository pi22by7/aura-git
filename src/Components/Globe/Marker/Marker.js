const CreateMarker = ({ marker, url, title, navigate }) => {
  const ele = document.createElement("div");
  ele.style.cursor = "pointer";
  ele.style["pointer-events"] = "auto";
  ele.style.color = "red";
  ele.style.width = "35px";
  ele.innerHTML = marker;
  ele.title = title;
  console.log(url, title);

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
