/* tslint:disable */
// @ts-nocheck
const { writeFile, existsSync, mkdirSync } = require('fs');
const { replaceInFile } = require('replace-in-file');

require('dotenv').config();


function writeFileUsingFS(targetPath, fileContent) {
  writeFile(targetPath, fileContent, function (err) {
    if (err) {
      console.log(err);
    }
    if (fileContent !== '') {
      console.log(`fileContent is not empty:  ${fileContent ? true : false}`);
      console.log(`wrote variables to ${targetPath}`);
    }
  });
}

const envDirectory = './src/environments';

if (!existsSync(envDirectory)) {
  mkdirSync(envDirectory);
}

writeFileUsingFS('./src/environments/environment.ts', '');
writeFileUsingFS('./src/environments/authflow.ts', '');
writeFileUsingFS('./src/environments/params.ts', '');


const environmentFileContent = `

export const environment = ${process.env.ENVIRONMENT_FILE_CONTENT};
`;

const authflowFileContent = `
import {AuthConfig} from 'angular-oauth2-oidc';
import {environment} from './environment';
const url = 'https://authentification-agent-tis.pe.intra/connexion/oauth2/agent/authorize';
export const authCodeFlowConfig: AuthConfig = ${process.env.AUTHFLOW_FILE_CONTENT};
`;

const paramsFileContent = `
export const params = ${process.env.PARAMS_FILE_CONTENT};
`;


writeFileUsingFS('./src/environments/environment.ts', environmentFileContent);
writeFileUsingFS('./src/environments/authflow.ts', authflowFileContent);
writeFileUsingFS('./src/environments/params.ts', paramsFileContent);



// partie sécurité et firebase.config

const backendGateway = process.env.CSP_VARIABLES;
const firebaseJsonPath = './firebase.json';

replaceInFile({
  files: firebaseJsonPath,
  from: /\{\{BACKEND_GATEWAY\}\}/g,  // placeholder to be replaced
  to: backendGateway,
}).then(results => {
  console.log('Replaced backend gateway in firebase.json:', results);
}).catch(error => {
  console.error('Error occurred:', error);
});