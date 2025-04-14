# icd0006-22-23-s

![ICD0021.png](..%2F..%2FDownloads%2FICD0021.png)

# Starting the project
~~~bash

# cd to directory on the local machine
cd WebstormProjects\icd0006-22-23-s\mentorme-webapp
# Edit the path variable 
# -> C:\Program Files\nodejs

# Create React application with typescript type checking
npx create-react-app mentorme-webapp --template typescript --use-npm

# Or simply use install the npm
npm install

~~~
## Styles (Bootstrap, React icons, Custom elements)
~~~bash
npm i jquery popper.js bootstrap font-awesome
npm i --save-dev @types/jquery @types/bootstrap
npm install react-bootstrap bootstrap
npm install react-icons --save
npm install react-select
~~~

## Install React Router
~~~bash
npm install react-router-dom localforage match-sorter sort-by
npm install @types/react-router-dom --save-dev
# events
npm install events
~~~

## Install axios
~~~bash
npm install axios

# Axios types
npm install @types/axios --save-dev
~~~

## Install JWT decoder 
~~~bash
npm install jwt-decode
~~~

# Configure and run the app
~~~bash
npm start
~~~

# Deploy the app
~~~bash
# 1. Change the host base url to the one of the deployed backend 
# e.g. https://mb-distributed-22-23-backend.azurewebsites.net/api/
# 2. Build the app and the container
npm run build
docker buildx build --progress=plain  -t webapp:latest .
# 3. Deploy it
docker tag webapp madridbabajev/distributed-22-23-webapp:latest
docker push madridbabajev/distributed-22-23-webapp:latest
~~~

# Student data

## Madrid Babajev

## mababa

## 213325IADB