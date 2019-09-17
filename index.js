var assert = require("assert");
var partial1 = (function partial1$(f, x) {
  /* partial1 twiglet.sibilant:5:0 */

  return f.bind(null, x);
});
var createLogger = (function createLogger$(attributes) {
  /* create-logger twiglet.sibilant:10:0 */

  assert.ok(("object" === typeof attributes && attributes !== null && attributes.constructor.name !== "Array"));
  assert.ok(typeof attributes.output === "function");
  assert.ok(typeof attributes.service === "string", !(0 === attributes.service.length));
  assert.ok((("object" === typeof attributes.events && attributes.events !== null && attributes.events.constructor.name !== "Array") && !(0 === Object.keys(attributes.events).length)));
  var loggit = (function loggit$(level, event, info) {
    /* loggit twiglet.sibilant:16:2 */
  
    return attributes.output({
      "service": attributes.service,
      "level": level,
      "timestamp": (new Date()).toISOString(),
      "event": (attributes.events[event] || "unspecified"),
      "info": info
    });
  });
  return {
    "debug": partial1(loggit, "DEBUG"),
    "info": partial1(loggit, "INFO"),
    "warning": partial1(loggit, "WARNING"),
    "error": partial1(loggit, "ERROR"),
    "critical": partial1(loggit, "CRITICAL")
  };
});
module.exports = { "createLogger": createLogger };
