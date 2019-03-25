const kue = require('kue');
const invoice = require('./invoice');
const queue = kue.createQueue();

function startJob() {
    let invoiceData = invoice.content;
    invoiceData.forEach((singleInvoice) => {
        // push data in queue
        let job = queue.create('invoice', {
            title: `Generate invoice ${singleInvoice.index}`,
            template: singleInvoice.text,
        }).delay(5000).priority('high').save((err) => {
            if(!err) {
                console.log('Job added...'+job.id);
            }
        });
    });
}

startJob();
