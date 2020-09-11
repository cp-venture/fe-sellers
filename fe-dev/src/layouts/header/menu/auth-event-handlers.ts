import { openModal, closeModal } from '@redq/reuse-modal';

window.addEventListener("GuestAuthSuccess", (e)=>{
  console.log(e, "areeee had h be ye kaam krne lag gya bc")
  closeModal()
}, false);

