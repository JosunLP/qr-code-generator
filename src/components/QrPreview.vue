<template>
  <div class="qr-preview-container">
    <!-- Wenn ein QR-Code generiert wurde, zeigen wir ihn an -->
    <div v-if="qrCodeData" class="qr-code-wrapper">
      <img :src="qrCodeData" alt="QR Code Preview" />
    </div>
    <!-- Falls noch nichts eingegeben wurde, gibt's einen Hinweis -->
    <div v-else class="placeholder">
      <p>Dein QR Code erscheint hier, sobald du Text oder eine URL eingibst.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, watch } from "vue";
import QRCode from "qrcode";

// Props definieren: Wir erwarten den Nutzereingabewert und den Eingabetyp
const props = defineProps<{
  inputValue: string;
  inputType: "text" | "url";
}>();

// Hier speichern wir das generierte Base64-Bild (Data URL).
const qrCodeData = ref<string>("");

// Die Funktion zur QR-Code-Erzeugung. Sie nimmt den Eingabewert
// und generiert daraus einen Data URL (PNG-Format).
async function generateQrCode(value: string) {
  try {
    qrCodeData.value = await QRCode.toDataURL(value, {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 256,
      // ggf. weitere Optionen, z.B. color, etc.
    });
  } catch (err) {
    console.error("Fehler bei der QR-Code-Generierung:", err);
    qrCodeData.value = "";
  }
}

// Wir überwachen Änderungen an inputValue.
// Sobald sich inputValue ändert, erzeugen wir neu.
watch(
  () => props.inputValue,
  (newVal) => {
    // Wenn gar nichts drinsteht, löschen wir auch den QR-Code.
    if (newVal.trim().length === 0) {
      qrCodeData.value = "";
      return;
    }
    // Falls du bei "URL" optional validieren möchtest, könntest du das hier tun.
    // Ansonsten generieren wir direkt.
    generateQrCode(newVal);
  },
  { immediate: true } // auch beim Initialisieren direkt einmal ausführen
);
</script>

<script lang="ts">
import { defineComponent } from "vue";

// Hier definierst du einen "leeren" Default-Export
export default defineComponent({});
</script>

<style lang="scss" scoped>
.qr-preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;

  .qr-code-wrapper {
    border: 2px solid #ccc;
    padding: 1rem;
    border-radius: 8px;

    img {
      display: block;
      width: 256px;
      height: 256px;
      /* oder "height: auto;", wenn du die Proportionen dynamisch halten möchtest */
    }
  }

  .placeholder {
    margin-top: 1rem;
    color: #888;
    text-align: center;
    font-style: italic;
  }
}
</style>
