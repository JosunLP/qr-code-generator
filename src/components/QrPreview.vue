<template>
  <div class="flex flex-col items-center">
    <div v-if="qrCodeData" class="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm">
      <img
        :src="qrCodeData"
        :alt="t('preview.altText')"
        class="w-48 h-48 sm:w-64 sm:h-64"
        role="img"
        :aria-label="t('preview.altText')"
      />
    </div>
    <div
      v-else
      class="flex items-center justify-center w-48 h-48 sm:w-64 sm:h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300"
      role="status"
      aria-live="polite"
    >
      <p class="text-gray-500 text-sm text-center px-4 italic">
        {{ t("preview.dummyText") }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import QRCode from "qrcode";
  import { ref, watch } from "vue";
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
