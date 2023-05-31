const isJSON = value => {
  try {
    JSON.parse(value);
  } catch (e) {
    return false;
  }
  return true;
};

const transformGetResponseData = responseData => {
  const vertices = responseData?.result?.data['@value'];
  // Transform each vertex into a simplified object
  const transformedData = vertices?.map(vertex => {
    // Extract the properties from the vertex
    const vertexData = vertex['@value'];
    const properties = vertexData.properties;
    const responseObject = {};
    responseObject['_id'] = vertexData.id;
    // Itereate over each property and add it to the response object
    for (const key in properties) {
      const value = properties[key][0]['@value'].value;
      // If the value is a JSON string, parse it and add it to the response object
      isJSON(value) ? (responseObject[key] = JSON.parse(value)) : (responseObject[key] = value);
    }
    return responseObject;
  });
  return transformedData;
};

function generateGremlinPostArticleQuery(data) {
  let query = `g.addV('article')`;
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (typeof data[key] === 'object') {
        query += `.property('${key}', '${JSON.stringify(data[key])}')`;
        continue;
      }
      query += `.property('${key}', '${data[key]}')`;
    }
  }
  return query;
}

export { transformGetResponseData, generateGremlinPostArticleQuery };
