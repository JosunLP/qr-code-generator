<template>
  <div class="inline-flex items-center gap-2">
    <label for="language-select" class="sr-only">{{ t("language.select") }}</label>
    <select
      id="language-select"
      v-model="currentLocale"
      @change="changeLocale"
      class="form-select text-sm py-2 pr-8 pl-3"
      :aria-label="t('language.select')"
    >
      <option value="en">🇬🇧 {{ t("language.en") }}</option>
      <option value="de">🇩🇪 {{ t("language.de") }}</option>
      <option value="fr">🇫🇷 {{ t("language.fr") }}</option>
      <option value="es">🇪🇸 {{ t("language.es") }}</option>
      <option value="it">🇮🇹 {{ t("language.it") }}</option>
      <option value="pt">🇧🇷 {{ t("language.pt") }}</option>
      <option value="nl">🇳🇱 {{ t("language.nl") }}</option>
      <option value="pl">🇵🇱 {{ t("language.pl") }}</option>
      <option value="ru">🇷🇺 {{ t("language.ru") }}</option>
      <option value="sv">🇸🇪 {{ t("language.sv") }}</option>
      <option value="zh">🇨🇳 {{ t("language.zh") }}</option>
      <option value="ja">🇯🇵 {{ t("language.ja") }}</option>
      <option value="ko">🇰🇷 {{ t("language.ko") }}</option>
      <option value="tr">🇹🇷 {{ t("language.tr") }}</option>
      <option value="ar">🇸🇦 {{ t("language.ar") }}</option>
      <option value="hi">🇮🇳 {{ t("language.hi") }}</option>
      <option value="cs">🇨🇿 {{ t("language.cs") }}</option>
      <option value="el">🇬🇷 {{ t("language.el") }}</option>
      <option value="hu">🇭🇺 {{ t("language.hu") }}</option>
      <option value="ro">🇷🇴 {{ t("language.ro") }}</option>
      <option value="uk">🇺🇦 {{ t("language.uk") }}</option>
      <option value="vi">🇻🇳 {{ t("language.vi") }}</option>
      <option value="th">🇹🇭 {{ t("language.th") }}</option>
      <option value="id">🇮🇩 {{ t("language.id") }}</option>
      <option value="da">🇩🇰 {{ t("language.da") }}</option>
      <option value="no">🇳🇴 {{ t("language.no") }}</option>
      <option value="fi">🇫🇮 {{ t("language.fi") }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { useI18n } from "vue-i18n";

  const { locale, t } = useI18n();

  const currentLocale = ref(locale.value);
  locale.value = currentLocale.value;

  function changeLocale() {
    locale.value = currentLocale.value;
  }
</script>

<script lang="ts">
  import { defineComponent } from "vue";
  export default defineComponent({});
</script>
