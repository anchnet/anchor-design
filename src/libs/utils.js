const utils = {
  clone (obj) {
    return obj ? JSON.parse(JSON.stringify(obj)) : null
  }
}