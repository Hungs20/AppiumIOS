const wdio = require("webdriverio");
const assert = require("assert");

const opts = {
    path: '/wd/hub',
    port: 4723,
    capabilities: {
      platformName: "iOS",
      platformVersion: "14.5",
      deviceName: "iPhone 12",
      app: "/Users/hungcv8/Library/Developer/Xcode/DerivedData/Appium-aunyqwxetwhsrzcliinamtygkvqr/Build/Products/Debug-iphonesimulator/Appium.app",
      automationName: "XCUITest"
    }
  };

  async function login(username, password) {
    const client = await wdio.remote(opts);
    
    const nameSelector = `value == "Nhập tài khoản"`
    const nameInput = await client.$(`-ios predicate string:${nameSelector}`)
    await nameInput.addValue(username)

    const passSelector = `value == "Nhập mật khẩu"`
    const passInput = await client.$(`-ios predicate string:${passSelector}`)
    await passInput.addValue(password)

    const selector = `label == "Đăng nhập" AND name == "Đăng nhập" AND type == "XCUIElementTypeButton"`
    const element = await client.$(`-ios predicate string:${selector}`)
    await element.click()

    const wrongSelector = `label == "Đăng nhập không thành công"`
    const wrongLb = await client.$(`-ios predicate string:${wrongSelector}`).isExisting()

    await client.deleteSession();
    if(wrongLb) {
        return false
    }
    return true
  }

  async function shop(count) {
    const client = await wdio.remote(opts);
    
    const nameSelector = `value == "Nhập tài khoản"`
    const nameInput = await client.$(`-ios predicate string:${nameSelector}`)
    await nameInput.addValue('admin')

    const passSelector = `value == "Nhập mật khẩu"`
    const passInput = await client.$(`-ios predicate string:${passSelector}`)
    await passInput.addValue('admin')

    const selector = `label == "Đăng nhập" AND name == "Đăng nhập" AND type == "XCUIElementTypeButton"`
    const element = await client.$(`-ios predicate string:${selector}`)
    await element.click()

    const countSelector = `type == "XCUIElementTypeTextField"`
    const countInput = await client.$(`-ios predicate string:${countSelector}`)
    await countInput.addValue(count)

    const selectorShop = `label == "Thanh toán" AND name == "Thanh toán" AND type == "XCUIElementTypeButton"`
    const elementShop = await client.$(`-ios predicate string:${selectorShop}`)
    await elementShop.click()

    
    const priceSelector = `type == 'XCUIElementTypeStaticText' && name CONTAINS 'Tổng giá tiền'`
    const priceLb = await client.$(`-ios predicate string:${priceSelector}`)
    return priceLb.getText()
  }

  async function loginTest() {
    assert.equal(await login('admin', 'admin') , true)
    assert.equal(await login('admin', 'root') , true)
    assert.equal(await login('user', 'pass') , false)
    assert.equal(await login('root', 'root') , false)
    assert.equal(await login('admin', 'admin') , true)
  }

  async function shopTest() {
    assert.equal(await shop(2), 'Tổng giá tiền: 100000.0đ')
    assert.equal(await shop(3), 'Tổng giá tiền: 100000.0đ')
  }
  
  async function main () {
    await loginTest()
    // shopTest()
  }
  
  main();
  