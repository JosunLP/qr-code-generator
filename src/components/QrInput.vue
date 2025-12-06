<template>
  <div class="space-y-6">
    <!-- Input Type Selection -->
    <div>
      <label for="inputType" class="form-label">
        {{ t("input.textUrl.inputType") }}
      </label>
      <select
        id="inputType"
        v-model="inputType"
        @change="emitChanges"
        class="form-select"
        aria-describedby="inputType-help"
      >
        <option value="text">{{ t("input.types.text") }}</option>
        <option value="url">{{ t("input.types.url") }}</option>
        <option value="vcard">{{ t("input.types.vcard") }}</option>
        <option value="wifi">{{ t("input.types.wifi") }}</option>
        <option value="email">{{ t("input.types.email") }}</option>
      </select>
    </div>

    <!-- 1) Text / URL -->
    <div v-if="inputType === 'text' || inputType === 'url'">
      <label for="inputValue" class="form-label">
        {{ t("input.textUrl.value") }}
      </label>
      <input
        id="inputValue"
        type="text"
        v-model="inputValue"
        @input="emitChanges"
        :placeholder="t('input.textUrl.placeholder')"
        class="form-input"
        :aria-label="t('input.textUrl.value')"
      />
    </div>

    <!-- 2) vCard Fields -->
    <div v-else-if="inputType === 'vcard'" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label for="firstName" class="form-label">{{ t("input.vcard.firstName") }}</label>
        <input
          id="firstName"
          type="text"
          v-model="firstName"
          @input="emitChanges"
          :placeholder="t('input.vcard.placeholders.firstName')"
          class="form-input"
        />
      </div>
      <div>
        <label for="lastName" class="form-label">{{ t("input.vcard.lastName") }}</label>
        <input
          id="lastName"
          type="text"
          v-model="lastName"
          @input="emitChanges"
          :placeholder="t('input.vcard.placeholders.lastName')"
          class="form-input"
        />
      </div>
      <div>
        <label for="mobile" class="form-label">{{ t("input.vcard.mobile") }}</label>
        <input
          id="mobile"
          type="tel"
          v-model="mobile"
          @input="emitChanges"
          :placeholder="t('input.vcard.placeholders.mobile')"
          class="form-input"
          autocomplete="tel"
        />
      </div>
      <div>
        <label for="phone" class="form-label">{{ t("input.vcard.phone") }}</label>
        <input
          id="phone"
          type="tel"
          v-model="phone"
          @input="emitChanges"
          :placeholder="t('input.vcard.placeholders.phone')"
          class="form-input"
          autocomplete="tel"
        />
      </div>
      <div>
        <label for="fax" class="form-label">{{ t("input.vcard.fax") }}</label>
        <input
          id="fax"
          type="tel"
          v-model="fax"
          @input="emitChanges"
          :placeholder="t('input.vcard.placeholders.fax')"
          class="form-input"
        />
      </div>
      <div>
        <label for="email" class="form-label">{{ t("input.vcard.email") }}</label>
        <input
          id="email"
          type="email"
          v-model="email"
          @input="emitChanges"
          :placeholder="t('input.vcard.placeholders.email')"
          class="form-input"
          autocomplete="email"
        />
      </div>
      <div class="sm:col-span-2">
        <label for="company" class="form-label">{{ t("input.vcard.company") }}</label>
        <input
          id="company"
          type="text"
          v-model="company"
          @input="emitChanges"
          :placeholder="t('input.vcard.placeholders.company')"
          class="form-input"
          autocomplete="organization"
        />
      </div>
      <div class="sm:col-span-2">
        <label for="street" class="form-label">{{ t("input.vcard.street") }}</label>
        <input
          id="street"
          type="text"
          v-model="street"
          @input="emitChanges"
          :placeholder="t('input.vcard.placeholders.street')"
          class="form-input"
          autocomplete="street-address"
        />
      </div>
      <div>
        <label for="zipcode" class="form-label">{{ t("input.vcard.zip") }}</label>
        <input
          id="zipcode"
          type="text"
          v-model="zipcode"
          @input="emitChanges"
          :placeholder="t('input.vcard.placeholders.zip')"
          class="form-input"
          autocomplete="postal-code"
        />
      </div>
      <div>
        <label for="city" class="form-label">{{ t("input.vcard.city") }}</label>
        <input
          id="city"
          type="text"
          v-model="city"
          @input="emitChanges"
          :placeholder="t('input.vcard.placeholders.city')"
          class="form-input"
          autocomplete="address-level2"
        />
      </div>
      <div>
        <label for="state" class="form-label">{{ t("input.vcard.state") }}</label>
        <input
          id="state"
          type="text"
          v-model="state"
          @input="emitChanges"
          :placeholder="t('input.vcard.placeholders.state')"
          class="form-input"
          autocomplete="address-level1"
        />
      </div>
      <div>
        <label for="country" class="form-label">{{ t("input.vcard.country") }}</label>
        <input
          id="country"
          type="text"
          v-model="country"
          @input="emitChanges"
          :placeholder="t('input.vcard.placeholders.country')"
          class="form-input"
          autocomplete="country-name"
        />
      </div>
      <div class="sm:col-span-2">
        <label for="website" class="form-label">{{ t("input.vcard.website") }}</label>
        <input
          id="website"
          type="url"
          v-model="website"
          @input="emitChanges"
          :placeholder="t('input.vcard.placeholders.website')"
          class="form-input"
          autocomplete="url"
        />
      </div>
    </div>

    <!-- 3) WiFi Fields -->
    <div v-else-if="inputType === 'wifi'" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="sm:col-span-2">
        <label for="networkName" class="form-label">{{ t("input.wifi.ssid") }}</label>
        <input
          id="networkName"
          type="text"
          v-model="networkName"
          @input="emitChanges"
          :placeholder="t('input.wifi.placeholders.ssid')"
          class="form-input"
        />
      </div>
      <div>
        <label for="wifiPassword" class="form-label">{{ t("input.wifi.password") }}</label>
        <input
          id="wifiPassword"
          type="password"
          v-model="wifiPassword"
          @input="emitChanges"
          :placeholder="t('input.wifi.passwordPlaceholder')"
          class="form-input"
          autocomplete="off"
        />
      </div>
      <div>
        <label for="encryption" class="form-label">{{ t("input.wifi.security") }}</label>
        <select id="encryption" v-model="encryption" @change="emitChanges" class="form-select">
          <option value="none">{{ t("input.wifi.securityType.none") }}</option>
          <option value="WPA/WPA2">
            {{ t("input.wifi.securityType.wpa") }}
          </option>
          <option value="WEP">{{ t("input.wifi.securityType.wep") }}</option>
        </select>
      </div>
      <div class="flex items-center gap-3 sm:col-span-2">
        <input
          id="hidden"
          type="checkbox"
          v-model="hidden"
          @change="emitChanges"
          class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
        />
        <label for="hidden" class="text-sm font-medium text-gray-700">
          {{ t("input.wifi.hidden") }}
        </label>
      </div>
    </div>

    <!-- 4) E-Mail Fields -->
    <div v-else-if="inputType === 'email'" class="space-y-4">
      <div>
        <label for="emailAddress" class="form-label">{{ t("input.email.adress") }}</label>
        <input
          id="emailAddress"
          type="email"
          v-model="emailAddress"
          @input="emitChanges"
          :placeholder="t('input.email.placeholders.address')"
          class="form-input"
          autocomplete="email"
        />
      </div>
      <div>
        <label for="emailSubject" class="form-label">{{ t("input.email.subject") }}</label>
        <input
          id="emailSubject"
          type="text"
          v-model="emailSubject"
          @input="emitChanges"
          :placeholder="t('input.email.subjectPlaceholder')"
          class="form-input"
        />
      </div>
      <div>
        <label for="emailBody" class="form-label">{{ t("input.email.body") }}</label>
        <textarea
          id="emailBody"
          rows="4"
          v-model="emailBody"
          @input="emitChanges"
          :placeholder="t('input.email.bodyPlaceholder')"
          class="form-textarea"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { useI18n } from "vue-i18n";

  const { t } = useI18n();

  // Erweitere den Typ, damit wir alles abdecken
  type InputMode = "text" | "url" | "vcard" | "wifi" | "email";

  const emit = defineEmits<{
    (event: "update:inputValue", value: string): void;
    (event: "update:inputType", type: InputMode): void;
  }>();

  const inputValue = ref("");
  const inputType = ref<InputMode>("text");

  /** vCard-Felder */
  const firstName = ref("");
  const lastName = ref("");
  const mobile = ref("");
  const phone = ref("");
  const fax = ref("");
  const email = ref("");
  const company = ref("");
  const street = ref("");
  const city = ref("");
  const zipcode = ref("");
  const state = ref("");
  const country = ref("");
  const website = ref("");

  /** WiFi-Felder */
  const networkName = ref("");
  const hidden = ref(false);
  const wifiPassword = ref("");
  const encryption = ref<"none" | "WPA/WPA2" | "WEP">("none");

  /** E-Mail-Felder */
  const emailAddress = ref("");
  const emailSubject = ref("");
  const emailBody = ref("");

  /**
   * 1) vCard-String zusammenbauen
   *    Version 3.0, Felder aus der Liste.
   */
  function buildVcardString(): string {
    return `BEGIN:VCARD
VERSION:3.0
N:${lastName.value};${firstName.value};;;
FN:${firstName.value} ${lastName.value}
TEL;TYPE=CELL,voice:${mobile.value}
TEL;TYPE=WORK,voice:${phone.value}
TEL;TYPE=FAX,work:${fax.value}
EMAIL;TYPE=WORK:${email.value}
ORG:${company.value}
ADR;TYPE=WORK:;;${street.value};${city.value};${state.value};${zipcode.value};${country.value}
URL:${website.value}
END:VCARD`;
  }

  /**
   * 2) WiFi-String (WIFI:T:<TYPE>;S:<SSID>;P:<PASS>;H:true;;)
   */
  function buildWifiString(): string {
    let type = "";
    if (encryption.value === "WPA/WPA2") {
      type = "WPA";
    } else if (encryption.value === "WEP") {
      type = "WEP";
    }

    const hiddenFlag = hidden.value ? ";H:true" : "";
    const pass = wifiPassword.value ? `;P:${wifiPassword.value}` : "";

    return `WIFI:T:${type};S:${networkName.value}${pass}${hiddenFlag};;`;
  }

  /**
   * 3) E-Mail (mailto:someone@example.com?subject=Betreff&body=Nachricht)
   */
  function buildEmailString(): string {
    const encSubject = encodeURIComponent(emailSubject.value);
    const encBody = encodeURIComponent(emailBody.value);

    return `mailto:${emailAddress.value}?subject=${encSubject}&body=${encBody}`;
  }

  /**
   * 4) Hauptmethode, die immer aufgerufen wird,
   *    sobald Eingaben erfolgen
   */
  function emitChanges() {
    if (inputType.value === "vcard") {
      emit("update:inputValue", buildVcardString());
    } else if (inputType.value === "wifi") {
      emit("update:inputValue", buildWifiString());
    } else if (inputType.value === "email") {
      emit("update:inputValue", buildEmailString());
    } else {
      // "text" oder "url"
      emit("update:inputValue", inputValue.value);
    }

    // Auch den Typ weitergeben
    emit("update:inputType", inputType.value);
  }
</script>

<script lang="ts">
  import { defineComponent } from "vue";
  export default defineComponent({});
</script>
