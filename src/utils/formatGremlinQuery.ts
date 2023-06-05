const isJSON = value => {
  try {
    JSON.parse(value);
  } catch (e) {
    return false;
  }
  return true;
};

const escapeApostrophe = value => {
  if (typeof value == 'string' && value.includes("'")) return value.replace(/'/g, '\u2019');
  return value;
};

const replaceApostrophe = obj => {
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        if (typeof obj[i] === 'string') {
          obj[i] = obj[i].replace(/'/g, '\u2019');
        } else {
          obj[i] = replaceApostrophe(obj[i]);
        }
      }
    } else {
      for (const key in obj) {
        if (typeof obj[key] === 'string') {
          obj[key] = obj[key].replace(/'/g, '\u2019');
        } else {
          obj[key] = replaceApostrophe(obj[key]);
        }
      }
    }
  }
  return obj;
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
        const cleanObject = replaceApostrophe(data[key]);
        query += `.property('${key}', '${JSON.stringify(cleanObject)}')`;
        continue;
      }
      query += `.property('${key}', '${escapeApostrophe(data[key])}')`;
    }
  }
  return query;
}

export { transformGetResponseData, generateGremlinPostArticleQuery };
