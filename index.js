import Tesseract from 'tesseract.js'
import _ from 'lodash'
import fs from 'node:fs'
// import pdfParse from 'pdf-parse'
import pdfUtil from 'pdf-to-text'

class ImageToText {
    constructor(imageAddress) {
        this.imageAddress = imageAddress
    }
    characterCounter () {
        Tesseract.recognize(this.imageAddress, 'fas', { logger: m => console.log(m) })
            .then(({ data: { text } }) => {
                const res = _.countBy(text, 'length')
                console.log(res)
            })
    }
}

class PdfToText {
    constructor(pdfAddress) {
        this.pdfAddress = pdfAddress
    }
    characterCounter() {
        pdfUtil.info(this.pdfAddress, function(err, info) {
            if (err) throw(err);
            console.log(info);
        });
    }
}

function main () {
    const allFile = []

    const imageSample1 = new ImageToText('./public/image/udhr_persian.gif')
    allFile.push(imageSample1)

    const pdfSample1 = new PdfToText('./public/pdf/sample.pdf')
    allFile.push(pdfSample1)
    
    for (const eachFile of allFile) {
        eachFile.characterCounter()
    }
}

main()
