import test from 'tape';
import {parse} from '../../bikes/keiser';

/**
 * See https://dev.keiser.com/mseries/direct/#data-parse-example for a
 * data parse example of the below test case
 */
test('parse() parses Keiser indoor bike data values', t => {
  const buf = Buffer.from('0201063000383803460573000D00042701000A', 'hex');
  const {type, payload: {power, cadence}} = parse(buf);
  t.equal(type, 'stats', 'message type');
  t.equal(power, 115, 'power (watts)');
  t.equal(cadence, 82, 'cadence (rpm)');
  t.end();
});
