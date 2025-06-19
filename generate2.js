// Fungsi bantu: ubah angka ke Arab
function toArabicNumber(num) {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return String(num)
      .split('')
      .map(d => arabicDigits[parseInt(d, 10)] || d)
      .join('');
  }
  
  // Fungsi bantu: reshape huruf Arab (tanpa spasi)
  function reshapeArabic(letters) {
    return letters.join('').normalize('NFC'); // bisa ditambahkan ArabicReshaper kalau perlu
  }
  
  // Mapping Latin ke huruf Arab berharakat
  const latinToHijaiyah = {
    a: "اَ", ba: "بَ", ta: "تَ", tsa: "ثَ", ja: "جَ", ha: "حَ", kha: "خَ",
    da: "دَ", dza: "ذَ", ra: "رَ", za: "زَ", sa: "سَ", sya: "شَ", sha: "صَ",
    dha: "ضَ", tha: "طَ", zha: "ظَ", "'a": "عَ", gha: "غَ", fa: "فَ", qa: "قَ",
    ka: "كَ", la: "لَ", ma: "مَ", na: "نَ", haa: "هَ", wa: "وَ", ya: "يَ", sh: "شَ"
  };
  
  // Fungsi utama
  function generatePageJson(structuredInput, note = "", title = null, page = 1, arabicPage = "٣") {
    const lines = [];
  
    for (let i = 0; i < structuredInput.length; i++) {
      const [left, center, right] = structuredInput[i];
  
      const line = {
        index: i + 1,
        left: null,
        center: null,
        right: null
      };
  
      if (Array.isArray(left) && left.length > 0) {
        line.left = {
          arabic: reshapeArabic(left.map(l => latinToHijaiyah[l] || "")),
          latin: left.join(" "),
          audio: null
        };
      }
  
      if (Array.isArray(center) && center.length > 0) {
        line.center = {
          arabic: reshapeArabic(center.map(l => latinToHijaiyah[l] || "")),
          latin: center.join(" "),
          audio: null
        };
      }
  
      if (Array.isArray(right) && right.length > 0) {
        line.right = {
          arabic: reshapeArabic(right.map(l => latinToHijaiyah[l] || "")),
          latin: right.join(" "),
          audio: null
        };
      }
  
      lines.push(line);
    }
  
    return {
      pageNumber: page,
      pageArabic: arabicPage,
      title,
      note,
      lines
    };
  }
  

  const barisInput = [
    [null, ['sh'], null],
    [['za', 'ta', 'sya'], ['sa', 'sya', 'sya'], ['sa', 'a', 'sya']],
    [['sya', 'ta', 'dza'], ['da', 'ra', 'sa'], ['sya', 'dza', 'tsa']]
  ];
  
  const pageJson = generatePageJson(barisInput, "Belajar sambung huruf hijaiyah", "Halaman 13", 13, toArabicNumber(13));
  console.log(JSON.stringify(pageJson, null, 2));
  