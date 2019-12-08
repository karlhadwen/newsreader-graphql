## Learn GraphQL, Apollo Server 2, and Black-box Testing (http://bit.ly/CognitiveSurge)

```
query getArticleByIdAndSource {
  articleBySource(id: "21168364", source: "hackernews") {
    ...articleFields
  }
}

query getAFewArticlesBySource {
  articlesBySource(ids: [21168561, 21168365, 21168364], source: "hackernews") {
    ...articleFields
  }
}

query getAllArticlesBySource {
  hackernews: allArticlesBySource(source: "hackernews") {
    ...articleFields
  }

  newyorktimes: allArticlesBySource(source: "newyorktimes") {
    ...articleFields
  }
}

query getAllArticles {
  allArticles {
    ...articleFields
  }
}

query getArticleByIdAndSourceWithVars($id: ID!, $source: String!) {
  articleBySource(id: $id, source: $source) {
    ...articleFields
  }
}

fragment articleFields on Article {
  id
  title
  author
  url
  time
  source
}
```

Subscribe to my YouTube channel here: http://bit.ly/CognitiveSurge where I build projects like this! And don't forget, you can contribute to this project (highly encouraged!). One thing I didn't get time to do was incorporate accessibility into this application, so I'd love to see that added!

![Preview](graphql-preview.png?raw=true)
