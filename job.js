const bull = require('bull');
const invoice = require('./invoice');
const queue = new bull('pdf-generation');

function startJob() {
    let invoiceData = invoice.content;
    invoiceData.forEach(async (singleInvoice) => {
        // push data in queue
        let job = await queue.add({
            title: `Generate invoice ${singleInvoice.index}`,
            template: singleInvoice.text,
        }, {'delay': 1000});
    });
}

startJob();
