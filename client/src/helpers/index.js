import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  color: "white",
  background: "black",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
    toast.addEventListener("click", Swal.close);
  },
});

export const successPopup = (success) => {
  Toast.fire({
    icon: "success",
    title: success,
  });
};

export const errorPopup = (error) => {
  console.log(error);
  let message;
  if (error.response) {
    message = error.response.data?.message;
  }
  Toast.fire({
    icon: "error",
    title: message,
  });
};
