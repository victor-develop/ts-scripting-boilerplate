export async function readGSheet({logger}) {
    const creds = require('../private/cred.json')
    const { GoogleSpreadsheet } = require('google-spreadsheet');
    // https://docs.google.com/spreadsheets/d/1TXKbuP6n0XeKs4e9y-qoXlZpyXufXgNp0k3NSXMiFqY/edit?usp=sharing
    const doc = new GoogleSpreadsheet('1TXKbuP6n0XeKs4e9y-qoXlZpyXufXgNp0k3NSXMiFqY');
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo()
    logger.info(
        {
            sheetObj: (await doc.sheetsByTitle['main'].getRows())
            .map(r => ({
                Key: r.Key,
                v1: r['Value 1'],
                v2: r['Value 2']
            }))
        }
    ) 
}
