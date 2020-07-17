## Objective (as per requirements)
Once a file is uploaded on GStorage, the Pub/Sub should be responsible
to activate a nodejs endpoint to process the new file and save 
its contents to BigQuery.

Cloud Build is triggered on commits in the master branch, 
building the docker image and running it with Cloud Run.

## Data flow
- Client sends a valid csv to the /upload endpoint.
- Upload endpoint saves the csv file in Google Cloud Storage.
- A subscription from GCP will send a push(http post) back to the api in a specific endpoint handling the messages.
- There's two options once the nodejs receives the message for new files
    - The CSV file could automatically be saved as a table on BigQuery.
    - The CSV is parsed by the nodejs app and only then will be saved(as per requirement)
- As the last step the CSV is saved into a new table named as the original csv file name.


## Stack

- Nodejs
- Express
- Mocha, chai
- Google Cloud
    - Cloud Build
    - Cloud Run
    - Storage
    - Sub/Pub
    - BigQuery

## Considerations
I believe a few things could be done differently, however I assumed the purpose of this was to test different areas inside inside GCP.
