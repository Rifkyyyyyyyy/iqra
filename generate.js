const hijaiyah = [
    "ا", "أ", "إ", "ء", "ؤ", "ئ", "ب", "ت", "ث", "ج", "ح", "خ",
    "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ",
    "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ي"
];

const latin = [
    "a", "a'", "i'", "hamzah", "wu'", "yi'", "ba", "ta", "tsa", "ja", "ha", "kha",
    "da", "dza", "ra", "za", "sa", "sya", "sha", "dha", "tha", "zha", "'a", "gha",
    "fa", "qa", "ka", "la", "ma", "na", "ha", "wa", "ya"
];



const latinToHijaiyah = {
    a: "اَ", ba: "بَ", ta: "تَ", tsa: "ثَ", ja: "جَ", ha: "حَ", kha: "خَ",
    da: "دَ", dza: "ذَ", ra: "رَ", za: "زَ", sa: "سَ", sya: "شَ", sha: "صَ",
    dha: "ضَ", tha: "طَ", zha: "ظَ", zho: "ظَ", "'a": "عَ", gha: "غَ", fa: "فَ", qa: "قَ",
    ka: "كَ", la: "لَ", ma: "مَ", na: "نَ", ha: "هَ", wa: "وَ", ya: "يَ", hamzah: "أ",
};


function generatePageJson(structuredInput, note_id = "", title = null, page_number = 1, page_number_arabic = "٣") {
    const lines = [];

    for (let i = 0; i < structuredInput.length; i++) {
        const [leftLatin, centerLatin, rightLatin] = structuredInput[i];

        const line = {
            line_index: i + 1,
            left_column: null,
            center_column: null,
            right_column: null
        };

        if (Array.isArray(leftLatin) && leftLatin.length > 0) {
            line.left_column = {
                arabic: leftLatin.map(l => latinToHijaiyah[l] || "").join(" "),
                latin: leftLatin.join(" ")
            };
        }

        if (Array.isArray(centerLatin) && centerLatin.length > 0) {
            line.center_column = {
                arabic: centerLatin.map(l => latinToHijaiyah[l] || "").join(" "),
                latin: centerLatin.join(" ")
            };
        }

        if (Array.isArray(rightLatin) && rightLatin.length > 0) {
            line.right_column = {
                arabic: rightLatin.map(l => latinToHijaiyah[l] || "").join(" "),
                latin: rightLatin.join(" ")
            };
        }

        lines.push(line);
    }

    return {
        page_number,
        page_number_arabic,
        title,
        note_id,
        lines
    };
}


const barisInput = [
    [null, ['ja'], null],
    [['a', 'ja', 'ja'], null, ['tsa', 'a', 'ja']],
    [['a', 'ta', 'ja'], null, ['tsa', 'ba', 'ja']],
    [['ba', 'ja', 'tsa'], null, ['tsa', 'a', 'ja']],
    [['ja', 'a', 'ba'], null, ['ja', 'a', 'tsa']],
    [['ta', 'a', 'ja'], null, ['tsa', 'ja', 'ja']],
    [['ja', 'a', 'ja'], null, ['ja', 'tsa', 'tsa']],
    [null, ['a', 'ba', 'ta', 'tsa', 'ja'], null]

];

const pageJson = generatePageJson(
    barisInput,
    null,
    null,
    4,
    toArabicNumber(4)
);


function toArabicNumber(num) {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return String(num)
        .split('')
        .map(d => arabicDigits[parseInt(d, 10)] || d)
        .join('');
}


console.log(JSON.stringify(pageJson, null, 2));
