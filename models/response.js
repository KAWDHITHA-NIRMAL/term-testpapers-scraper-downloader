class Response {
  constructor(statusCode, message, items) {
    this.statusCode = statusCode;
    let success;
    if (parseInt(statusCode) !== 200 && parseInt(statusCode) !== 201) {
      success = false;
    } else {
      success = true;
    }
    let obj = {
      status: statusCode,
      success,
      message: message.toLowerCase().trim(),
      items: Array(...items),
      time: new Date().getTime(),
    };
    return obj;
  }
  status(){
    return parseInt(this.statusCode)
  }
}

export default Response;
