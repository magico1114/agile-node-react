'use strict'

var moment = require('moment');

let MEMORY_DATA = {};
let LOCKED_STATUS = false;
const TIMEOUT = 10; //Time out in seconds

const transactionType = {
    CREDIT: "CREDIT",
    DEBIT: "DEBIT"
}

MEMORY_DATA = {
    '1111111111100012': {'id': '1111111111100012', 'type': transactionType.CREDIT, 'amount': 1234, 'effectiveDate': moment().format()},
    '1111111111100013': {'id': '1111111111100013', 'type': transactionType.DEBIT, 'amount': -1000, 'effectiveDate': moment().format()},
    '1111111111100014': {'id': '1111111111100014', 'type': transactionType.CREDIT, 'amount': 234, 'effectiveDate': moment().format()},
    '1111111111100015': {'id': '1111111111100015', 'type': transactionType.DEBIT, 'amount': -1000, 'effectiveDate': moment().format()},
    '1111111111100016': {'id': '1111111111100016', 'type': transactionType.CREDIT, 'amount': 234, 'effectiveDate': moment().format()},
    '1111111111100017': {'id': '1111111111100017', 'type': transactionType.CREDIT, 'amount': 1000, 'effectiveDate': moment().format()},
    '1111111111100018': {'id': '1111111111100018', 'type': transactionType.CREDIT, 'amount': 234, 'effectiveDate': moment().format()},
    '1111111111100019': {'id': '1111111111100019', 'type': transactionType.DEBIT, 'amount': -1000, 'effectiveDate': moment().format()},
    '1111111111100020': {'id': '1111111111100020', 'type': transactionType.CREDIT, 'amount': 234, 'effectiveDate': moment().format()},
    '1111111111100021': {'id': '1111111111100021', 'type': transactionType.DEBIT, 'amount': -1000, 'effectiveDate': moment().format()},
    '1111111111100022': {'id': '1111111111100022', 'type': transactionType.CREDIT, 'amount': 234, 'effectiveDate': moment().format()}
};


exports.getAll = () => {
    return new Promise((resolve, reject) => {
        
        if (!LOCKED_STATUS){
            resolve(MEMORY_DATA);    
        }
        else {
            //Delayed response
            let counter 
            let delay = setInterval(() => {
                if (!LOCKED_STATUS){
                    resolve(MEMORY_DATA);    
                }
                counter++;
                if (counter*10 > TIMEOUT) {
                  clearInterval(delay);
                  reject({"error": "timeout"})
                }
            }, 100);           
        }
    });
};

exports.get = (id) => {
    console.log("Transaction ID: " + id);
    return new Promise((resolve, reject) => {
        
        if (!LOCKED_STATUS){
             if ( MEMORY_DATA[id] )
                resolve(MEMORY_DATA[id]);
            else
                resolve()   
        }
        else {
            //Delayed response
            let counter;
            let delay = setInterval(() => {
                if (!LOCKED_STATUS){
                    if (id in Object.keys(MEMORY_DATA))
                        resolve(MEMORY_DATA[id]);
                    else
                        resolve()  
                }
                counter++;
                if (counter*10 > TIMEOUT) {
                  clearInterval(delay);
                  reject({"error": "timeout"})
                }
            }, 100);           
        }
    });
};

exports.add = (data) => {
    console.log(genKey());

    return new Promise((resolve, reject) => {

        let tmpData = {
            'id': genKey(),
            'type': data.type =="credit" ? transactionType.CREDIT : transactionType.DEBIT, 
            'amount': data.amount, 
            'effectiveDate': moment().format()
        }

        if (!LOCKED_STATUS){
            LOCKED_STATUS=true;
            MEMORY_DATA[tmpData.id]=tmpData;
            LOCKED_STATUS=false;
            resolve(MEMORY_DATA[tmpData.id]);
       }
       else {
            //Delayed response
            let counter;
            let delay = setInterval(() => {
            if (!LOCKED_STATUS){
                MEMORY_DATA[tmpData.id]=tmpData;
                resolve(MEMORY_DATA[tmpData.id]);
            }
            counter++;
            if (counter*10 > TIMEOUT) {
                clearInterval(delay);
                reject({"error": "timeout"})
            }
           }, 100);           
       }      

    });
};

let genKey = () => {
    let k = Math.random().toString(36).substring(2,5).toUpperCase() ;
    return moment().format('YYYYMMDDhhmmss') + k; 
}