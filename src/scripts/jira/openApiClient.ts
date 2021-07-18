import OpenAPIClientAxios from 'openapi-client-axios';

const {
  JIRA_URL,
  JIRA_EMAIL,
  JIRA_API_TOKEN
} = process.env

const api = new OpenAPIClientAxios({ 
  definition: 'https://developer.atlassian.com/cloud/jira/platform/swagger-v3.v3.json',
  withServer: JIRA_URL,
  axiosConfigDefaults: {
    auth: {
      username: JIRA_EMAIL,
      password: JIRA_API_TOKEN
    },
    baseURL: JIRA_URL
  }
});
api.init()
.then(c => {
  c.searchProjects().then(r => {
    console.log(
      r.data
    )
  })
  .catch(err => {
    console.warn(err.config)
  })
})

