import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
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
  let message;
  if (error.response) {
    message = error.response.data?.message;
  }
  Toast.fire({
    icon: "error",
    title: message,
  });
};

export const infoPopup = (message) => {
  Toast.fire({
    icon: "info",
    title: message,
  });
};

export const rupiahFormat = (num) => `Rp. ${num?.toLocaleString("id-ID")},00`;
export const dateFormat = (date) => {
  if (date) {
    const d = new Date(date);
    return d.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
};
