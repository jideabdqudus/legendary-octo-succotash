const isJSON = value => {
  try {
    JSON.parse(value);
  } catch (e) {
    return false;
  }
  return true;
};

const escapeApostrophe = value => {
  if (typeof value == 'string' && value.includes("'")) return value.replace(/'/g, "\\'");
  return value;
};

const replaceApostrophe = (data, depth = 0) => {
  if (Array.isArray(data)) {
    // If the data is an array, iterate over each element and recursively call the replaceApostrophe function
    data.forEach(element => replaceApostrophe(element));
  } else if (typeof data === 'object' && data !== null) {
    // If the data is an object, iterate over its properties and recursively call the replaceApostrophe function
    for (const key in data) {
      if (typeof data[key] === 'object' && data[key] !== null) {
        replaceApostrophe(data[key]);
      } else if (typeof data[key] === 'string') {
        data[key] = data[key].replace(/'/g, "//'"); // Replace apostrophe with //'
      }
    }
  }
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
