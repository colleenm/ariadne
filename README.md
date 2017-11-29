# Ariadne
As someone once said:

> Individuals often make poor decisions.  
> And large groups often make poor decisions too.  


# Overview
The application consists of:
- `api/`
- `web/`

## api/
[GraphQL][graphql] has been chosen for the API layer for [numerous reasons][why-graphql].
While GraphQL provides the client with a sensible data contract, it makes few assumptions about the service layer.

[Graphcool][graphcool] appears to be the current best option for rapid development and deployment of a GraphQL API.
This project should not rely too heavily on Graphcool's platform-specific features, however.
There may be significant advantages in using a graph persistence layer ([Dgraph][dgraph], [Neo4j][neo4j], etc.),
and the many decisions made by Graphcool are not necessarily optimal.

Open questions:
- persistence
- permissions
- integrations with external services
- testing
- deployment

## web/
- [React][react] is the de facto standard for modern web development. Additionally, [React Native][react-native] can be used to build native applications.
- [Create React App][create-react-app] provides rudimentary scaffolding for development and deployment.
- [React Router][react-router] is a collection of navigational components for React.
- [Apollo Client][apollo-client] is a powerful set of tools for connecting applications (both web and native) to GraphQL APIs.
- [Tachyons][tachyons] is a responsive CSS framework designed to preserve sanity.

Open questions:
- offline usability
- optimistic UI
- progressive enhancement
- server-side rendering
- testing
- deployment


# Development
First, install:
- [Docker][docker-install]
- [Node][node-install]
- [Yarn][yarn-install]

## api
*Note: all commands executed from `api/`*

To start Graphcool:
```bash
yarn install
yarn up
yarn deploy -c local
```

Once you've done the above, you can get to the Graphcool playground by running:
```bash
yarn playground
```

Password authentication follows the tutorial
[authentication with email and password][https://www.graph.cool/docs/tutorials/auth/authentication-with-email-and-password-for-react-and-apollo-cu3jah9ech/].
Or, more accurately, it follows the template `graphcool/templates/auth/email-password`.

## web
*Note: all commands executed from `web/`*

To start the front end development server:
```bash
yarn install
yarn start
```


[graphql]:          http://graphql.org/
[why-graphql]:      https://www.howtographql.com/basics/1-graphql-is-the-better-rest/
[graphcool]:        https://www.graph.cool/
[dgraph]:           https://dgraph.io
[neo4j]:            https://neo4j.com
[react]:            https://github.com/facebook/react
[react-native]:     https://facebook.github.io/react-native/
[create-react-app]: https://github.com/facebookincubator/create-react-app
[react-router]:     https://github.com/ReactTraining/react-router
[apollo-client]:    https://github.com/apollographql/apollo-client
[tachyons]:         https://github.com/tachyons-css/tachyons
[docker-install]:   https://docs.docker.com/engine/installation/
[node-install]:     https://nodejs.org/en/download/
[yarn-install]:     https://yarnpkg.com/lang/en/docs/install/
