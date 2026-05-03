import { registerSW } from "virtual:pwa-register";
import { showToast } from "./toastConfig";

let updateAlreadyNotified = false;

export function setupPwaUpdater() {
  if (typeof window === "undefined") return;

  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      if (updateAlreadyNotified) return;
      updateAlreadyNotified = true;

      showToast.info("Nova versão disponível. Atualizando...", {
        autoClose: 2500,
      });

      setTimeout(() => {
        updateSW(true);
      }, 1200);
    },
    onOfflineReady() {
      showToast.success("App pronto para uso offline.", { autoClose: 2000 });
    },
  });
}
