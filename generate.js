const hijaiyah = [
    "ا", "أ", "إ", "ء", "ؤ", "ئ", "ب", "ت", "ث", "ج", "ح", "خ",
    "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ",
    "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ي"
];


const latin = [
    "a", "a'", "i'", "hamzah", "wu'", "yi'", "ba", "ta", "tsa", "ja",
    "ha", "kha", "da", "dza", "ra", "za", "sa", "sya", "sha", "dha",
    "tha", "zha", "'a", "gha", "fa", "qa", "ka", "la", "ma", "na",
    "haa", "wa", "ya"
];


const latinToHijaiyah = {
    a: "اَ", ba: "بَ", ta: "تَ", tsa: "ثَ", ja: "جَ", ha: "حَ", kha: "خَ",
    da: "دَ", dza: "ذَ", ra: "رَ", za: "زَ", sa: "سَ", sya: "شَ", sha: "صَ",
    dha: "ضَ", tha: "طَ", zha: "ظَ", zho: "ظَ", "'a": "عَ", gha: "غَ", fa: "فَ", qa: "قَ",
    ka: "كَ", la: "لَ", ma: "مَ", na: "نَ", haa: "هَ", wa: "وَ", ya: "يَ", hamzah: "أ",
};


function generatePageJson(structuredInput, note_id = "", title = null, page_number = 1, page_number_arabic = "٣") {
    const lines = [];

    for (let i = 0; i < structuredInput.length; i++) {
        const [leftLatin, centerLatin, rightLatin] = structuredInput[i];

        const line = {
            index: i + 1,
            left: null,
            center: null,
            right: null,
        };

        if (Array.isArray(leftLatin) && leftLatin.length > 0) {
            line.left = {
                arabic: leftLatin.map(l => latinToHijaiyah[l] || "").join(" "),
                latin: leftLatin.join(" "),
                audio: null


            };
        }

        if (Array.isArray(centerLatin) && centerLatin.length > 0) {
            line.center = {
                arabic: centerLatin.map(l => latinToHijaiyah[l] || "").join(" "),
                latin: centerLatin.join(" "),
                audio: null
            };
        }

        if (Array.isArray(rightLatin) && rightLatin.length > 0) {
            line.right = {
                arabic: rightLatin.map(l => latinToHijaiyah[l] || "").join(" "),
                latin: rightLatin.join(" "),
                audio: null
            };
        }

        lines.push(line);
    }

    return {
        pageNumber: page_number,
        pageArabic: page_number_arabic,
        title,
        note: note_id,
        lines
    };
}


const barisInput = [
    [null, ['sh'], null],
    [['za', 'ta', 'sya'], ['sa', 'sya', 'sya'], ['sa', 'a', 'sya']],
    [['sya', 'ta', 'dza'], ['da', 'ra', 'sa'], ['sya', 'dza', 'tsa']],
    [['ja', 'ra', 'sa'], ['kha', 'sya', 'ba'], ['za', 'ha', 'tsa']],
    [['ha', 'sa', 'da'], ['ra', 'sya', 'dza'], ['sa', 'sya', 'a']],
    [['sya', 'za', 'ra'], ['a', 'sa', 'sya'], ['dza', 'kha', 'za']],
    [['a', 'ba', 'ta'], ['sya', 'za', 'ja'], ['kha', 'sa', 'da']],
    [null, ['tsa', 'ja', 'ha', 'kha', 'da', 'dza', 'ra', 'za', 'sa'], null],
];



const pageJson = generatePageJson(
    barisInput,
    null,
    null,
    13,
    toArabicNumber(13)
);


function toArabicNumber(num) {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return String(num)
        .split('')
        .map(d => arabicDigits[parseInt(d, 10)] || d)
        .join('');
}


console.log(JSON.stringify(pageJson, null, 2));
