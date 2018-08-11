# Studio Ghibli Fetch

A Google Cloud function to retrieve data from the ghibliapi.herokuapp.com/films api.  

The data returned has the description fields cropped to a max of 300 characters, plus
escape-html used to escape the data before returning it (as this is a third-party api).

Access-Control headings set to allow the function to be called from a specific URL, and
from localhost to allow testing when the allowLocal environment flag is set to true.

This requires the node v8 runtime

## Uploading to Cloud Functions

Install the gcloud utilities then use command

```bash
gcloud beta functions deploy {function name} --runtime nodejs8 --trigger-http --project {project name}
```

to update the function.

## Environment Variables

set `defaultOrigin` to the required URL, for instance `https://example.test.com`
set `endPoint` to the Studio Ghibli API, for instance `https://ghibliapi.herokuapp.com/films`
set 'allowLocal' to 'true' if you want to allow access from localhost, any other value will
be viewed as false.
