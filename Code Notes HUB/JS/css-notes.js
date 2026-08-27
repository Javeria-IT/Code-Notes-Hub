/* CSS Notes page extras: PDF viewer controls.
   Dark mode, search, highlighting, bookmarks, and the back button
   are all handled by the shared js/theme.js and js/notes.js. */

const pdf = document.getElementById("pdfFrame");

document.getElementById("openPdf").onclick = () => {

    pdf.style.display = "block";

    pdf.scrollIntoView({ behavior: "smooth" });

};

document.getElementById("downloadPdf").onclick = () => {

    const link = document.createElement("a");

    link.href = "assets/css-tags.pdf";

    link.download = "css-notes.pdf";

    link.click();

};

document.getElementById("printPdf").onclick = () => {

    if (pdf.style.display === "none") {

        pdf.style.display = "block";

    }

    setTimeout(() => pdf.contentWindow.print(), 300);

};
