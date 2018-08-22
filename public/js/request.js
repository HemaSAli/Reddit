const request = (method, url, data, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let result = JSON.parse(xhr.responseText);
        if (result.err) {
          cb(result.err);
        } else {
          cb(null, result.result);
        }
      } else {
        cb('Error ! ');
      }
    }
  };
  xhr.open(method, url, true);
  xhr.send(data);
};
