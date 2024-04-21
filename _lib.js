export const tokenize = (value) => {
  value = value
    .toLowerCase()
    .replace(/\n/g, " ")
    .replace(/[?!;@#$%&]/g, " $& ")
    .replace(/[\]\[\(\)\{\}<>]/g, " $& ")
    .replace(/('s|'m|'d|'ll|'re|'ve|n't) /gi, " $1 ")
    .replace(/\. /g, " . ")
    .replace(/['’] /g, " ' ")
    .replace(/["“”]/g, " '' ");
  value = value
    .replaceAll("esp32", "esp 32")
    .replaceAll("esp8266", "esp 8266")
    .replaceAll("dht22", "dht 22")
    .replaceAll("dht11", "dht 11")
    .replaceAll("b-parasite", "b parasite")
    .replaceAll("nfc/rfid", "nfc rfid")
    .replaceAll("fastled", "fast led")
    .replaceAll("neopixelbus", "neopixel bus")
    .replaceAll("neopixel", "neo pixel")
    .replaceAll("h-bridge", "h bridge")
    .replaceAll("rgbw", "rgb white")
    .replaceAll("rgbww", "rgb cold warm")
    .replaceAll("rgbct", "rgb temperature brightness")
    .replaceAll("cannot", "can not")
    .replaceAll("addressable", "addressed");
  return value.replace(/\s+/g, " ").trim().split(" ");
};
