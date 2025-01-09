<template>
  <div class="qr-preview-container">
    <div v-if="qrCodeData" class="qr-code-wrapper">
      <img :src="qrCodeData" alt="QR Code Preview" />
    </div>
    <div v-else class="placeholder">
      <p>{{ t("preview.dummyText") }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, watch } from "vue";
import QRCode from "qrcode";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
  inputValue: string;
  inputType: "text" | "url" | "vcard" | "wifi" | "email";
}>();

const qrCodeData = ref<string>("");

async function generateQrCode(value: string) {
  try {
    qrCodeData.value = await QRCode.toDataURL(value, {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 256,
    });
  } catch (err) {
    console.error("Fehler bei der QR-Code-Generierung:", err);
    qrCodeData.value = "";
  }
}

watch(
  () => props.inputValue,
  (newVal) => {
    if (newVal.trim().length === 0) {
      qrCodeData.value = "";
      return;
    }
    generateQrCode(newVal);
  },
  { immediate: true }
);
</script>

<script lang="ts">
import { defineComponent } from "vue";

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
