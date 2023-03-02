export async function readGSheet({logger}) {
    const creds = require('../private/cred.json')
    const { GoogleSpreadsheet } = require('google-spreadsheet');
    // https://docs.google.com/spreadsheets/d/1TXKbuP6n0XeKs4e9y-qoXlZpyXufXgNp0k3NSXMiFqY/edit?usp=sharing
    const doc = new GoogleSpreadsheet('1TXKbuP6n0XeKs4e9y-qoXlZpyXufXgNp0k3NSXMiFqY');
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo()
    // example output: {"name":"quisquam-architecto-aliquid_2023-03-02T16:49:18.670Z","hostname":"Zhou.local","pid":40581,"level":30,"sheetObj":[{"Key":"My Key","v1":"v1","v2":"v2"}],"msg":"","time":"2023-03-02T16:49:19.816Z","v":0}
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
