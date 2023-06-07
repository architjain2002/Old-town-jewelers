import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import './Toaster.css';

const Toast = withReactContent(Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  onOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
    customClass: {
        container: 'my-toast-container',
      },
  zIndex:1000
}));

const makeToast = (type, msg) => {
  Toast.fire({
    icon: type,
    title: msg
  });
};

export default makeToast;