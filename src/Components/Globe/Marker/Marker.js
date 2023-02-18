const Marker = ({ marker, url, navigate, detRef }) => {
  const ele = document.createElement("a");
  ele.style["pointer-events"] = "auto";
  ele.style.cursor = "pointer";
  ele.style.color = "red";
  ele.innerHTML = marker;
  ele.style.width = "30px";

  // on click, navigate to the url
  ele.addEventListener("click", () => {
    navigate(url);
  });

  // on mouse over, show the details
  ele.addEventListener("mouseover", () => {
    detRef.current.classList.remove("hidden");
  });

  // on mouse out, hide the details
  ele.addEventListener("mouseout", () => {
    detRef.current.classList.add("hidden");
  });

  return ele;
};

export default Marker;
