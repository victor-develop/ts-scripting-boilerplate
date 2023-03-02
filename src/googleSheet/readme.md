# Put secrets under src/private

`cred.json` for Google Service Account file

```
{
  "type": "service_account",
  "project_id": "your-project-name",
  "private_key_id": "******",
  "private_key": "******",
  "client_email": "*****@your-project-name.iam.gserviceaccount.com",
  "client_id": "******",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/****%40your-project-name.iam.gserviceaccount.com"
}

```

`notion.key.json` for Notion API Key, I made JSON just easily `require()` it in NodeJs

```
{
    "key": "Your Applied Key"
}
```
