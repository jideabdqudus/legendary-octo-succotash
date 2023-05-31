
# Gremlin Knowledge dump

*Gremlin Operators*

- addV(): Creates a new vertex.
- addE(): Creates a new edge.
- removeV(): Removes a vertex.
- removeE(): Removes an edge.
- getV(): Gets a vertex by its identifier.
- getE(): Gets an edge by its start vertex, end vertex, and property values.
- match(): Matches vertices and edges that meet certain criteria.
- where(): Specifies the criteria that vertices and edges must meet to be matched.
- with(): Specifies the properties that should be returned for each vertex and edge that is matched.



### Example usages

Here are some examples of the Gremlin operators:

* `addV()`: Creates a new vertex.

    * Example: `g.addV().property('name', 'John')`
    * Response: `{
      "id": "v",
      "label": "person",
      "properties": {
        "name": "John"
      }
    }`

* `addE()`: Creates a new edge.

    * Example: `g.addV().property('name', 'John').as('v').addV().property('name', 'Mary').as('m').addE('knows').from('v').to('m').iterate()`
    * Response: `{
      "vertices": [
        {
          "id": "v",
          "label": "person",
          "properties": {
            "name": "John"
          }
        },
        {
          "id": "m",
          "label": "person",
          "properties": {
            "name": "Mary"
          }
        }
      ],
      "edges": [
        {
          "id": "knows",
          "start": "v",
          "end": "m",
          "properties": {}
        }
      ]
    }`

* `removeV()`: Removes a vertex.

    * Example: `g.V().has('name', 'John').remove()`
    * Response: `null`

* `removeE()`: Removes an edge.

    * Example: `g.E().has('label', 'knows').remove()`
    * Response: `null`

* `getV()`: Gets a vertex by its identifier.

    * Example: `g.getV('v')`
    * Response: `{
      "id": "v",
      "label": "person",
      "properties": {
        "name": "John"
      }
    }`

* `getE()`: Gets an edge by its start vertex, end vertex, and property values.

    * Example: `g.getE('knows', 'v', 'm')`
    * Response: `{
      "id": "knows",
      "start": "v",
      "end": "m",
      "properties": {}
    }`

* `match()`: Matches vertices and edges that meet certain criteria.

    * Example: `g.match(v => v.has('name', 'John'))`
    * Response: `{
      "vertices": [
        {
          "id": "v",
          "label": "person",
          "properties": {
            "name": "John"
          }
        }
      ]
    }`

* `where()`: Specifies the criteria that vertices and edges must meet to be matched.

    * Example: `g.match(v => v.has('name', 'John').where(v => v.age > 30))`
    * Response: `null`

* `with()`: Specifies the properties that should be returned for each vertex and edge that is matched.

    * Example: `g.match(v => v.has('name', 'John')).with('name')`
    * Response: `["John"]`

These are just a few examples of the many Gremlin operators that are available. For more information, please refer to the Gremlin documentation.