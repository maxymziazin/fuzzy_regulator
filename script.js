input1.value = +localStorage.getItem("key1");
input2.value = +localStorage.getItem("key2");
input3.value = (+localStorage.getItem("key3")).toFixed(3);

button.onclick = function () {
  localStorage.setItem("key1", input1.value);
  localStorage.setItem("key2", input2.value);

  location.reload();
};
