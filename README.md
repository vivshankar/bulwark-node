# Overview

Use this application to learn about building an application to perform authentication factor enrollment on an IBM Security Verify account. This uses OIDC authorization_code flow to authenticate with ISV and the resulting access token is used to invoke the ISV factors API to enroll and validate factors.

Not all factor types are covered in this application.

## Pre-requisite

1. Install Node JS and Git client
2. Create a tenant in IBM Security Verify, if you don't have one
3. Clone this repository

## Setup

1. Create an OIDC application on ISV and enable the auth code grant type.
    - Disable PKCE
2. Run the `npm install` command in this code workspace
3. Create the `.env` file using the template `.env.template` and fill in the configuration properties

## Run the app

Simply execute `npm start` and browse to http://localhost:3000/factors to access the application.