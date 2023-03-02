export async function readNotionDatabase({logger}) {
    const notion_key = require('../private/notion.key.json')
    const { Client } = require('@notionhq/client');
    const notion = new Client({ auth: notion_key.key });
    const databaseId = 'bad2e9022c5f4b338cd995deb52f5b4d'
    const response = await notion.databases.query({
        database_id: databaseId,
        sorts: [
            {
              property: 'Created time',
              direction: 'descending',
            },
          ],
    });
    logger.info({
        response
    })
}
