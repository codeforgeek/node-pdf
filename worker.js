const bull = require("bull");
const queue = new bull('pdf-generation');
const pdfKit = require('pdfkit');
const fs = require('fs');

function startProcess() {
    // listen to the queue
    // start processing email
    queue.process((job) => {
        // on each request generate the pdf
        console.log(`Processing Job with id ${job.id}`);
        generatePdfInvoice(job.data);
    });
}

function generatePdfInvoice(data) {
    let doc = new pdfKit;
    doc.pipe(fs.createWriteStream(`${__dirname}/invoice/${data.title}.pdf`));
    doc.fontSize(14).text(data.template, 100, 100);
    doc.end();    
    console.log(`Generated PDF document`);
}

startProcess();
console.log('Worker running');