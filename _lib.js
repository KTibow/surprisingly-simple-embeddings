const CONTRACTIONS = [
  /\b(can)(not)\b/i,
  /\b(d)('ye)\b/i,
  /\b(gim)(me)\b/i,
  /\b(gon)(na)\b/i,
  /\b(got)(ta)\b/i,
  /\b(lem)(me)\b/i,
  /\b(more)('n)\b/i,
  /\b(wan)(na) /i,
  /\ ('t)(is)\b/i,
  /\ ('t)(was)\b/i,
];

export const tokenize = (value) => {
  value = value
    .toLowerCase()
    .replace(/\n/g, " ")

    // == STARTING QUOTES =============================================
    // Attempt to get correct directional quotes.

    // Replace quotes at the sentence start position, with double
    // ticks.
    // '"Sure", he said.' => '``Sure", he said.'
    .replace(/^\"/, "``")

    // When a single quote appears just after the previously inserted
    // double ticks, replace it with a space character.
    // "\"'Good morning, Dave,' said Hal \" recalled Frank." =>
    // "`` Good morning, Dave,' said Hal \" recalled Frank."
    // .replace( /(``)'/, '$1 ' )

    // Wrap spaces around a double quote preceded by opening brackets.
    // '<> denotes an inequation ("not equal to")' =>
    // '<> denotes an inequation ( `` not equal to")'
    .replace(/([ (\[{<])"/g, "$1 `` ")

    // == PUNCTUATION =================================================
    // Wrap spaces around an ellipsis (not the unicode character, but
    // three actual full stops).
    // 'She is secure, but he is...' => 'She is secure, but he is ... '
    .replace(/\.\.\./g, " ... ")

    // Wrap spaces around some punctuation signs (semicolon, at sign,
    // hash sign, dollar, percent, and ampersand).
    // 'AT&T' => 'AT & T'
    .replace(/[;@#$%&]/g, " $& ")

    // Wrap spaces around a full-stop and zero or more closing brackets
    // (or quotes), WHEN NOT preceded by a full-stop and WHEN followed
    // by the end of the string.
    // Here we assume sentence tokenization has been done first, so we
    // only split final periods.
    // '<> denotes an inequation ("not equal to.")' =>
    // '<> denotes an inequation ( `` not equal to .") '
    .replace(/([^\.])(\.)([\]\)}>"\']*)\s*$/g, "$1 $2$3 ")

    // However, we may as well split ALL question marks and exclamation
    // points.  We wrap spaces around exclamation and question marks.
    // 'Wait, what?' =>  'Wait, what ? '
    .replace(/[?!]/g, " $& ")

    // == PARENTHESES, BRACKETS, ETC. =================================
    // Wrap closing and opening brackets in spaces.
    // '<> denotes an inequation ("not equal to")' =>
    // ' <  >  denotes an inequation  (  `` not equal to" ) '
    .replace(/[\]\[\(\)\{\}<>]/g, " $& ")

    // Wrap two dashes (hyphen-minus characters) in spaces.
    // 'The years 2001--2003' => 'The years 2001 -- 2003'
    .replace(/--/g, " -- ");

  // NOTE THAT SPLIT WORDS ARE NOT MARKED.  Obviously this isn't
  // great, since you might someday want to know how the words
  // originally fit together -- but it's too late to make a better
  //  system now, given themillions of words we've already done
  // "wrong".

  value =
    // First off, add a space to the beginning and end of each line, to
    // reduce necessary number of regular expressions.
    // 'Alright' => ' Alright '
    (" " + value + " ")

      // == ENDING QUOTES ===============================================

      // Replace remaining double quotes with double single quotes
      // wrapped in spaces.
      // '"Sure", he said' => ' ``Sure \'\' , he said '
      .replace(/"/g, " '' ")

      // Wrap possessive or closing single quotes: A single quote (not
      // preceded by another single quote) followed by a space.
      // "'Surely'" => " 'Surely ' "
      .replace(/([^'])' /g, "$1 ' ")

      // == CONTRACTIONS ================================================

      // Add a space before a single quote followed by `s`, `m`, or `d`
      // (case-insensitive) and a space.
      // "It's awesome" => " It 's awesome "
      .replace(/'([sSmMdD]) /g, " '$1 ")

      // Add a space before occurances of `'ll`, `'re`, `'ve`, or `n't`
      // (or their uppercase variants).
      .replace(/('ll|'re|'ve|n't) /gi, " $1 ");

  // Break up other contractions (not matched by general regular
  // expressions) with a space and wrap in spaces.
  // "Really, I cannot." => " Really, I  can not  .  "
  for (const contraction of CONTRACTIONS) {
    value = value.replace(contraction, " $1 $2 ");
  }

  value = value
    .replaceAll("addressable", "addressed")
    .replaceAll("fastled", "fast led")
    .replaceAll("neopixelbus", "neopixel bus")
    .replaceAll("neopixel", "neo pixel")
    .replaceAll("esp8266", "esp 8266")
    .replaceAll("esp32", "esp 32")
    .replaceAll("rgbct", "rgb color temperature")
    .replaceAll("rgbw", "rgb white")
    .replaceAll("h-bridge", "h bridge");

  value = value

    // Concatenate double (or more) spaces.
    .replace(/\ \ +/g, " ")

    // Remove starting and ending spaces.
    .replace(/^\ |\ $/g, "");

  // Finally, we return the value, split on spaces, as an array.
  return value.split(" ");
};
