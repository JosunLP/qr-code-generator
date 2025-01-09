<template>
  <div class="qr-download-container">
    <div class="download-controls">
      <label for="formatSelect">Wähle das Format:</label>
      <select id="formatSelect" v-model="selectedFormat">
        <option v-for="fmt in formats" :key="fmt" :value="fmt">
          {{ fmt.toUpperCase() }}
        </option>
      </select>
      <button @click="handleDownload">Download</button>
    </div>
    <p class="hint">
      Wähle ein Format aus und klicke auf "Download", um den QR-Code
      herunterzuladen.
    </p>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from "vue";
import QRCode from "qrcode";

// Die Elternkomponente übergibt uns den Eingabetext:
const props = defineProps<{
  inputValue: string;
}>();

// Mögliche Ausgabeformate.
// (Die Bibliothek `qrcode` unterstützt offiziell PNG und SVG.
//  Für JPEG, GIF, TIFF, WebP kann es zu Einschränkungen kommen.
//  Wir versuchen es dennoch über toDataURL mit passendem MIME-Typ.)
const formats = ["svg", "png", "jpeg", "gif", "tiff", "webp"] as const;

type FormatType = (typeof formats)[number]; // "svg" | "png" | "jpeg" | "gif" | "tiff" | "webp"

// aktuell ausgewähltes Format
const selectedFormat = ref<FormatType>("png");

// Hilfsfunktion, um eine Data-URL oder Blob-URL herunterzuladen.
function downloadFile(url: string, filename: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Hier legen wir mögliche MIME-Typen fest.
// Achtung: GIF, TIFF und WebP werden evtl. nicht überall
// problemlos funktionieren, da "qrcode" das nicht offiziell unterstützt.
const mimeTypes: Record<Exclude<FormatType, "svg">, string> = {
  png: "image/png",
  jpeg: "image/jpeg",
  gif: "image/gif",
  tiff: "image/tiff",
  webp: "image/webp",
};

async function handleDownload() {
  const input = props.inputValue.trim();
  if (!input) {
    // Wenn nichts eingegeben wurde, kein Download
    alert("Bitte zuerst einen Text oder eine URL eingeben!");
    return;
  }

  try {
    // Wir unterscheiden zwischen 'svg' (toString) und allen anderen Formaten (toDataURL).
    if (selectedFormat.value === "svg") {
      // 1) SVG erzeugen
      const svgString = await QRCode.toString(input, { type: "svg" });
      // 2) Konvertierung zu einem Blob + Blob-URL (damit wir es herunterladen können)
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      const blobUrl = URL.createObjectURL(blob);
      downloadFile(blobUrl, "qrcode.svg");
      URL.revokeObjectURL(blobUrl); // aufräumen
    } else {
      // Für alle anderen Formate versuchen wir die toDataURL-Methode.
      const dataUrl = await QRCode.toDataURL(input, {
        // Hier ggf. weitere Optionen wie errorCorrectionLevel, margin, width usw.
        errorCorrectionLevel: "H",
        margin: 2,
        width: 256,
      });
      // Data-URL direkt herunterladen
      // Wir erzeugen keinen Blob extra, da Data-URLs auch so geladen werden können.
      downloadFile(dataUrl, `qrcode.${selectedFormat.value}`);
    }
  } catch (err) {
    console.error("Fehler beim Erstellen des QR Codes:", err);
    alert(
      "Beim Erstellen oder Herunterladen des QR-Codes ist ein Fehler aufgetreten."
    );
  }
}
</script>

<script lang="ts">
import { defineComponent } from "vue";

// Hier definierst du einen "leeren" Default-Export
export default defineComponent({});
</script>

<style lang="scss" scoped>
.qr-download-container {
  margin-top: 1rem;

  .download-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;

    label {
      font-weight: 600;
    }

    select {
      padding: 0.3rem;
      border-radius: 4px;
      border: 1px solid #ccc;
    }

    button {
      padding: 0.4rem 0.8rem;
      border: none;
      border-radius: 4px;
      background-color: #4caf50;
      color: #fff;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        background-color: #45a049;
      }
    }
  }

  .hint {
    font-size: 0.9rem;
    color: #777;
  }
}
</style>
