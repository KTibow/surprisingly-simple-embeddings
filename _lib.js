export const tokenize = (value) => {
  value = value
    .toLowerCase()
    .replace(/\n/g, " ")
    .replace(/[?!;@#$%&]/g, " $& ")
    .replace(/[\]\[\(\)\{\}<>]/g, " $& ")
    .replace(/('s|'m|'d|'ll|'re|'ve|n't) /gi, " $1 ")
    .replace(/\, /g, " , ")
    .replace(/\. /g, " . ")
    .replace(/['’] /g, " ' ")
    .replace(/["“”]/g, " '' ");
  value = value.replace(/[-+]?[.\d]*[\d]+[:,.\d]*|²/g, " <number> ");
  value = value
    .replaceAll("b-parasite", "b parasite")
    .replaceAll("nfc/rfid", "nfc rfid")
    .replaceAll("fastled", "fast led")
    .replaceAll("neopixelbus", "neopixel bus")
    .replaceAll("neopixel", "neo pixel")
    .replaceAll("h-bridge", "h bridge")
    .replaceAll("eco_", "co")
    .replaceAll("co_", "co")
    .replaceAll("rgbw", "rgb white")
    .replaceAll("rgbww", "rgb cold warm")
    .replaceAll("rgbct", "rgb temperature brightness")
    .replaceAll("faqs", "frequently asked questions")
    .replaceAll("faq", "frequently asked questions")
    .replaceAll("cannot", "can not")
    .replaceAll("addressable", "addressed")
    .replaceAll("automations", "automation")
    .replace(/\bha\b/g, "home assistant")
    .replace(/\badc\b/g, "analog digital converter");
  return value.replace(/\s+/g, " ").trim().split(" ");
};
