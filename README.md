## Objective (as per requirements)
Once a file is uploaded on GStorage, the Pub/Sub should be responsible
to active a nodejs endpoint to process the new file and save 
its contents to BigQuery.

Cloud Build is triggered on commits in the master branch, 
building the docker image and running it with Cloud Run.


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
