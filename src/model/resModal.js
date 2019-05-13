class BaseModal {
  constructor(data, message) {
    if (typeof data === 'string') {
      this.message === data
      data = null
      message = null
    }
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

// 成功
class SuccessModal extends BaseModal {
  constructor(data, message) {
    super(data, message)
    this.error = 0
  }
}

// 失败
class ErrorModal extends BaseModal {
  constructor(data, message) {
    super(data, message)
    this.error = -1
  }
}

module.exports = {
  ErrorModal,
  SuccessModal
}