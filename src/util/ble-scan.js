import {on} from 'events';
import {macAddress} from './mac-address';

/**
 * Scan for a BLE device.
 * @param {Noble} noble - a Noble instance.
 * @param {string[]} serviceUuids - find devices advertising these GATT service uuids
 * @param {object} filters - find devices matching these filters
 * @property {function} filters.address - mac address match predicate function
 * @property {function} filters.name - device name match predicate function
 * @returns {Peripheral} the matching peripheral
 */
export async function scan(noble, serviceUuids, filters = {}) {
  let peripheral
  let results = on(noble, 'discover');
  await noble.startScanningAsync(serviceUuids, true);
  for await (const [result] of results) {
    if (match(filters, getFilterProps(result))) {
      peripheral = result;
      break;
    }
  }
  await noble.stopScanningAsync();
  return peripheral;
}

function getFilterProps(result) {
  return {
    address: macAddress(result.address),
    name: result.advertisement.localName,
  }
}

function match(filters, obj) {
  return Object.keys(filters).every(k => filters[k](obj[k]));
}
