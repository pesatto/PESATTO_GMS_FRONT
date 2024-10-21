import { Company } from "./user";

export interface Unit {
  realvalues: Realvalues;
  realbooleans: Realbooleans;
  longitude: number;
  latitude: number;
  altitude: number;
  serial: string;
  connected: boolean;
  genvalues: any[];
  genbooleans: any[];
  _id: string;
  name: string;
  hostid: string;
  simcard: string;
  model: Model;
  company: Company;
  lastupdate: string;
  createdAt: string;
  __v: number;
}

export interface Model {
  _id: string;
  name: string;
  power: number;
  voltaje: number;
  hz: number;
  rpm: number;
  battery: number;
  temp: number;
  oil: number;
  amps: number;
  __v: number;
}

export interface Realbooleans {
  '0': boolean;
  '1': boolean;
  '2': boolean;
  '3': boolean;
  '4': boolean;
  '5': boolean;
  '6': boolean;
  '7': boolean;
  '8': boolean;
  '9': boolean;
  '10': boolean;
  '11': boolean;
  '12': boolean;
  '13': boolean;
  '14': boolean;
  '15': boolean;
  '16': boolean;
  '17': boolean;
  '18': boolean;
  '19': boolean;
  '20': boolean;
  '21': boolean;
  '22': boolean;
  '23': boolean;
  '24': boolean;
  '25': boolean;
  '26': boolean;
  '27': boolean;
  '28': boolean;
  '29': boolean;
  '30': boolean;
  '31': boolean;
  '32': boolean;
  '33': boolean;
  '34': boolean;
  '35': boolean;
  '36': boolean;
  '37': boolean;
  '38': boolean;
  '39': boolean;
  '40': boolean;
  '41': boolean;
  '42': boolean;
  '43': boolean;
  '44': boolean;
  '45': boolean;
  '46': boolean;
  '47': boolean;
  '48': boolean;
  '49': boolean;
  '50': boolean;
  '51': boolean;
  '52': boolean;
  '53': boolean;
  '54': boolean;
  '55': boolean;
  '56': boolean;
  '57': boolean;
  '58': boolean;
  '59': boolean;
  '60': boolean;
  '61': boolean;
  '62': boolean;
  '63': boolean;
  '64': boolean;
  '65': boolean;
  '66': boolean;
  '67': boolean;
  '68': boolean;
  '69': boolean;
  '70': boolean;
  '71': boolean;
  '72': boolean;
  '73': boolean;
  '74': boolean;
  '75': boolean;
  '76': boolean;
  '77': boolean;
  '78': boolean;
  '79': boolean;
  '80': boolean;
  '81': boolean;
  '82': boolean;
  '83': boolean;
  '84': boolean;
  '85': boolean;
  '86': boolean;
  '87': boolean;
  '88': boolean;
  '89': boolean;
  '90': boolean;
  '91': boolean;
  '92': boolean;
  '93': boolean;
  '94': boolean;
  '95': boolean;
  '96': boolean;
  '97': boolean;
  '98': boolean;
  '99': boolean;
  '100': boolean;
  '101': boolean;
  '102': boolean;
  '103': boolean;
  '104': boolean;
  '105': boolean;
  '106': boolean;
  '107': boolean;
  '108': boolean;
  '109': boolean;
  '110': boolean;
  '111': boolean;
}
interface Realvalues {
  '0': number;
  '1': number;
  '2': number;
  '3': number;
  '4': number;
  '5': number;
  '6': number;
  '7': number;
  '8': number;
  '9': number;
  '10': number;
  '11': number;
  '12': number;
  '13': number;
  '14': number;
  '15': number;
  '16': number;
  '17': number;
  '18': number;
  '19': number;
  '20': number;
  '21': number;
  '22': number;
  '23': number;
  '24': number;
  '25': number;
  '26': number;
  '27': number;
  '28': number;
  '29': number;
  '30': number;
  '31': number;
  '32': number;
  '33': number;
  '34': number;
  '35': number;
  '36': number;
  '37': number;
  '38': number;
  '39': number;
  '40': number;
  '41': number;
  '42': number;
  '43': number;
  '44': number;
  '45': number;
  '46': number;
  '47': number;
  '48': number;
  '49': number;
  '50': number;
  '51': number;
  '52': number;
  '53': number;
  '54': number;
  '55': number;
  '56': number;
  '57': number;
  '58': number;
  '59': number;
  '60': number;
  '61': number;
  '62': number;
  '63': number;
  '64': number;
  '65': number;
  '66': number;
  '67': number;
  '68': number;
  '69': number;
  '70': number;
  '71': number;
  '72': number;
  '73': number;
  '74': number;
  '75': number;
  '76': number;
  '77': number;
  '78': number;
  '79': number;
  '80': number;
  '81': number;
  '82': number;
  '83': number;
  '84': number;
  '85': number;
  '86': number;
  '87': number;
  '88': number;
  '89': number;
  '90': number;
  '91': number;
  '92': number;
  '93': number;
  '94': number;
  '95': number;
  '96': number;
  '97': number;
  '98': number;
  '99': number;
  '100': number;
  '101': number;
  '102': number;
  '103': number;
  '104': number;
  '105': number;
  '106': number;
  '107': number;
  '108': number;
  '109': number;
  '110': number;
  '111': number;
  '112': number;
  '113': number;
  '114': number;
  '115': number;
  '116': number;
}