<template>
  <div class="qr-input-container">
    <!-- Auswahl, welcher Input-Typ -->
    <div class="field-group">
      <label for="inputType">{{ t("input.textUrl.inputType") }}:</label>
      <select id="inputType" v-model="inputType" @change="emitChanges">
        <option value="text">Text</option>
        <option value="url">URL</option>
        <option value="vcard">vCard</option>
        <option value="wifi">WiFi</option>
        <option value="email">E-Mail</option>
      </select>
    </div>

    <!-- 1) Text / URL -->
    <div v-if="inputType === 'text' || inputType === 'url'" class="field-group">
      <label for="inputValue">{{ t("input.textUrl.value") }}:</label>
      <input
        id="inputValue"
        type="text"
        v-model="inputValue"
        @input="emitChanges"
        :placeholder="t('input.textUrl.placeholder')"
      />
    </div>

    <!-- 2) vCard Felder -->
    <div v-else-if="inputType === 'vcard'" class="field-group vcard-fields">
      <!-- Vorname / Nachname -->
      <div>
        <label for="firstName">{{ t("input.vcard.firstName") }}</label>
        <input
          id="firstName"
          type="text"
          v-model="firstName"
          @input="emitChanges"
          placeholder="Max"
        />
      </div>
      <div>
        <label for="lastName">{{ t("input.vcard.lastName") }}</label>
        <input
          id="lastName"
          type="text"
          v-model="lastName"
          @input="emitChanges"
          placeholder="Mustermann"
        />
      </div>

      <!-- Nummern -->
      <div>
        <label for="mobile">{{ t("input.vcard.mobile") }}</label>
        <input
          id="mobile"
          type="tel"
          v-model="mobile"
          @input="emitChanges"
          placeholder="+49 123 456789"
        />
      </div>
      <div>
        <label for="phone">{{ t("input.vcard.phone") }}</label>
        <input
          id="phone"
          type="tel"
          v-model="phone"
          @input="emitChanges"
          placeholder="+49 40 123456"
        />
      </div>
      <div>
        <label for="fax">{{ t("input.vcard.fax") }}</label>
        <input
          id="fax"
          type="tel"
          v-model="fax"
          @input="emitChanges"
          placeholder="+49 40 987654"
        />
      </div>

      <!-- E-Mail -->
      <div>
        <label for="email">{{ t("input.vcard.email") }}</label>
        <input
          id="email"
          type="email"
          v-model="email"
          @input="emitChanges"
          placeholder="max@mustermann.de"
        />
      </div>

      <!-- Unternehmen -->
      <div>
        <label for="company">{{ t("input.vcard.company") }}</label>
        <input
          id="company"
          type="text"
          v-model="company"
          @input="emitChanges"
          placeholder="Mustermann GmbH"
        />
      </div>

      <!-- Adresse: Straße, Stadt, PLZ, Bundesland, Land -->
      <div>
        <label for="street">{{ t("input.vcard.street") }}</label>
        <input
          id="street"
          type="text"
          v-model="street"
          @input="emitChanges"
          placeholder="Musterstr. 123"
        />
      </div>
      <div>
        <label for="city">{{ t("input.vcard.city") }}</label>
        <input
          id="city"
          type="text"
          v-model="city"
          @input="emitChanges"
          placeholder="Hamburg"
        />
      </div>
      <div>
        <label for="zipcode">{{ t("input.vcard.zip") }}</label>
        <input
          id="zipcode"
          type="text"
          v-model="zipcode"
          @input="emitChanges"
          placeholder="20095"
        />
      </div>
      <div>
        <label for="state">{{ t("input.vcard.state") }}</label>
        <input
          id="state"
          type="text"
          v-model="state"
          @input="emitChanges"
          placeholder="Hamburg"
        />
      </div>
      <div>
        <label for="country">{{ t("input.vcard.country") }}</label>
        <input
          id="country"
          type="text"
          v-model="country"
          @input="emitChanges"
          placeholder="Deutschland"
        />
      </div>

      <!-- Webseite -->
      <div>
        <label for="website">{{ t("input.vcard.website") }}</label>
        <input
          id="website"
          type="url"
          v-model="website"
          @input="emitChanges"
          placeholder="https://www.mustermann.de"
        />
      </div>
    </div>

    <!-- 3) WiFi Felder -->
    <div v-else-if="inputType === 'wifi'" class="field-group wifi-fields">
      <div>
        <label for="networkName">{{ t("input.wifi.ssid") }}</label>
        <input
          id="networkName"
          type="text"
          v-model="networkName"
          @input="emitChanges"
          placeholder="WLAN-SSID"
        />
      </div>

      <div>
        <label for="hidden">{{ t("input.wifi.hidden") }}</label>
        <input
          id="hidden"
          type="checkbox"
          v-model="hidden"
          @change="emitChanges"
        />
      </div>

      <div>
        <label for="wifiPassword">{{ t("input.wifi.password") }}</label>
        <input
          id="wifiPassword"
          type="text"
          v-model="wifiPassword"
          @input="emitChanges"
          :placeholder="t('input.wifi.passwordPlaceholder')"
        />
      </div>

      <div>
        <label for="encryption">{{ t("input.wifi.security") }}</label>
        <select id="encryption" v-model="encryption" @change="emitChanges">
          <option value="none">{{ t("input.wifi.securityType.none") }}</option>
          <option value="WPA/WPA2">
            {{ t("input.wifi.securityType.wpa") }}
          </option>
          <option value="WEP">{{ t("input.wifi.securityType.wep") }}</option>
        </select>
      </div>
    </div>

    <!-- 4) E-Mail Felder -->
    <div v-else-if="inputType === 'email'" class="field-group email-fields">
      <label for="emailAddress">{{ t("input.email.adress") }}</label>
      <input
        id="emailAddress"
        type="email"
        v-model="emailAddress"
        @input="emitChanges"
        :placeholder="t('input.email.adressPlaceholder')"
      />

      <label for="emailSubject">{{ t("input.email.subject") }}</label>
      <input
        id="emailSubject"
        type="text"
        v-model="emailSubject"
        @input="emitChanges"
        :placeholder="t('input.email.subjectPlaceholder')"
      />

      <label for="emailBody">{{ t("input.email.body") }}</label>
      <textarea
        id="emailBody"
        rows="5"
        v-model="emailBody"
        @input="emitChanges"
        :placeholder="t('input.email.bodyPlaceholder')"
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from "vue";
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

<style lang="scss" scoped>
.qr-input-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  input,
  select,
  textarea {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
  }

  input:hover,
  select:hover,
  textarea:hover {
    border-color: #888;
  }

  /* vCard-Felder: 2-spaltiges Layout */
  .vcard-fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    > div {
      display: flex;
      flex-direction: column;
    }
  }

  /* WiFi-Felder: auch 2-spaltiges Layout */
  .wifi-fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    > div {
      display: flex;
      flex-direction: column;
    }
  }

  /* E-Mail-Felder: 1-spaltiges Layout */
  .email-fields {
    display: flex;
    flex-direction: column;
  }
}
</style>
