module.exports = function waitForAsync(promise, timer) {
  let response = false;
  let err = false;
  const timeout = timer || 10000;

  promise
    .then((result) => {
      response = result;
      return result;
    })
    .catch((error) => {
      response = error;
      err = true;
    });

  browser.waitUntil(
    () => response,
    timeout,
    `Wait for Request Promise failed to resolve within ${timer} ms`
  );
  if (err) console.error(response);
  return response;
};
