import 'jest-preset-angular/setup-jest';

const nodeCrypto = require('crypto');
window.crypto = {
  randomUUID(): string {
    return '';
  }, subtle: undefined,
  getRandomValues: function (buffer) {
    return nodeCrypto.randomFillSync(buffer);
  }
};
