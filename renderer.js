async function testIt() {
  const filters = [
    // { usbVendorId: 0x2341, usbProductId: 0x0043 },
    // { usbVendorId: 0x2341, usbProductId: 0x0001 }
    { usbVendorId: 6790 },
  ];
  try {
    const port = await navigator.serial.requestPort({ filters });
    const portInfo = port.getInfo();
    document.getElementById('device-name').innerHTML = `vendorId: ${portInfo.usbVendorId} | productId: ${portInfo.usbProductId} `
    await port.open({ baudRate: 9600 }) // <-- this fails in v20, but works in v19
  } catch (ex) {
    if (ex.name === 'NotFoundError') {
      document.getElementById('device-name').innerHTML = 'Device NOT found'
    } else {
      document.getElementById('device-name').innerHTML = ex
    }
  }
}

document.getElementById('clickme').addEventListener('click',testIt)
