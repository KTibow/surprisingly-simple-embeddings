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
  value = value
    .replaceAll("²", "2")
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
  value = value.replace(/[-+]?[.\d]*[\d]+[:,.\d]*/g, " <number> ");
  return value.replace(/\s+/g, " ").trim().split(" ");
};
